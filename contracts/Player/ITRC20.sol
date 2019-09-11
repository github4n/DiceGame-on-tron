pragma solidity ^0.4.23;

/**
 * @title TRC20 interface (compatible with ERC20 interface)
 * @dev see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
 */
contract ITRC20 {

    function totalSupply() public constant returns (uint256);

    function balanceOf(address _owner)public view returns (uint256 balance);

    function allowance(address _owner, address _spender)public view returns (uint256);

    function transfer(address _to, uint256 _value)public returns (bool);

    function approve(address _spender, uint256 _value)public returns (bool);

    function transferFrom(address _from, address _to, uint256 _value)public returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);
    
}
