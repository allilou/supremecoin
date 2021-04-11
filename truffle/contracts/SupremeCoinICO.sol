// contracts/ModifiedAccessControl.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "../node_modules/@openzeppelin/contracts/crowdsale/Crowdsale.sol";
import "../node_modules/@openzeppelin/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "../node_modules/@openzeppelin/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "../node_modules/@openzeppelin/contracts/crowdsale/validation/PausableCrowdsale.sol";

import "./SupremeCoin.sol";

contract SupremeCoinICO is Crowdsale, TimedCrowdsale, PausableCrowdsale, MintedCrowdsale {
    constructor (
        uint _rate,
        address payable _wallet,
        uint256 _openingTime, 
        uint256 _closingTime,
        SupremeCoin _token
    ) 
    Crowdsale (_rate, _wallet, _token) 
    TimedCrowdsale(_openingTime, _closingTime) 
    MintedCrowdsale() 
    PausableCrowdsale() 
    public {

    }
}