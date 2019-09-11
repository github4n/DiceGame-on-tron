<template>
  <div class='app-record-list'>
    <div class='strike'>
        <div class='table-header'>
          <div class='table-title' :class="{'current': selIndex == 1}" @click="handleClick(1)">{{$t('betting.allBets')}}</div>
          <div class='table-title' :class="{'current': selIndex == 2}" @click="handleClick(2)">{{$t('betting.myBets')}}</div>
        </div>
         
        <div class='strike-bets' v-show='weekShow'>
          <table class="rabk-table" border="0" cellpadding="0" cellspacing="0">
            <thead align="center">
              <tr>
                <th><span>{{$t('inviterPage.Verification')}}</span></th>
                <th><span>{{$t('betting.bettor')}}</span></th>
                <th><span>{{$t('betting.rollUnder')}}</span></th>
                <th><span>{{$t('betting.bet')}}</span></th>
                <th><span>{{$t('betting.roll')}}</span></th>
                <th><span>{{$t('betting.bonus')}}</span></th>
              </tr>
            </thead> 
          </table>

          <div class="bet-table-body" >
            <table v-if="newDataList[0]!=undefined" border="0" cellspacing="0"  cellpadding="0">
              <tbody>
               <tr v-for="(item, index) in newDataList" :key='index'>
                  <td v-if="item.bonus == 0" style="color:red;" @click="showFair(item.betId)">{{$t('inviterPage.Verification')}}</td>
                  <td v-else style="color:#00FAAC;" @click="showFair(item.betId)">{{$t('inviterPage.Verification')}}</td>

                  <td v-if="item.bonus == 0" style="color:red;">{{item.addr | dddressatFormat}}</td>
                  <td v-else style="color:#00FAAC;">{{item.addr | dddressatFormat}}</td>

                   <td v-if="item.bonus == 0" style="color:red;">
                    <span v-if="item.betType == 0">↑</span> 
                    <span v-if="item.betType == 1">↓</span> {{item.betNUm}}</td>
                  <td v-else style="color:#00FAAC;">
                    <span v-if="item.betType == 0">↑</span> 
                    <span v-if="item.betType == 1">↓</span> {{item.betNUm}}</td>
                 <!--  <td v-if="item.bonus == 0" style="color:red;">
                    <span v-if="item.betType == 0">↑ </span> 
                    <span v-if="item.betType == 1">↓</span> {{item.betNUm}}</td>
                  <td v-else style="color:#00FAAC;">
                    <span v-if="item.betType == 0">↑ <i class="el-icon-top"></i></span> 
                    <span v-if="item.betType == 1">↓<i class="el-icon-bottom"></i></span> {{item.betNUm}}</td> -->

                  <td v-if="item.bonus == 0" style="color:red;">{{item.betValue/Math.pow(10, 6)}}</td>
                  <td v-else style="color:#00FAAC;">{{item.betValue/Math.pow(10, 6)}}</td>
                  <td v-if="item.bonus == 0" style="color:red;">{{item.lotteryNumber}}</td>
                  <td v-else style="color:#00FAAC;">{{item.lotteryNumber}}</td>
                  <td v-if="item.bonus == 0" style="color:red;">{{(item.bonus/Math.pow(10, 6)).toFixed(2)}}</td>
                  <td v-else style="color:#00FAAC;">{{(item.bonus/Math.pow(10, 6)).toFixed(2)}}</td>
               </tr>
              </tbody>
            </table>
          </div>
        </div>
      
        <div class='strike-bets' v-show='rewardShow'>
          <table class="rabk-table" border="0" cellpadding="0" cellspacing="0">
            <thead align="center">
              <tr>
                <th><span>{{$t('inviterPage.Verification')}}</span></th>
                <th><span>{{$t('betting.bettor')}}</span></th>
                <th><span>{{$t('betting.rollUnder')}}</span></th>
                <th><span>{{$t('betting.bet')}}</span></th>
                <th><span>{{$t('betting.roll')}}</span></th>
                <th><span>{{$t('betting.bonus')}}</span></th>
              </tr>
            </thead>
          </table>

          <div class="bet-table-body">
            <table border="0" cellspacing="0" cellpadding="0">
              <tbody>
                <tr v-for="(item, index) in dataBetList" :key='index'>
                  <td v-if="item.bonus == 0" style="color:red;">{{$t('inviterPage.Verification')}}</td>
                  <td v-else style="color:#00FAAC;">{{$t('inviterPage.Verification')}}</td>
                  <td v-if="item.bonus == 0" style="color:red;">{{item.addr | dddressatFormat}}</td>
                  <td v-else style="color:#00FAAC;">{{item.addr | dddressatFormat}}</td>


                   <td v-if="item.bonus == 0" style="color:red;">
                    <span v-if="item.betType == 0">↑</span> 
                    <span v-if="item.betType == 1">↓</span> {{item.betNUm}}</td>
                  <td v-else style="color:#00FAAC;">
                    <span v-if="item.betType == 0">↑</span> 
                    <span v-if="item.betType == 1">↓</span> {{item.betNUm}}</td>
                <!--   <td v-if="item.bonus == 0" style="color:red;">
                    <span v-if="item.betType == 0">under</span> 
                    <span v-if="item.betType == 1">over</span> {{item.betNUm}}</td>
                  <td v-else style="color:#00FAAC;">
                    <span v-if="item.betType == 0">under</span> 
                    <span v-if="item.betType == 1">over</span> {{item.betNUm}}</td> -->

                  <td v-if="item.bonus == 0" style="color:red;">{{item.betValue/Math.pow(10, 6)}}</td>
                  <td v-else style="color:#00FAAC;">{{item.betValue/Math.pow(10, 6)}}</td>
                  <td v-if="item.bonus == 0" style="color:red;">{{item.lotteryNumber}}</td>
                  <td v-else style="color:#00FAAC;">{{item.lotteryNumber}}</td>
                  <td v-if="item.bonus == 0" style="color:red;">{{(item.bonus/Math.pow(10, 6)).toFixed(2)}}</td>
                  <td v-else style="color:#00FAAC;">{{(item.bonus/Math.pow(10, 6)).toFixed(2)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>

    <app-dice-fair :baseInfo='baseInfo' v-show="showFairDialog" @closeFairModule='closeFairModule'></app-dice-fair>
  </div>
</template>

<script>
import { getMyBetList , getBetRecordList , diceGetVerifyRandom } from '@/service/api';
import utilsTron from '@/utilsTron';
import appDiceFair from '@/components/app-dialog/app-dice-fair';
let moment = require("moment");
export default {
  components:{ appDiceFair },

  data(){
    return {
      selMenu: 1,
      interval: '',
      betMenu: this.$t('betting.myBets'),
      allBetMenu: this.$t('betting.allBets'),
      activeName: 'first',
      weekShow: true,
      selIndex: 1,
      dataList:[],
      dataBetList:[],
      rewardShow: false,

      baseInfo: {},

      allDataList: [],
      newDataList: [],

      showFairDialog: false,
    }
  },

  mounted() {
      this.getBetRecordList();
       this.getMyBetList()
      this.initData();
      this.getAllRecordList();
    },

  methods:{
    showFair(info){
      this.showFairDialog = true;
      let params = {'BetId':  info}
      // let params = {'Addr':  'TGahEPj2Nr6EbvdXW3rFH9BUR6oXxoaXVW'}
      diceGetVerifyRandom(params).then( res => {
        this.baseInfo = res;
        //this.showFairDialog = true;
      })
    },

    closeFairModule() {
      this.showFairDialog = false;
    },

    tableRowClassName({row, rowIndex}) {
      if(row){
        var price = row.bonus;
        if (parseInt(price) > 0) {
          return 'success-row';
        } else{
          return 'warning-row';
        }
        return '';
      }
    },

    initData(){
      setInterval(this.getBetRecordList, 2000);
      setInterval(this.getMyBetList, 2000);

      setInterval(this.getRandomList, 250);
    },

    /* 所有投注 */
    getBetRecordList(){
      let params = {'Count': 30};
      getBetRecordList(params).then(result => {
        this.dataList = result; 
      })
    },

    /* 获取我的投注 */
    getMyBetList(){
      let params = {'Count': 30, 'Addr': localStorage.getItem('token')};
      getMyBetList(params).then(result => {
        // debugger
        this.dataBetList = result;
      })
    }, 

    /* 所有投注 */
    getAllRecordList(){
      let params = {'Count': 800};
      getBetRecordList(params).then(result => {
        this.allDataList = result; 
        this.getRandomList();
      })
    },


    getRandomList(){
      this.newDataList = [];
      for(var i=0; i<30; i++){
        let id = parseInt(Math.random()*this.allDataList.length)
        this.newDataList.push( this.allDataList[id]);
      }
      // console.log(this.newDataList)
    },


    addZero(num){
      if(parseInt(num) < 10){
          num = '0'+num;
      }
      return num;
    },
    //时间格式化
    dateFormat(row, column) {
      if(row){
        var date = parseInt(row.time);
        if (date == undefined) {
          return "";
        }
        let timer = moment(date).format("YYYY-MM-DD HH:mm:ss");
        return timer;
      }
    },

    dateBetValue(row, column) {
      if(row){
        var date = parseInt(row.betValue);
        if (date == undefined) {
          return "";
        }
        let val = date / Math.pow(10, 6);
        return val + ' TRX';
      }
    },

    priceFormat(row, column) {
      var price = row.bonus;
      if (price == undefined) {
        return "";
      }
      return price / Math.pow(10, 6).toFixed(4);
    },

    handleClick(index) {
      this.selIndex = index;
      if(index == 1){
        this.weekShow = true;
        this.rewardShow = false;
       this.getBetRecordList();
      }else if(index == 2){
        this.weekShow = false;
        this.rewardShow = true;
       this.getBetRecordList();
      }

     /*  if(tab.index == 0){
        this.getBetRecordList();
      }else if(tab.index == 1){
        if(this.isLogin)
          this.getBetRecordList();
        else
          this.$message({
            message:  this.$t('betting.loginTronLink'),
            type: 'error'
          });
      } */
    }
  },

  filters:{
    priceFormat(vaule) {
      if (vaule == undefined) {
        return "";
      }
      return parseInt(vaule / Math.pow(10, 6));
    },
    
    dddressatFormat(addr) {
      if (addr == undefined) {
        return "";
      }
      let addStr = addr.substring(0,3) + '...' + addr.substring(addr.length-3, addr.length);
      return addStr;
    }
  },

   computed: {
      'isLogin': function() {
        return this.$store.getters.IS_USER_LOGIN;
      },
    },
}
</script>

<style lang='less'>
  .app-record-list{
    width:100%;
    box-sizing: border-box;
    display: flex;
    margin-top: 30px;
    .strike{
      position: relative;
      box-sizing: border-box;
      width: 100%;
      .table-header{
        display: flex;
        justify-content: center;
        padding: 10px;
        box-sizing: border-box;
        .table-title{
          color: #00E9E1;
          border: 1px solid #00E9E1;
          margin-right: 10px;
          padding: 6px 20px;
          border-radius: 6px; 
          cursor: pointer;
          font-size: 13px;
        }
        .current{
          background: #00E9E1;
          color: #181845;
        }
      }
      .strike-bets{
        .rabk-table{
          width: 100%;
          color: #fff;
          background: transparent;
          thead{
            height: 60px;
            line-height: 60px;
            background: transparent;
            tr th{
              span{
                color: #00E9E1;
                font-size: 10px;
              }
            }
            tr th:nth-child(1){
              width: 13%;
            }
            tr th:nth-child(2){
              width: 32%;
            }
            tr th:nth-child(3){
              width: 15%;
            }
            tr th:nth-child(4){
              width: 15%;
            }
            tr th:nth-child(5){
              width: 17%;
            }
            tr th:nth-child(6){
              width: 15%;
              
            }
          }
        }
        .bet-table-body{
          padding-top: 5px;
          width: 100%;
          table{
            width: 100%;
            tbody{
              tr{
                 border: 1px solid #00E9E1;
                border-radius: 4px; 
                display: flex;
                margin-bottom: 10px; 
                width: 100%;
                padding: 0px 6px;
                box-sizing: border-box; 
              }
              tr td{
                color: #fff;
                font-size: 13px;
                line-height: 40px;
                height: 40px;
              }
              tr td:nth-child(1){
                width: 13%;
                position: relative;
                top: 0px;
              }
              tr td:nth-child(2){
                width: 32%;
                box-sizing: border-box;
              }
              tr td:nth-child(3){
                width: 15%;
              }
              tr td:nth-child(4){
                width: 15%;
              }
              tr td:nth-child(5){
                width: 17%;
              }
              tr td:nth-child(6){
                width: 15%;
              }
            }
          }
        }
      }
    }
  }

  .el-tabs__item.is-active {
    font-weight: 600;
    color: #039074 !important;
    font-size: 14px;
  }
  
  .el-tabs__header{
    margin: 0;
  }

  .el-tabs__item{
    color: #ccc !important;
    font-weight: 600;
  }

  .el-tabs__item:hover {
    color: #039074 !important;
    font-weight: 600;
    opacity: .7;
  }

  .el-table tr {
    background-color: #084744;
  }

  .el-table__empty-block{
    background: #2C363D;
  }
  
  .el-tabs__nav-wrap::after{
    height: 0px;
  }

.strike-bets .el-tabs__nav-scroll{
  padding: 0 18px ;
}
.strike-bets .el-tabs__item.is-active {
  font-weight: 500;
  color: #05c19c !important;
  font-size: 14px;
}
.strike-bets .el-tabs__item{
  color: #fff !important;
  font-weight: normal !important;
}
.strike-bets .el-tabs__item:hover {
  color: #05c19c !important;
  opacity: 1 !important;
}
</style>

