pragma solidity ^0.4.16;
contract OscarPlayer {
    function mintTokens (address _pAddr, uint64 _token) public returns(uint64);
    function determineInviter (address _pAddr, address _inviterPAddr) public;
    function pAddrBetStatus_(address _pAddr)public returns(bool);
} 