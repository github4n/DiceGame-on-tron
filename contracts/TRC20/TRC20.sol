pragma solidity ^0.4.23;

import "./ITRC20.sol";
import "./Ownable.sol";
import "./SafeMath.sol";
import "./BlackList.sol";

/**
 * @title Standard TRC20 token (compatible with ERC20 token)
 *
 * @dev Implementation of the basic standard token.
 * https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
 * Originally based on code by FirstBlood: https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol
 */
contract TRC20 is ITRC20,Ownable,BlackList {
    using SafeMath for uint256;

    mapping (address => uint256) private _balances;

    mapping (address => mapping (address => uint256)) private _allowed;

    uint256 private _totalSupply;

    /**
     * @dev Total number of tokens in existence
     */
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev Gets the balance of the specified address.
     * @param owner The address to query the balance of.
     * @return An uint256 representing the amount owned by the passed address.
     */
    function balanceOf(address owner) public view returns (uint256) {
        return freeBalanceOf(owner);
    }

    /**
    * @dev Gets the free balance (balance - deposits) of the specified address.
    * @param owner The address to query the the balance of.
    * @return An uint256 representing the amount owned by the passed address.
    */
    function freeBalanceOf(address owner) public view returns (uint256 balance) {
      return _balances[owner].sub(totalDeposits(owner)).sub(totalUnstakes(owner));
    }

    /**
     * @dev Function to check the amount of tokens that an owner allowed to a spender.
     * @param owner address The address which owns the funds.
     * @param spender address The address which will spend the funds.
     * @return A uint256 specifying the amount of tokens still available for the spender.
     */
    function allowance(
        address owner,
        address spender
    )
    public
    view
    returns (uint256)
    {
        return _allowed[owner][spender];
    }

    /**
     * @dev Transfer token for a specified address
     * @param to The address to transfer to.
     * @param value The amount to be transferred.
     */
    function transfer(address to, uint256 value) public notInBlackList returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    /**
     * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
     * Beware that changing an allowance with this method brings the risk that someone may use both the old
     * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
     * race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     * @param spender The address which will spend the funds.
     * @param value The amount of tokens to be spent.
     */
    function approve(address spender, uint256 value) public notInBlackList returns (bool) {
        require(spender != address(0));

        _allowed[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    /**
     * @dev Transfer tokens from one address to another
     * @param from address The address which you want to send tokens from
     * @param to address The address which you want to transfer to
     * @param value uint256 the amount of tokens to be transferred
     */
    function transferFrom(
        address from,
        address to,
        uint256 value
    )
    public
    notInBlackList
    returns (bool)
    {
        require(_allowed[from][msg.sender] >= value);
        _allowed[from][msg.sender] = _allowed[from][msg.sender].sub(value);
        _transfer(from, to, value);
        return true;
    }

    /**
     * @dev Increase the amount of tokens that an owner allowed to a spender.
     * approve should be called when allowed_[_spender] == 0. To increment
     * allowed value is better to use this function to avoid 2 calls (and wait until
     * the first transaction is mined)
     * From MonolithDAO Token.sol
     * @param spender The address which will spend the funds.
     * @param addedValue The amount of tokens to increase the allowance by.
     */
    function increaseAllowance(
        address spender,
        uint256 addedValue
    )
    public
    notInBlackList
    returns (bool)
    {
        require(spender != address(0));

        _allowed[msg.sender][spender] = (
        _allowed[msg.sender][spender].add(addedValue));
        emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
        return true;
    }

    /**
     * @dev Decrease the amount of tokens that an owner allowed to a spender.
     * approve should be called when allowed_[_spender] == 0. To decrement
     * allowed value is better to use this function to avoid 2 calls (and wait until
     * the first transaction is mined)
     * From MonolithDAO Token.sol
     * @param spender The address which will spend the funds.
     * @param subtractedValue The amount of tokens to decrease the allowance by.
     */
    function decreaseAllowance(
        address spender,
        uint256 subtractedValue
    )
    public
    notInBlackList
    returns (bool)
    {
        require(spender != address(0));
        require(_allowed[msg.sender][spender] >= subtractedValue);

        _allowed[msg.sender][spender] = (
        _allowed[msg.sender][spender].sub(subtractedValue));
        emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
        return true;
    }

    /**
    * @dev Burns a specific amount of tokens - override so we dont burn staked coins
    * @param _value The amount of token to be burned.
    */
    function burn(uint256 _value) public notInBlackList {
        return _burn(msg.sender,_value);
    }

    /**
     * @dev Burns a specific amount of tokens from the target address and decrements allowance
     * @param from address The address which you want to send tokens from
     * @param value uint256 The amount of token to be burned
     */
    function burnFrom(address from, uint256 value) public notInBlackList {
        _burnFrom(from, value);
    }

    /**
     * @dev Function to mint tokens
     * @param to The address that will receive the minted tokens.
     * @param value The amount of tokens to mint.
     * @return A boolean that indicates if the operation was successful.
     */
    function mint(address to, uint256 value) public onlyOwner returns (bool) {
        _mint(to, value);
        return true;
    }

    /**
     * @dev Transfer token for a specified addresses
     * @param from The address to transfer from.
     * @param to The address to transfer to.
     * @param value The amount to be transferred.
     */
    function _transfer(address from, address to, uint256 value) internal {
        require(freeBalanceOf(from) >= value);
        require(to != address(0));

        _balances[from] = _balances[from].sub(value);
        _balances[to] = _balances[to].add(value);
        emit Transfer(from, to, value);
    }

    /**
     * @dev Internal function that mints an amount of the token and assigns it to
     * an account. This encapsulates the modification of balances such that the
     * proper events are emitted.
     * @param account The account that will receive the created tokens.
     * @param value The amount that will be created.
     */
    function _mint(address account, uint256 value) internal {
        require(account != address(0));

        _totalSupply = _totalSupply.add(value);
        _balances[account] = _balances[account].add(value);
        emit Transfer(address(0), account, value);
    }

    /**
     * @dev Internal function that burns an amount of the token of a given
     * account.
     * @param account The account whose tokens will be burnt.
     * @param value The amount that will be burnt.
     */
    function _burn(address account, uint256 value) internal {
        require(account != address(0));
        uint256 tokenBalance = freeBalanceOf(account);
        require(tokenBalance >= value,"not enough free token to burn");

        _totalSupply = _totalSupply.sub(value);
        _balances[account] = _balances[account].sub(value);
        emit Transfer(account, address(0), value);
    }

    /**
     * @dev Internal function that burns an amount of the token of a given
     * account, deducting from the sender's allowance for said account. Uses the
     * internal burn function.
     * @param account The account whose tokens will be burnt.
     * @param value The amount that will be burnt.
     */
    function _burnFrom(address account, uint256 value) internal {
        // Should https://github.com/OpenZeppelin/zeppelin-solidity/issues/707 be accepted,
        // this function needs to emit an event with the updated approval.
        require(_allowed[account][msg.sender]>=value);
        _allowed[account][msg.sender] = _allowed[account][msg.sender].sub(value);
        _burn(account, value);
    }


    event SubmitDeposit(address indexed owner, address indexed holder, uint256 value);

    /// @dev `Deposit` is the structure that attaches a state to a
    ///  given value of stake
    struct Deposit {
        //`holder` is the holder of the stake
        address holder;
        // `value` is the amount of tokens placed as a stake
        uint256 value;
        // `depositBegin` is the time in second of tokens deposit begin
        uint256 depositBegin;
        // `unstake` is the amount of tokens unstaked
        uint256 unstake;
        // `unstakeBegin` is the time in second of tokens unstaked
        uint256 unstakeBegin;
    }

    // `deposits` tracks current stakes that have been deposited
    mapping(address => mapping (address => Deposit)) public deposits;
    mapping(address => uint256) public depositAmt;
    mapping(address => uint256) public unstakeAmt;

    // `depositsAccounts` shows map between one holder to owners
    mapping(address => address[]) depositsAccounts;
    address[] Holders;

    // `this is used for coin age`
    mapping(uint256 => uint256) public timepoints;
    mapping(uint256 => uint256) public depositDiscounts;

    

    function updateTimepoints(uint256 key,uint256 value)
    public
    onlyOwner
    {
        timepoints[key] = value;
    }

    function updateDepositDiscounts(uint256 key,uint256 value)
    public
    onlyOwner
    {
        depositDiscounts[key] = value;
    }

    uint256 public unstakeInterval = 86400;
    function setUnstakeInterval(uint256 _unstakeInterval)
    public
    onlyOwner
    {
        unstakeInterval = _unstakeInterval;
    }

    /**
    * @dev submitDeposit submits a deposit of number of tokens with the holder
    * @param _holder address The address which holds the deposit
    * @param _value uint256 The value of the deposit
    * @return A uint256 1 for success
    */
    function submitDeposit(address _holder, uint256 _value) public notInBlackList returns (uint256 id) {
        uint tokenBalance = freeBalanceOf(msg.sender);

        //free balance must be greater than value to allow a burn
        require(tokenBalance >= _value,"not enough free token to stake");
        //build deposit and push to mapping
        if(depositsAccounts[_holder].length == 0){
            Holders.push(_holder);
        }

        if(deposits[_holder][msg.sender].holder == address(0)){
            depositsAccounts[_holder].push(msg.sender);
        }

        Deposit storage d = deposits[_holder][msg.sender];
        d.holder = _holder;
        d.value = d.value.add(_value);
        
        if(d.depositBegin == 0){
            d.depositBegin = block.timestamp;
        }

        depositAmt[msg.sender] = depositAmt[msg.sender].add(_value);
        emit SubmitDeposit(msg.sender, _holder, d.value);
        return 1;
    }

    /**
    * @dev getTotalDepositsForHolder returns the total deposit amount for the holder
    * @param _holder address The address which holds the funds.
    * @return A uint256 value of the fund amount
    */
    function getTotalDepositsForHolder(address _holder) public view
        returns (uint256) {
        uint256 depositBalance = 0;

        for(uint256 index=0;index < depositsAccounts[_holder].length;index++){
            address _owner =  depositsAccounts[_holder][index];
            depositBalance = depositBalance.add(deposits[_holder][_owner].value);
        }
        return depositBalance;
    }

    function getOwnersForHolder(address _holder) public view
    returns(address[]){
        return depositsAccounts[_holder];
    }

    /**
    * @dev getDeposit returns the deposit details for a specific deposit
    * @param _owner address The address which owns the funds.
    * @param _holder address The address which holds the funds.
    * @return A uint256 value of the fund amount
    */
    function getDeposit(address _owner, address _holder) public view
    returns (uint256) {
        if (depositsAccounts[_holder].length == 0){
            return 0;
        }
        return deposits[_holder][_owner].value;
    }

    /**
    * @dev getUnstake returns the unstake details for a specific deposit
    * @param _owner address The address which owns the funds.
    * @param _holder address The address which holds the funds.
    * @return A uint256 value of the fund amount, uint256 value of the second when begin unstake
    */
    function getUnstake(address _owner, address _holder) public view
    returns (uint256,uint256) {
        if (depositsAccounts[_holder].length == 0){
            return (0,0);
        }
        return (deposits[_holder][_owner].unstake,deposits[_holder][_owner].unstakeBegin);
    }

    /**
    * @dev Function to check the amount of tokens that an owner has staked
    * @param _owner address The address which owns the funds.
    * @return A uint256 specifying the amount of tokens that are staked.
    */
    function totalDeposits(address _owner) public view returns (uint256) {
        return depositAmt[_owner];
    }

    function totalUnstakes(address _owner) public view returns (uint256) {
        return unstakeAmt[_owner];
    }

    function unstakeDeposit(address _holder,uint256 _value) public notInBlackList returns(bool){
        require(depositsAccounts[_holder].length > 0,"holders not found");

        Deposit storage d = deposits[_holder][msg.sender];
        require(d.value >= _value,"not enough staked token");

        uint256 age = block.timestamp.sub(d.depositBegin);
        uint256 discount = 100;
        for (uint256 index = 0; index < 10; index++) {
            if (timepoints[index] == 0) {
                break;
            } 

            if (age <= timepoints[index]) {
                discount = discount.sub(depositDiscounts[index]);
                break;
            } 
        }

        d.value = d.value.sub(_value);
        d.depositBegin = block.timestamp;
        
        d.unstake = d.unstake.add(_value.mul(discount).div(100));
        d.unstakeBegin = block.timestamp;

        if(discount < 100){
            _totalSupply = _totalSupply.sub(_value.sub(_value.mul(discount).div(100)));
            _balances[msg.sender] = _balances[msg.sender].sub(_value.sub(_value.mul(discount).div(100)));
        }

        depositAmt[msg.sender] = depositAmt[msg.sender].sub(_value);
        unstakeAmt[msg.sender] = unstakeAmt[msg.sender].add(_value.mul(discount).div(100));

        return true;
    }

    function withdrawUnstaked(address _holder,address _owner) public notInBlackList {
        require(depositsAccounts[_holder].length > 0,"holders not found");

        Deposit storage d = deposits[_holder][_owner];
        require(block.timestamp - d.unstakeBegin >= unstakeInterval,"should wait 24h before withdraw");

        //fix bugs
        unstakeAmt[_owner] = unstakeAmt[_owner] - d.unstake;

        d.unstake = 0;
        d.unstakeBegin = 0;
    }
}

