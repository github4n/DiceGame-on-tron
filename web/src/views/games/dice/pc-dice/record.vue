<template>
  <div class='record-box'>
    <el-tabs class="recordClassDice" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('betting.allBets')" name="first">
        <el-table :data="dataList" style="width: 100%" size='small' :row-class-name="tableRowClassName"
        rules=none cellspacing=0 align=center>
          <el-table-column prop="time"  width="200" :formatter="dateFormat" :label="$t('betting.time')"></el-table-column>
          <el-table-column prop="addr" :label="$t('betting.bettor')"></el-table-column>
          <el-table-column width="150" prop="betNUm" :label="$t('betting.rollUnder')"></el-table-column>
          <el-table-column width="120" :formatter="dateBetValue" prop="betValue" :label="$t('betting.bet')"></el-table-column>
          <el-table-column width="120" prop="lotteryNumber" :label="$t('betting.roll')"></el-table-column>
          <el-table-column width="130" :formatter="priceFormat" prop="bonus" :label="$t('betting.bonus')"></el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane :label="$t('betting.myBets')" name="second">
        <el-table :data="dataBetList" style="width: 100%;overflow:hidden" size='small'
        :row-class-name="tableRowClassName" rules=none cellspacing=0 align=center>
          <el-table-column prop="time"  width="200" :formatter="dateFormat" :label="$t('betting.time')"></el-table-column>
          <el-table-column prop="addr" :label="$t('betting.bettor')"></el-table-column>
          <el-table-column width="150"  prop="betNUm" :label="$t('betting.rollUnder')"></el-table-column>
          <el-table-column width="120" :formatter="dateBetValue" prop="betValue" :label="$t('betting.bet')"></el-table-column>
          <el-table-column width="120" prop="lotteryNumber" :label="$t('betting.roll')"></el-table-column>
          <el-table-column width="130" :formatter="priceFormat" prop="bonus" :label="$t('betting.bonus')"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { getMyBetList , getBetRecordList } from '@/service/api';
  import utilsTron from '@/utilsTron';
  let moment = require("moment");

  export default {
    name: 'RECORD',

    computed: {
      'isLogin': function() {
        return this.$store.getters.IS_USER_LOGIN;
      },
    },

    data() {
      return {
        selMenu: 1,
        dataList: [],
        interval: '',
        dataBetList: [],
        betMenu: this.$t('betting.myBets'),
        allBetMenu: this.$t('betting.allBets'),
        activeName: 'first'
      }
    },

    mounted() {
      this.getBetRecordList();
      this.initData();
    },

    methods: {
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
        this.interval = setInterval(this.getBetRecordList, 1000);
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
          this.dataBetList = result;
        })
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

      handleClick(tab, event) {
        if(tab.index == 0){
          this.getBetRecordList();
        }else if(tab.index == 1){
          if(this.isLogin)
            this.getBetRecordList();
          else
            this.$message({
              message:  this.$t('betting.loginTronLink'),
              type: 'error'
            });
        }
      }
    }
  }
</script>

<style lang='less'>
  .record-box{
    margin-top: 60px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    background: #141F27;
    .record-menu{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      box-sizing: border-box;
      //padding: 6px 30px;
      background:linear-gradient(0deg,rgba(167,141,101,1),rgba(247,233,179,1));
      .menu{
        cursor: pointer;
        font-weight:500;
        color:rgba(17,17,17,1);
        margin-right: 50px;
        padding: 3px 0;
      }
      .menu:hover{
        opacity: .7;
      }
      .active{
        border-bottom: 1px solid #111111;
      }
    }
  }

   
  .el-table::before {
    height: 0px;
    background-color: transparent !important;
  }

  .el-tabs__nav-wrap:after{
    background-color: transparent !important;
  }

  .el-table__header-wrapper{
    box-sizing: border-box;
    background-color: #141F27;
  }

  .el-table td {
    border-bottom: none !important;
  }

  .el-table th.is-leaf {
    border-bottom: none !important;
  }

  .el-table .warning-row {
    background:#565E64;
    color: #ccc;
  }

  .el-table .success-row {
    background: #2C363D;
    color: #ccc;
  }

  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #180602 !important;
    opacity: .5;
  }

  .el-tabs__nav-wrap::after{
    background-color: transparent;
  }

  .el-table th>.cell {
    color: #ccc;
    //opacity: 0.7;
    text-align: left;
  }

  .el-table--small th {
    background: #141F27 !important;
    border: 0px;
  }

  .el-table .cell {
    color: #ccc;
    text-align: left;
  }

  .el-table__empty-text{
    color: #ccc;
  }

  .el-tabs__nav-scroll{
    //padding: 0 10px;
    background: #565E64;
  }

  .el-tabs__item.is-active {
    font-weight: 600;
    color: #039074 !important;
  }

  .el-tabs__active-bar{
    background-color: none !important;
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

  
.recordClassDice .el-tabs__nav-scroll{
    background: #565e64 ;
    padding: 0 18px ;
}
.recordClassDice .el-tabs__item.is-active {
    font-weight: 500;
    color: #05c19c !important;
    font-size: 14px;
}
.recordClassDice .el-tabs__item{
    color: #fff !important;
    font-weight: normal !important;
}
.recordClassDice .el-tabs__item:hover {
    color: #05c19c !important;
    opacity: 1 !important;
}
</style>
