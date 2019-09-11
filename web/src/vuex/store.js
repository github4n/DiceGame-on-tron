import Vue from "vue";
import Vuex from "vuex";
import { setStore, getStore, removeStore } from "@/config/storage";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    token: getStore('token'),
    careType: '',
    bettingTimerCountDown: 'Lottery',
    ringTronWeb: '',
    tranwebToken: '',
    gameId: '',
    isAutoBet: true,
    betTrxCount: 50,
    selIndex: 0,



    accountName: '',
    tronweb: '',
    mintRate: '',
    overage: 0,
    mintLevel: '',
    odinFreeBalance: 0,
    maxDiceWagerPrice: 0,
    maxRingWagerPrice: 0,
    maxTreeWagerPrice: 0,
    trxFreeBalance: 0,
    lotteryNumber: 0,
    phaseRatio: 0,
    prizePot: 0,
    allPrizePot: 0,
    deposit: 0,
    totalDeposit: 0,
    totalDepotSupply: 0,
    earnings: 0,
    odinEarnings: 0,
    mineBetRecordId: -1,
    langularType: 'en',
    max2X: 60000,
    max3X: 40000,
    max5X: 24000,
    max30X: 4000,
    min2X: 50,
    min3X: 50,
    min5X: 50,
    min30X: 50,
    changeStatus: false,
    getLetnum:0,
    prizePot_animate: 0,
    bonusPrice: 0,
    open_sound: false,
  },

  // 定义mutations，可以传参，用于设置state里值 触发状态，同步
  mutations: {
    'SET_TOKEN'(state, token) {
      state.token = token;
      if(token){
        setStore("token", token);
      }else{
        removeStore('token');
      }
    },

    'SET_SEL_CARE'(state, careType) {
      state.careType = careType
    },

    /* 设置游戏下注时间倒计时 */
    'SET_BETTING_TIMER_COUNT_DOWN'(state, bettingTimerCountDown) {
      state.bettingTimerCountDown = bettingTimerCountDown
    },

    'SET_RING_TRON_WEB'(state, tranweb) {
      state.ringTronWeb = tranweb;
    },

    'SET_ACTIVE_TOTAL_PRICE'(state, bonusPrice) {
      state.bonusPrice = bonusPrice;
    },

    /* 设置token */
    'SET_RING_TOKEN'(state, tranwebToken) {
        state.tranwebToken = tranwebToken;
        localStorage.setItem('tranwebToken',tranwebToken)
    },

    /* 设置游戏Id */
    'SET_GAME_ID'(state, gameId) {
      state.gameId = gameId;
    },

    /* 设置是否自动投注 */
    'SET_AUTO_BET'(state, isAutoBet) {
      state.isAutoBet = isAutoBet;
    },

    /* 设置投注量 */
    'SET_BET_COUNT_TRX'(state, betTrxCount) {
      state.betTrxCount = betTrxCount;
    },




    'SET_ACCOUNT_NAME'(state, accountName) {
      state.accountName = accountName;
      localStorage.setItem('accountName', accountName);
    },

    'SET_TRON_WEB'(state, tronweb) {
      state.tronweb = tronweb;
    },
    
    'SET_MINT_RATE'(state, mintRate) {
      state.mintRate = mintRate;
      localStorage.setItem('mintRate', mintRate);
    },

    /* 挖矿阶段和当前阶段挖矿剩余量 */
    'SET_OVERAGE'(state, overage) {
      state.overage = overage;
      localStorage.setItem('overage', overage);
    },

    
    /* 第几阶段 */
    'SET_MINT_LEVEL'(state, mintLevel) {
      state.mintLevel = mintLevel;
      localStorage.setItem('mintLevel', mintLevel);
    },

     /* 当前可质押ODIN余额 */
    'SET_ODIN_FREE_BALANCE'(state, odinFreeBalance) {
      state.odinFreeBalance = odinFreeBalance;
    },

     /* 设置dice当前最大赌注金额 */
    'SET_DICE_MAX_WAGER_PRICE'(state, maxDiceWagerPrice) {
      state.maxDiceWagerPrice = maxDiceWagerPrice;
      //localStorage.setItem('maxDiceWagerPrice', maxDiceWagerPrice);
    },

    /* 设置ring当前最大赌注金额 */
    'SET_RING_MAX_WAGER_PRICE'(state, maxRingWagerPrice) {
      state.maxRingWagerPrice = maxRingWagerPrice;
      //localStorage.setItem('maxRingWagerPrice', maxRingWagerPrice);
    },

    /* 设置tree当前最大赌注金额 */
    'SET_TREE_MAX_WAGER_PRICE'(state, maxTreeWagerPrice) {
      state.maxTreeWagerPrice = maxTreeWagerPrice;
      //localStorage.setItem('maxTreeWagerPrice', maxTreeWagerPrice);
    },

      /* 账户TRX余额 */
    'SET_TRX_FREE_BALANCE'(state, trxFreeBalance) {
      state.trxFreeBalance = trxFreeBalance;
    },

    'SET_PHASE_RATIO'(state, phaseRatio) {
      state.phaseRatio = phaseRatio;
      localStorage.setItem('phaseRatio', phaseRatio);
    },

      /* 获取分红奖池余额 */
    'SET_PRIZE_POT_BALANCE'(state, prizePot) {
      state.prizePot = prizePot;
      //localStorage.setItem('totalDepotSupply', prizePot);
    },

      /* 获取总分红奖池余额 */
    'SET_ALL_PRIZE_POT_BALANCE'(state, allPrizePot) {
      state.allPrizePot = allPrizePot;
      //localStorage.setItem('totalDepotSupply', allPrizePot);
    },

     /* 当前已质押的ODIN量 */
    'SET_CURRENT_DEPOSIT_ODIN'(state, deposit) {
      state.deposit = deposit;
      //localStorage.setItem('currentDeposit', deposit);
    },

      /* 当前质押池ODIN总量 */
    'SET_CURRENT_ODIN_TOTAL_DEPOSIT'(state, totalDeposit) {
      state.totalDeposit = totalDeposit;
      //localStorage.setItem('currentTotalDeposit', totalDeposit);
    },

     /* ODIN流通总量 */
    'SET_ODIN_YOYAL_DEPOT_SUPPLY'(state, totalDepotSupply) {
      state.totalDepotSupply = totalDepotSupply;
      //localStorage.setItem('totalDepotSupply', totalDepotSupply);
    },

    
    /* 预期收益 */
    'SET_EARNINGS'(state, earnings) {
      state.earnings = earnings;
      //localStorage.setItem('totalDepotSupply', earnings);
    },

    
    /* 每万收益 */
    'SET_ODIN_EARNINGS'(state, odinEarnings) {
      state.odinEarnings = odinEarnings;
      //localStorage.setItem('totalDepotSupply', odinEarnings);
    },

     /* 设置自己最新投注的记录 */
    'SET_NEW_BET_RECORD'(state, mineBetRecordId) {
      state.mineBetRecordId = mineBetRecordId;
      localStorage.setItem('maxDiceWagerPrice', mineBetRecordId);
    },

    /* 每次投注随机产生的数 */
    'SET_LOTTERY_NUMBER'(state, lotteryNumber) {
      state.lotteryNumber = lotteryNumber;
      localStorage.setItem('totalDepotSupply', lotteryNumber);
    },

    'SET_LANGUAR_TYPE'(state, langularType) {
      state.langularType =langularType;
    },

    'SET_SELINDEX'(state, selIndex) {
      state.selIndex = selIndex;
      localStorage.setItem('selIndex', selIndex);
    },

    'SET_2X_MAX'(state, vaule) {
      state.max2X = vaule;
    },

    'SET_3X_MAX'(state, vaule) {
      state.max3X = vaule;
    },

    'SET_5X_MAX'(state, vaule) {
      state.max5X = vaule;
    },

    'SET_30X_MAX'(state, vaule) {
      state.max30X = vaule;
    },

    'SET_2X_MIN'(state, vaule) {
      state.min2X = vaule;
    },

    'SET_3X_MIN'(state, vaule) {
      state.min3X = vaule;
    },

    'SET_5X_MIN'(state, vaule) {
      state.min5X = vaule;
    },

    'SET_30X_MIN'(state, vaule) {
      state.min30X = vaule;
    },

    'SET_CHANGE_STATUS'(state, vaule) {
      state.changeStatus = vaule;
    },

    'SET_LETNUM'(state, vaule) {
      state.getLetnum = vaule;
    },

    'SET_PRIZEPOT_ANIMATE'(state, vaule) {
        state.prizePot_animate = vaule;
    },

    'SET_OPEN_SOUND'(state, vaule) {
        state.open_sound = vaule;
    },
  },

  // 定义getters，用于获取出state里的对象
  getters: {
    'IS_USER_LOGIN'(state) {
      if (state.tranwebToken) {
        return true;
      } else {
        return false;
      }
    },

    'GET_TOKEN'(state) {
      return state.token;
    },

    'GET_SEL_CARE'(state) {
      return state.careType;
    },

    'GET_BETTING_TIMER_COUNT_DOWN'(state) {
      return state.bettingTimerCountDown;
    },

    'GET_RING_TRON_WEB'(state) {
      return state.ringTronWeb;
    },

    'GET_RING_TRON_WEB_TOKEN'(state) {
        return state.tranwebToken;
    },

    'GTE_GAME_ID'(state) {
        return state.gameId;
    },

    'GET_AUTO_BET'(state) {
        return state.isAutoBet;
    },

    'GET_BET_COUNT_TRX'(state) {
      return state.betTrxCount;
    },

    'GET_ACTIVE_TOTAL_PRICE'(state) {
      return state.bonusPrice;
    },


    'GET_ACCOUNT_Name'(state) {
      return state.accountName;
      //return localStorage.getItem('accountName');
    },
    
    'GET_TRON_WEB'(state) {
      return state.tronweb;
    },

    'GET_MINT_RATE'(state) {
      return state.mintRate
    },

    'GET_OVERAGE'(state) {
      return state.overage
    },

    'GET_MINT_LEVEL'(state) {
      return state.mintLevel
    },

    'GET_ODIN_FREE_BALANCE'(state) {
      return state.odinFreeBalance
    },

    /* 获取dice当前最大赌注金额 */
    'GET_DICE_MAX_WAGER_PRICE'(state) {
      return state.maxDiceWagerPrice
    },

    /* 获取ring当前最大赌注金额 */
    'GET_RING_MAX_WAGER_PRICE'(state) {
      return state.maxRingWagerPrice
    },

    /* 获取tree当前最大赌注金额 */
    'GET_TREE_MAX_WAGER_PRICE'(state) {
      return state.maxTreeWagerPrice
    },

    'GET_TRX_FREE_BALANCE'(state) {
      return state.trxFreeBalance
    },

    /* 每次投注随机产生的数 */
    'GET_LOTTERY_NUMBER'(state, lotteryNumber) {
      return state.lotteryNumber
    },

    'GET_PHASE_RATIO'(state) {
      return state.phaseRatio
    },

    'GET_PROZE_POT'(state) {
      return state.prizePot
    },

    'GET_ALL_PROZE_POT'(state) {
      return state.allPrizePot
    },

    'GET_CURRENT_DEPOSIT_ODIN'(state) {
      return state.deposit
    },

    'GET_CURRENT_ODIN_TOTAL_DEPOSIT'(state) {
      return state.totalDeposit
    },

    'GET_ODIN_YOYAL_DEPOT_SUPPLY'(state) {
      return state.totalDepotSupply
    },

    'GET_EARNINGS'(state) {
      return state.earnings
    },

    'GET_ODIN_EARNINGS'(state) {
      return state.odinEarnings
    },

      /* 获取自己最新投注的记录 */
    'GET_NEW_BET_RECORD'(state) {
      return state.mineBetRecordId;
    },

    'GET_LANGUAR_TYPE'(state) {
      return state.langularType;
    },

    'GET_SELINDEX'(state) {
      return localStorage.getItem('selIndex');
    },

    'GET_2X_MAX'(state) {
      return state.max2X;
    },

    'GET_3X_MAX'(state) {
      return state.max3X;
    },

    'GET_5X_MAX'(state) {
      return state.max5X;
    },

    'GET_30X_MAX'(state) {
      return state.max30X;
    },

    'GET_2X_MIN'(state) {
      return state.min2X;
    },

    'GET_3X_MIN'(state) {
      return state.min3X;
    },

    'GET_5X_MIN'(state) {
      return state.min5X;
    },

    'GET_30X_MIN'(state) {
      return state.min30X;
    },

    'GET_CHANGE_STATUS'(state) {
      return state.changeStatus;
    },
    'GET_LETNUM'(state) {
      return state.getLetnum;
    },

    'GET_PRIZEPOT_ANIMATE'(state) {
        return state.prizePot_animate;
    },

    'GET_OPEN_SOUND'(state) {
        return state.open_sound;
    },
  },

  // 异步
  actions: {}
});
