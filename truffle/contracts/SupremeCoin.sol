// contracts/ModifiedAccessControl.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SupremeCoin is ERC20, ERC20Mintable {
  string public name = "SUPREME COIN";
  string public symbol = "SUPREME";
  uint8 public decimals = 18;
}