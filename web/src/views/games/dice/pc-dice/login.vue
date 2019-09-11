<template>
  <div>
    <div class="login-box">
      <div class="login-content">
        <!--   <div class="balance">
        <span>TRX {{$t('betting.balance')}}: </span>
        <span>{{trxFreeBalance}}</span>
        </div>-->
        <div v-if="!isLogin" class="login" @click="login()">{{$t('header.login')}}</div>
        <div class="random-but" v-if="isLogin">
          <button v-if="!isBet" class="login" @click="betting()">{{$t('betting.bet')}}</button>
          <button v-if="isBet" class="login" @click="betting()" :disabled="betDisabled">{{randomNum}}</button>
          <!-- <div v-if="isBet" class="randomNum">{{randomNum}}</div> -->
        </div>

        <!-- <div class="balance">
        <span>{{$t('betting.freeBalance')}}: </span>
        <span>{{odinFreeBalance}}</span>
        </div>-->
      </div>
      <tron-link v-show="showTronDialog" @closeTronLinkModule="closeTronLinkModule"></tron-link>
    </div>
    <div class="login-switch">
      <el-switch
        v-model="value4"
        active-color="#00E9E1"
        :inactive-text="$t('betting.autoBet')"
        @change="autoBet"
      ></el-switch>
    </div>
  </div>
</template>

<script>
import { getMyBetList } from "@/service/api";
import TronLink from "@/components/dialog/tron-link.vue";
import utilsTron from "@/utilsTron";

export default {
  name: "Login",

  components: { TronLink },

  props: ["baseValue", "betPrice", "activeName"],

  computed: {
    'isLogin': function() {
      return this.$store.getters.IS_USER_LOGIN;
    },

    'tronwebObj': function() {
      return this.$store.getters.GET_RING_TRON_WEB;
    },

    'trxFreeBalance': function() {
      if (this.$store.getters.GET_TRX_FREE_BALANCE > 0) {
        return this.$store.getters.GET_TRX_FREE_BALANCE.toFixed(2);
      }
    },

    'odinFreeBalance': function() {
      return this.$store.getters.GET_ODIN_FREE_BALANCE;
    },

    /* 历史最新的交易记录 */
    'mineBetRecordId': function() {
      return this.$store.getters.GET_NEW_BET_RECORD;
    },

    'getToken': function() {
      return this.$store.getters.GET_TOKEN;
    },
   
  },

  data() {
    return {
      tronBalance: 100,
      value4: false,
      showTronDialog: false,
      randomNum: "",
      interval: "",
      isBet: false,
      betDisabled: false,
      isAutoBet: false,
      dataBetList: [],
      countNum: 0,
      countdown: 30,
      timer: Function,
      isVip: false,
      isSuccessBet: false,
      val:0

    };
  },

  watch: {
    countdown(newVal, oldVal) {
      if (!!newVal && newVal != 30) {
        // console.log("newVal:====>",newVal,"newVal:====>",newVal);
        this.timer = setTimeout(() => {
          this.getMyBetList(2);
          this.countdown--;
        }, 500);
      } else {
        // console.log("newVal2:---->",newVal,"newVal2:---->",newVal);
        this.isBet = false;
        this.countdown = 30;
        clearTimeout(this.timer);
        if (this.interval) {
          this.val--;
          // console.log("countdown：清除定時器");
          clearInterval(this.interval);
          this.interval = "";
        }
      }
    }
  },

  mounted() {
    // console.log("this.activeName:===>",this.activeName);
  },

  methods: {
    login() {
      if (this.tronwebObj) {
        if (
          this.tronwebObj.defaultAddress.hex &&
          this.tronwebObj.defaultAddress.base58
        ) {
          let base58Name = "";
          this.$store.commit(
            "SET_TOKEN",
            this.tronwebObj.defaultAddress.base58
          );
          if (this.tronwebObj.defaultAddress.base58.length > 15) {
            base58Name =
              this.tronwebObj.defaultAddress.base58.substring(0, 3) +
              "..." +
              this.tronwebObj.defaultAddress.base58.substring(
                this.tronwebObj.defaultAddress.base58.length - 3,
                this.tronwebObj.defaultAddress.base58.length
              );
          } else {
            base58Name = this.tronwebObj.defaultAddress.base58;
          }
          this.$store.commit("SET_ACCOUNT_NAME", base58Name);
          utilsTron.setTronWeb(this.tronwebObj);
          this.initData();
        } else {
          this.$message({
            message: this.$t("betting.loginTronLink"),
            type: "warning"
          });
        }
      } else {
        this.showTronDialog = true;
      }
    },

    async initData() {
      this.getMyBetList(1);
      // this.isVip = await utilsTron.checkOcnAddr(this.tronwebObj.defaultAddress.base58);
      // if(this.isVip){
      //   this.$message({
      //     message: '欢迎ocn用户加入oscar生态，您将获得50%的挖矿加成。',
      //     type: 'success'
      //   });
      // }
      let mintLevelAndOverage = await utilsTron.getMintLevelAndOverage(); //挖矿阶段和当前阶段挖矿剩余量
      this.$store.commit("SET_MINT_RATE", mintLevelAndOverage.mintRate);
      this.$store.commit("SET_OVERAGE", mintLevelAndOverage.overage);
      this.$store.commit("SET_MINT_LEVEL", mintLevelAndOverage.mintLevel);
      let amount = mintLevelAndOverage.amount;
      if (mintLevelAndOverage.overage && amount) {
        let overage = mintLevelAndOverage.overage / amount;
        let phaseRatio = (overage * 100).toString().substring(0, 2);
        let num = parseInt(phaseRatio);
        this.$store.commit("SET_PHASE_RATIO", num);
      }
    },

    async betting() {
      this.isSuccessBet = false
      let _type = 0;
      if (this.trxFreeBalance < 10) {
        this.$message({
          message: this.$t("betting.betBalanceFail"),
          type: "error"
        });
          return;
      }
      let _betNumber = this.baseValue; // 基准数
      if (this.activeName == "first") {
        _type = 0;
      } else if (this.activeName == "second") {
        _type = 1;
      }
      let _betValue = this.betPrice * Math.pow(10, 6); //投注的TRX量
      let _inviterPAddr = this.$route.query.from || ""; // from add 邀请地址
      if (this.betPrice <= 0) {
        this.$message({
          message: this.$t("betting.enterAmount"),
          type: "error"
        });
        return;
      } else if (this.betPrice < 10) {
        this.$message({
          message: this.$t("betting.minTrx") + "TRX！",
          type: "error"
        });
        return;
      } else {
        this.intervalFun();
        this.countdown--;
        // console.log("this.countdown:-=====>",this.countdown);
        let res = await utilsTron.diceBet(_betNumber, _betValue, _type, _inviterPAddr); //投注
        
      }
    },

    initInterval() {
      this.countdown = 30;
      this.isSuccessBet = true;
      if (this.interval) {
        this.val--;
        // console.log("initInterval：清除定時器");
        clearInterval(this.interval);
        this.interval = "";
      }
      this.isBet = false;
      clearTimeout(this.timer);
    },

    getTime(){
      let _this = this;
      setTimeout(
        function(){ 
          _this.isBet = true;
          clearInterval(_this.interval); 
          _this.interval = "";
          _this.val--;
          // console.log('this.val:------->',_this.val);
          
          _this.betting();
        }, 2000);
      // this.betting()
    },
    /* 获取账户TRX余额 */
    async tronData(_addr) {
      if (this.tronwebObj) {
        if (_addr) {
          let trxBalance = await this.tronwebObj.trx.getBalance(_addr);
          if (trxBalance > 0) {
            let trxFreeBalance = trxBalance / Math.pow(10, 6);
            this.$store.commit("SET_TRX_FREE_BALANCE", trxFreeBalance);
          }
          let odinFreeBalance = await utilsTron.getFreeBalanceOf(_addr);
          this.$store.commit("SET_ODIN_FREE_BALANCE", odinFreeBalance);
        }
      }
    },

    /* 获取我的投注 params type:1登录成功就获取历史最新的交易记录， type:2，投注后产生的最新数据和历史的最新作比较 */
    getMyBetList(type) {
      let params = { Count: 1, Addr: this.getToken };
      getMyBetList(params).then(result => {
        // console.log("isSuccessBet:========>", this.isSuccessBet);
        if (result) {
          if (result.length > 0) {
            this.dataBetList = result;
            let betId = parseInt(this.dataBetList[0].betId);
            // console.log("betId:========>", betId);
            // console.log("this.mineBetRecordId:========>", this.mineBetRecordId);
            if (type == 2) {
              if(this.mineBetRecordId==-1){
                  this.$message({
                        message: this.$t("betting.diceToop"), 
                        type: "error"
                      });
                  return ;
              }
              // debugger
              if (betId > this.mineBetRecordId) {
                //成功获取到了投注后的最新记录 
                if (!this.isSuccessBet) {
                  if (this.dataBetList[0].lotteryNumber) {
                    // console.log("开奖的数:==>",this.dataBetList[0].lotteryNumber);
                    
                    this.$store.commit("SET_LOTTERY_NUMBER",this.dataBetList[0].lotteryNumber);
                    this.tronData(this.getToken); // 获取账户TRX余额
                    if (this.dataBetList[0].bonus == 0) {
                      // 奖励 输掉了比赛
                      this.$message({
                        message: this.$t("betting.lost"),
                        type: "error"
                      });
                      // console.log("输掉了比赛:==>", this.dataBetList[0].bonus);
                    
                      this.initInterval();
                      if (this.isAutoBet) {
                        //自动投注
                        // this.betting();
                        this.getTime()
                      }
                    } else {
                      // 赢得了比赛
                      let winNum = (this.dataBetList[0].bonus / Math.pow(10, 6)).toFixed(4);
                      // console.log("赢得了比赛:==>", winNum);
                      let str = winNum.toString();
                      let winStr = str.substring(0, str.length - 1);
                      this.$message({
                        message:
                          this.$t("betting.congratulations") + winStr + "TRX",
                        type: "success"
                      });
                      // console.log("赢得了比赛"); 
                    }
                    this.initInterval();
                    if (this.isAutoBet) {
                      //自动投注
                      // this.betting();
                       this.getTime()
                    }
                  } else {
                    // console.log('还没有拿到最新的投注记录（还没有到链上）');
                    if (!this.isSuccessBet) {
                      this.$message({
                        message: this.$t("betting.betFail"),
                        type: "error"
                      });
                    }
                    this.initInterval();
                  }
                }
              } else if (betId == this.mineBetRecordId) {
                //还没有拿到最新的投注记录（还没有到链上）
                if (this.countdown == 1 && !this.isSuccessBet) {
                  // 超时直接报错提示
                  // console.log('超时直接报错提示');
                  this.$message({
                    message: this.$t("betting.betFail"),
                    type: "error"
                  });
                  this.initInterval();
                }
              } else {
                // console.log('投注失败');
                if (!this.isSuccessBet) {
                  this.$message({
                    message: this.$t("betting.betFail"),
                    type: "error"
                  });
                }
                this.initInterval();
              }
            }
            this.$store.commit("SET_NEW_BET_RECORD", betId);
          }
        } else {
          // 服务器错误
          // console.log('服务器错误');
          if (!this.isSuccessBet) {
            this.$message({
              message: this.$t("betting.serviceErrorInfo"),
              type: "error"
            });
          }
          this.initInterval();
        }
      });
    },

    closeTronLinkModule() {
      this.showTronDialog = false;
    },

    intervalFun() {
      this.isBet = true;
      this.betDisabled = true;
      // console.log("intervalFun：開定時器");
      this.val++;
      if(this.val>1){
        // debugger
      }
      this.interval = setInterval(this.randomFun, 100);
    },

    randomFun() {
      this.randomNum = Math.round(Math.random() * 100); //基本均衡获取0到10的随机整数，其中获取最小值0和最大值10的几率少一半。
    },

    autoBet(type) {
      this.isAutoBet = type;
      if (!this.isLogin) {
        this.$message({
          message: this.$t("betting.pleaseLogin"),
          type: "error"
        });
      }
    }
  }
};
</script>

<style lang="less">
.login-box {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
  position: relative;
  .el-switch__label.is-active {
    color: #fff;
  }
  .el-switch__label {
    color: #999;
  }
  .login-content {
    width: 100%;
    .login {
     
      border: none;
      margin: 0 auto;
      cursor: pointer;
      font-size: 46px;
      font-family: "PingFang-SC-Bold";
      font-weight: bold;
      color: #181845;
      width: 260px;
      line-height: 54px;
      background: rgba(0, 233, 225, 1);
      border-radius: 10px;
    }

    .login:hover {
      opacity: 0.7;
    }

    .random-but {
      position: relative;
      .login {
       
        border: none;
        cursor: pointer;
        font-size: 46px;
        font-family: "PingFang-SC-Bold";
        font-weight: bold;
        color: #181845;
        width: 260px;
        line-height: 54px;
        background: rgba(0, 233, 225, 1);
        border-radius: 10px;
      }
      .randomNum {
        position: absolute;
        cursor: pointer;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 50%;
        font-size: 18px;
        border: 5px solid #565656;
        background: #000;
        opacity: 0.8;
        color: rgb(75, 219, 39);
        top: -12px;
        left: 30px;
      }
    }
  }
}
.login-switch {
  margin: 10px auto;
}
.login-switch .el-switch__label.is-active {
  color: #fff;
}
.login-switch .el-switch__label {
  color: #00e9e1;
}
</style>
