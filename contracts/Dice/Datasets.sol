pragma solidity ^0.4.23;

library Datasets {

    struct Bet {
        uint64 bID;
        address pAddr;
        uint64 betNumber;
        uint64 betValue;  
        uint64 lotteryNumber;
        uint64 bonus;
        uint64 betType; //默认为under == 0;over == 1;
    }

}