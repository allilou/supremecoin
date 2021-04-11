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

/*
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
    let ICOisOpen = await instance.isOpen();
    assert.equal(ICOisOpen, false, "The ICO shouldn't be open before openning time");

    await delay((openingShift + 1) * 1000);
    ICOisOpen = await instance.isOpen();

    assert.equal(ICOisOpen, true, "The ICO should be open now ");

    await delay((openingDuration + 1) * 1000);
    
    ICOisOpen = await instance.isOpen();
    let hasClosed = await instance.hasClosed(); 
    assert.equal(ICOisOpen, false, "The ICO shouldn't be open after closing time");
    assert.equal(hasClosed, true, "The ICO should be open closed now");

  });

*/
  it("Should log an event TokensPurchased event when Someone buy Tokens", async () => {
    await delay((openingShift + 1) * 1000);

    ICOisOpen = await instance.isOpen();
    console.log('------------ isOpen = ' + ICOisOpen);

    var amount = web3.utils.toWei('10', 'gwei');

    let result = await instance.sendTransaction({from: alice, value: amount});

    console.log(result);
    
    // assert.equal(ICOisOpen, true, "The ICO should be open now ");
  });


  // function buyTokens(address beneficiary) public nonReentrant payable {



  /**
   * Event for token purchase logging
   * @param purchaser who paid for the tokens
   * @param beneficiary who got the tokens
   * @param value weis paid for purchase
   * @param amount amount of tokens purchased
   */
  // event TokensPurchased(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);


  /**
   * @return the amount of wei raised.
   */
  // function weiRaised() public view returns (uint256) {



  it("Should Revert when Buying token before the ICO has started", async () => {
    let IcoIsOpen = await instance.isOpen();

    if (IcoIsOpen)
      await truffleAssert.fails(instance.buyTokens(alice), truffleAssert.ErrorType.REVERT);
  });








  /**
   * @return true if the crowdsale is open, false otherwise.
   */
  // function isOpen() public view returns (bool) 

  /**
   * @dev Checks whether the period in which the crowdsale is open has already elapsed.
   * @return Whether crowdsale period has elapsed
   */
  // function hasClosed() public view returns (bool) {







  /**
   * @dev Emitted when the pause is triggered by a pauser (`account`).
 */
  // event Paused(address account);

  /**
   * @dev Emitted when the pause is lifted by a pauser (`account`).
   */
  // event Unpaused(address account);


  /**
   * @dev Returns true if the contract is paused, and false otherwise.
   */
  // function paused() public view returns (bool) {

  //  function pause() public onlyPauser whenNotPaused {

  //  function unpause() public onlyPauser whenPaused {








});