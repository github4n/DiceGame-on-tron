pragma solidity ^0.4.23;

contract Events {

    event onBet
    (
      address indexed pAddr,
      uint64 indexed gID,
      uint64 indexed bID,
      uint64 betNumber,
      uint64 betValue
    );

}
