pragma solidity ^0.4.23;

library Datasets {

    struct Bet {
        uint64 bID;
        uint64 betNumber;//卡牌编号 0 1 2 3
        uint64 betValue; //下注号码
        address pAddr; //玩家地址
    }

    struct BetRate{
        uint64 rId;
        uint64 minimal; //单个玩家下注最小额
        uint64 wager;   //当局所有玩家倍率对应金额最大值 60000 40000 24000 4000
        uint64 betRate; //下注倍率 2 3 5 30
    }
}