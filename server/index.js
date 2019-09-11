/* eslint-disable no-console */
const TronWeb = require('tronweb');
const tronWatcher = require('./lib/watch/watchBet');
const utils = require('./utils');
const taskForDice = require('./lib/task/taskForDice');
const taskForRing = require('./lib/task/taskForRing');
const taskFOrTower = require('./lib/task/taskForTower');
const config = require('./config/config');
const webServer = require('./webServer');
const TRONGRID_API = config.trongridApi;
const PRIVATE_KEY = config.privateKey;

//  /////////////setTronWeb//////////////////////////////////////////////////////////////
utils.setTronWeb(
	new TronWeb(
		TRONGRID_API,
		TRONGRID_API,
		TRONGRID_API,
		PRIVATE_KEY
	)
);

// /////////////////betWatch/////////////////////////////////////////////////////////////
//tronWatcher.betWatchForTower();
tronWatcher.betWatchForDice();
//tronWatcher.betWatchForRing();

/////////////////////task////////////////////////////////////////////////////////////////
/////////////////////dice////////////////////////////////////
//每日12点计算分红
taskForDice.scheduleCalcShares();

//邀请人排行榜
taskForDice.scheduleCalcInviteAmount();
taskForDice.scheduleUpdateInviteRank();
taskForDice.scheduleShareInvitePrize();

//质押额排行榜
taskForDice.scheduleUpdateDepositRank();
taskForDice.scheduleShareDepositPrize();

//百万下注公告
taskForDice.scheduleCalcDailyBetAnnounce();


/////////////////////ring////////////////////////////////////////////
//ring 游戏开始
//taskForRing.startGame();

//订阅公告
taskForRing.rarelyAnnounce(webServer.io.sockets);

//rarely win
taskForRing.scheduleCalcDailyBetAnnounce();

//log account balance
taskForRing.logAccountBalance();

////////////////tower////////////////////////////////////
taskFOrTower.scheduleCalcOdinShare();