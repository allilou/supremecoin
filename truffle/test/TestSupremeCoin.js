/*
 * @dev test file for SupremeCoinICO.sol
 * 
*/

let catchRevert = require("./exceptionHelpers").catchRevert
const truffleAssert = require('truffle-assertions');
var SupremeCoinICO = artifacts.require("./SupremeCoinICO.sol");
var SupremeCoin = artifacts.require("./SupremeCoin.sol");

const delay = ms => new Promise(res => setTimeout(res, ms));

contract('SupremeCoinICO', function (accounts) {

  const owner = accounts[0]
  const alice = accounts[1]
  const bob = accounts[2]

  const openingDuration = 10; // Duraton in seconds
  const openingShift = 2; // Shift in seconds

  beforeEach(async () => {

    latestBlock = await web3.eth.getBlock('latest');
    openingTime = latestBlock.timestamp + openingShift; // two secs in the future
    closingTime = openingTime + openingDuration;
    // closingTime = openingTime + 86400 * 20; // 20 days
    rate = 1000;
    wallet = accounts[1];

    token = await SupremeCoin.new({ from: owner });

    instance = await SupremeCoinICO.new(
      rate,
      wallet,
      openingTime,
      closingTime,
      token.address);

    await token.addMinter(instance.address, { from: owner });
    await token.renounceMinter({ from: owner });
  });

  it("Should return the correct initial values of the state variables", async () => {
    let returnedOpeningtime = await instance.openingTime();
    let returnedClosingtime = await instance.closingTime();
    let returneRate = await instance.rate();
    let returneWallet = await instance.wallet();

    assert.equal(returnedOpeningtime, openingTime, "The Opening Time should be " + openingTime);
    assert.equal(returnedClosingtime, closingTime, "The Closing Time  should be " + closingTime);
    assert.equal(returneRate, rate, "The Rate should be " + rate);
    assert.equal(returneWallet, wallet, "The Wallet should be " + wallet);
  });

  it("Should return the SupremeCoin Contract as Token", async () => {
    let returnedTokenAddress = await instance.token();

    const returnedToken = await SupremeCoin.at(returnedTokenAddress);

    let returnedName = await returnedToken.name();
    let returnedSymbol = await returnedToken.symbol();
    let returnedDecimals = await returnedToken.decimals();

    assert.equal(returnedName, "SUPREME COIN", "The Token Name Time should be " + "SUPREME COIN");
    assert.equal(returnedSymbol, "SUPREME", "The Token Name Time should be " + "SUPREME");
    assert.equal(returnedDecimals, 18, "The Token Name Time should be " + 18);
  });

  it("Should return the correct opening and closing state given blocks timestamps", async () => {
    await delay((openingShift + 2) * 1000);
    let ICOisOpen = await instance.isOpen();

    assert.equal(ICOisOpen, true, "The ICO should be open now ");

    await delay((openingDuration + 2) * 1000);

    ICOisOpen = await instance.isOpen();
    let hasClosed = await instance.hasClosed();
    assert.equal(ICOisOpen, false, "The ICO shouldn't be open after closing time");
    assert.equal(hasClosed, true, "The ICO should be open closed now");
  });

  it("Should log a TokensPurchased event with correct args values when Someone buy Tokens", async () => {
    await delay((openingShift + 2) * 1000);

    var amount = web3.utils.toWei('10', 'gwei');

    let result = await instance.sendTransaction({ from: alice, value: amount });

    let eventEmitted = false
    if (result.logs[0].event == "TokensPurchased") {
      eventEmitted = true
    }

    let purchaserLog = result.logs[0].args.purchaser;
    let benificiaryLog = result.logs[0].args.beneficiary;
    let valueLog = result.logs[0].args.value;
    let amountLog = result.logs[0].args.amount;

    assert.equal(eventEmitted, true, 'sending transaction should emit a TokensPurchased event')
    assert.equal(purchaserLog, alice, 'purchaser address should be ' + alice)
    assert.equal(benificiaryLog, alice, 'benificiary addresse should be ' + alice)
    assert.equal(valueLog, amount, 'the amount in Wei should be = ' + amount)
    assert.equal(amountLog, amount * rate, 'the amount of tokens purchased should be = ' + amount * rate)
  });


  it("Should calculate correctly the amount raised in Wei", async () => {
    // shift in time to enter openning time
    await delay((openingShift + 2) * 1000);

    var amount1 = web3.utils.toWei('10', 'gwei');
    var amount2 = web3.utils.toWei('20', 'gwei');
    var amount = web3.utils.toWei('30', 'gwei');;

    await instance.sendTransaction({ from: alice, value: amount1 });
    await instance.sendTransaction({ from: bob, value: amount2 });

    let fundRaised = await instance.weiRaised();

    assert.equal(fundRaised, amount, 'the amount of Wei raised should be = ' + amount)
  });

  it("Should Revert when Buying token before the ICO has started", async () => {
    await delay((openingShift + openingDuration + 2) * 1000);
    var amount = web3.utils.toWei('10', 'gwei');

    let isOpen = await instance.isOpen();
    let hasClosed = await instance.hasClosed();

    assert.equal(isOpen, false, 'the ICO should not be open')
    assert.equal(hasClosed, true, 'the ICO should be closed')
    await truffleAssert.fails(instance.sendTransaction({ from: alice, value: amount }), truffleAssert.ErrorType.REVERT);
  });


  // function paused() public view returns (bool) {
  // event Paused(address account);

  // function pause() public onlyPauser whenNotPaused {
  // event Unpaused(address account);

  // function unpause() public onlyPauser whenPaused {

});