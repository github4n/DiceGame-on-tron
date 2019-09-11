pragma solidity ^0.4.23;

import "./Admin.sol";
import "./Datasets.sol";
import "./Events.sol";
import "./SafeMath.sol";
contract Core is Admin, Events {
    using SafeMath for uint64;

    uint64 public gIDIndex_;
    uint64 public bIDIndex_;
    mapping(uint64 => uint64) public gId_game_; //gId与开奖号码
    mapping(uint64 => mapping(uint64 => Datasets.Bet[])) public  game_bet_; //gId与下注卡牌（下注详情）对应关系
    mapping(uint64 =>mapping(uint64 => uint64)) public total_amount_; //gId与下注卡牌（下注总额）对应关系
    mapping (uint64 => Datasets.BetRate) public bet_rate_;
    


    function setBetWager()
    public
    onlyAdministrator
    {
        bet_rate_[1] = (Datasets.BetRate)(1,50000000,60000000000,2);
        bet_rate_[2] = (Datasets.BetRate)(2,50000000,40000000000,3);
        bet_rate_[3] = (Datasets.BetRate)(3,50000000,24000000000,5);
        bet_rate_[4] = (Datasets.BetRate)(4,50000000,4000000000,30);
    }

    function updateBetWager(uint64 rId,uint64 minimal,uint64 wager,uint64 rate)
    public
    onlyAdministrator
    {
        bet_rate_[rId].minimal = minimal;
        bet_rate_[rId].wager = wager;
        bet_rate_[rId].betRate = rate;
    }

    function setGIDIndex(uint64 gID)
    public 
    onlyAdministrator
    {
        gIDIndex_ = gID;
    }

    function setBIDIndex(uint64 bID)
    public 
    onlyAdministrator
    {
        bIDIndex_ = bID;
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

    uint64 public baseAmount = 500000000000;
    function updateBaseAmount(uint64 amount)
    public  
    onlyAdministrator
    {
        baseAmount = amount;
    }      

}