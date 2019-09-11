pragma solidity ^0.4.23;

import "./Core.sol";
import "./OscarPlayer.sol";
import "./SafeMath.sol";


contract OscarRing is Core {

    constructor ()
      public 
    {
        owner_ = msg.sender;
        administrators_[owner_] = true;
    }

    address public playerAddr = address(0x4157a720be2fd7f4bf9da71fbffabad6661575bf87);
    OscarPlayer public Player = OscarPlayer(playerAddr);

    function setPlayerAddr(address playerAddr_)
    public
    onlyAdministrator
    {
        playerAddr = playerAddr_;
        Player = OscarPlayer(playerAddr);
    }   

    //ring的期望
    uint64 public ringRate = 208;
    
    function setRingRate(uint64 _rate)
    public
    onlyAdministrator
    {
        ringRate = _rate;
    } 

    //create a game
    function createGame()
    public
    onlyAdministrator
    {
        gIDIndex_ = gIDIndex_.add(1);    
    }

    function betWithInviter(uint64 _gId,uint64 _betNumber, address _inviterPAddr)
    isActivated
    public
    payable 
    {     
        address _pAddr = msg.sender;
        //判断该地址是否有过交易 与邀请地址相比是否为相同地址 没有则记录邀请地址
        if ( Player.pAddrBetStatus_(_pAddr) == false && _pAddr != _inviterPAddr ) {
            Player.determineInviter(_pAddr,_inviterPAddr);
        }
        _bet(_pAddr,_gId,_betNumber,uint64(msg.value));
    }

    function betWithoutInviter(uint64 _gId,uint64 _betNumber)
    isActivated
    public
    payable 
    {
        _bet(msg.sender,_gId,_betNumber,uint64(msg.value));
    }

    function _bet (address _pAddr,uint64 _gId,uint64 _betNumber,uint64 _betValue)
    internal
    {
        Datasets.BetRate memory betRateInfo = bet_rate_[_betNumber];
        require(gId_game_[_gId] == 0 && _betNumber < 5 && _betNumber > 0);
        require(_betValue >= betRateInfo.minimal && _betValue + total_amount_[_gId][_betNumber] <= betRateInfo.wager);
        
        bIDIndex_ = bIDIndex_.add(1);
    
        Datasets.Bet memory betInfo; 
        betInfo.bID = bIDIndex_;
        betInfo.betNumber = _betNumber;
        betInfo.betValue = _betValue;
        betInfo.pAddr = _pAddr;
        game_bet_[_gId][_betNumber].push(betInfo);        

        total_amount_[_gId][_betNumber] = total_amount_[_gId][_betNumber].add(_betValue);
        
        Player.mintTokens(_pAddr,_betValue.mul(ringRate).div(100));

        emit Events.onBet
        (
            _pAddr,
            _gId,
            bIDIndex_,
            _betNumber,
            _betValue
        );
    }
    
    //开奖
    function lottery (uint64 _gId,uint64 _lotteryNumber)
    public
    isActivated
    onlyAdministrator
    {
        require(gId_game_[_gId] == 0 && _gId <= gIDIndex_);
        gId_game_[_gId] = _lotteryNumber;
        //game_betNumber_; gId与下注卡牌（玩家地址）对应关系
        Datasets.Bet[] memory bet = game_bet_[_gId][_lotteryNumber];
        Datasets.BetRate memory betRateInfo = bet_rate_[_lotteryNumber];
            
        for (uint64 j = 0; j < bet.length; j++) {
            bet[j].pAddr.transfer(bet[j].betValue.mul(betRateInfo.betRate));  
        }        
    }

    function betRing() public {}

    function betRingTransfer()
    public
    payable
    {
        msg.sender.transfer(msg.value);
    }

    uint8 public index;
    function  betRingByIndex()
    public
    payable
    {
        index = 1;
        msg.sender.transfer(msg.value);
    }

}