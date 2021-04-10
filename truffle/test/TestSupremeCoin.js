/*
 * @dev test file for SupremeCoinICO.sol
 * 
*/

// let catchRevert = require("./exceptionHelpers").catchRevert
// const truffleAssert = require('truffle-assertions');
var SupremeCoinICO = artifacts.require("./SupremeCoinICO.sol");
var SupremeCoin = artifacts.require("./SupremeCoin.sol");

contract('SupremeCoinICO', function (accounts) {

    const owner = accounts[0]
    const alice = accounts[1]
    const bob = accounts[2]

    const openingTime = web3.eth.getBlock('latest').timestamp + 2; // two secs in the future
    const closingTime = openingTime + 86400 * 20; // 20 days
    const rate = 1000;
    const wallet = accounts[1];

    beforeEach(async () => {
        instance = await SupremeCoinICO.new(
                                rate,
                                wallet,
                                openingTime,
                                closingTime,
                                SupremeCoin.address);
      });


    });