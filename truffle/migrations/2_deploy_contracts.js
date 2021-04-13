const SupremeCoinICO = artifacts.require('./SupremeCoinICO.sol');
const SupremeCoin = artifacts.require('./SupremeCoin.sol');

module.exports = async function(deployer, network, accounts) {

//    const openingTime = web3.eth.getBlock('latest').timestamp + 2; // two secs in the future
    const openingTime = Date.now() + 2 ; // two secs in the future
    const closingTime = openingTime + 86400 * 20; // 20 days
    const rate = new web3.utils.BN(1000);
    const wallet = accounts[1];
    
    return deployer
        .then(() => {
            return deployer.deploy(SupremeCoin);
        })
        .then(() => {
            return deployer.deploy(
                SupremeCoinICO,
                rate,
                wallet,
                openingTime,
                closingTime,
                SupremeCoin.address,
                { gas: 5000000 }
            );
        });
};