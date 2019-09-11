pragma solidity ^0.4.23;

contract Events {

    event onBet
    (
      uint64 indexed bID,
      address indexed pAddr,
      uint64 betNumber,
      uint64 betValue,
      uint64 betType
    );

}
