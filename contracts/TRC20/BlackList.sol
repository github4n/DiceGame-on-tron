pragma solidity ^0.4.23;

contract BlackList {
  address public BlackListAdmin;
  mapping(address => bool) public list;

  function BlackList() public {
    BlackListAdmin = msg.sender;
  }

  modifier notInBlackList() {
    require(list[msg.sender] == false);
    _;
  }

  modifier onlyBlackListAdmin() {
    require(msg.sender == BlackListAdmin);
    _;
  }

  function transferBlackListAdmin(address newOwner) public onlyBlackListAdmin {
    require(newOwner != address(0));
    BlackListAdmin = newOwner;
  }

  function updateBlackList(address _address, bool _state) public onlyBlackListAdmin {
    list[_address] = _state;
  }

}
