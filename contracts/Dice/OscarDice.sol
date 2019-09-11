pragma solidity ^0.4.23;

import "./OscarPlayer.sol";
import "./Admin.sol";
import "./Datasets.sol";
import "./Events.sol";
import "./SafeMath.sol";

contract OscarDice is Admin, Events{

    constructor ()
      public 
    {
        owner_ = msg.sender;
        administrators_[owner_] = true;
    }

    using SafeMath for uint64;

    

    uint64 public bIDIndex_;
    function setBIDIndex(uint64 bID)
    public 
    onlyAdministrator
    {
        bIDIndex_ = bID;
    }
    mapping (uint64 => Datasets.Bet) public bID_bet_;

    
    address public playerAddr = address(0x4157a720be2fd7f4bf9da71fbffabad6661575bf87);
    
    OscarPlayer public Player = OscarPlayer(playerAddr);

    function setPlayerAddr(address playerAddr_)
    public
    onlyAdministrator
    {
        playerAddr = playerAddr_;
        Player = OscarPlayer(playerAddr);
    }  

    uint64 public wager = 10000000000;
    function getWager()
    public
    view
    returns (uint64)
    {
        return wager;
    }  

    function setWager(uint64 _wager)
    public
    onlyAdministrator
    {
        wager = _wager;
    }

    uint64 public minimal = 50000000;

    function getMinimal()
    public
    view
    returns (uint64)
    {
        return minimal;
    }

    function setMinimal(uint64 _minimal)
    public
    onlyAdministrator
    {
        minimal = _minimal;
    }

    uint64 public baseAmount = 500000000000;
    function updateBaseAmount(uint64 amount)
    public  
    onlyAdministrator
    {
        baseAmount = amount;
    }      
     /** jack pot begin **/
  
    function depositJackPot () 
      public
      payable
      onlyAdministrator
    {    
        
    }

    function withdrawJackPot (uint64 _value)
      public  
      onlyAdministrator
    {
        msg.sender.transfer(_value);
    }

    /** jack pot end **/

    function betWithInviter(uint64 _betNumber, address _inviterPAddr,uint64 _type)
    isActivated
    public
    payable 
    returns(uint64)
    {     
        address _pAddr = msg.sender;
        //判断该地址是否有过交易 与邀请地址相比是否为相同地址 没有则记录邀请地址
        if ( Player.pAddrBetStatus_(_pAddr) == false && _pAddr != _inviterPAddr ) {
            Player.determineInviter(_pAddr,_inviterPAddr);
        }
        _bet(_pAddr,_betNumber,uint64(msg.value),_type);
    }

    function betWithoutInviter(uint64 _betNumber,uint64 _type)
    isActivated
    public
    payable 
    returns(uint64)
    {
        address _pAddr = msg.sender;
        uint64 _betValue = uint64(msg.value);
        _bet(_pAddr,_betNumber,_betValue,_type);
    }

    function _bet (address _pAddr,uint64 _betNumber,uint64 _betValue,uint64 _type)
    internal
    isActivated
    {
        if (_type == 0) {
            require ( _betNumber <= 96 && _betNumber >= 2);
        } else {
            require ( _betNumber <= 99 && _betNumber >= 5);
        }

        require (_betValue >= minimal && _betValue <= wager);

        bIDIndex_ = bIDIndex_.add(1);
        Datasets.Bet betInfo = bID_bet_[bIDIndex_];

        betInfo.bID = bIDIndex_;
        betInfo.betNumber = _betNumber;
        betInfo.betValue = _betValue;
        betInfo.pAddr = _pAddr;
        if(_type == 1){
            betInfo.betType = _type;
        }
        
        Player.mintTokens(_pAddr, _betValue);
        
        emit Events.onBet
        (
        bIDIndex_,
        _pAddr,
        _betNumber,
        _betValue,
        _type
        );
    }
  
    function lottery (uint64 _betId,uint64 _lotteryNumber)
    public
    isActivated
    onlyAdministrator
    {
        Datasets.Bet betInfo = bID_bet_[_betId];

        require(betInfo.lotteryNumber == 0 && _betId <= bIDIndex_ );
        betInfo.lotteryNumber = _lotteryNumber;

        address _pAddr = betInfo.pAddr;
        uint64 _betNumber = betInfo.betNumber;
        uint64 _betValue = betInfo.betValue;
        uint64 _bonus;
        //betStatus == 0 小于算赢 
        if (betInfo.betType == 0 && _lotteryNumber < _betNumber) {
            _bonus = _betValue.mul(97).div((_betNumber-1));
            _pAddr.transfer(_bonus);
            betInfo.bonus = _bonus;
        }else if (betInfo.betType == 1 && _lotteryNumber > _betNumber) {
            _bonus = _betValue.mul(97).div((100 - _betNumber));
            _pAddr.transfer(_bonus);
            betInfo.bonus = _bonus;
        }
    }

    function betDice() public {}

    function betDiceTransfer()
    public
    payable
    {
        msg.sender.transfer(msg.value);
    }

    uint8 public index;
    function  betDiceByIndex()
    public
    payable
    {
        index = 1;
        msg.sender.transfer(msg.value);
    }

}