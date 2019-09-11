<template>
  <div class='my-invite'>
    <a name="myInvitation"></a>
    <!-- <div class="invite-con"> 
      <span class="inviteSpan">{{$t('inviterPage.accumulatorInviter')}}：35</span><br/>
    </div>
    <div class="invite-cont"> 
      <div class='invite-picture'>
        <img class='invite-img' src="../../assets/imgs/icon4-yqr.png" alt=""><br/>
        <span class="inviteSpen" >25</span><br/>
        <span class="inviteSpen2" >{{$t('inviterPage.weekly')}}</span>
      </div>

      <div class='invite-picture'>
        <img class='invite-img'  src="../../assets/imgs/icon5-yqr.png" alt=""><br/>
        <span class="inviteSpen" >1</span><br/>
        <span class="inviteSpen2" >{{$t('inviterPage.atAIowerLevel')}}</span>
      </div>

      <div class='invite-picture'>
        <img class='invite-img'  src="../../assets/imgs/icon6-yqr.png" alt=""><br/>
        <span class="inviteSpen" >10</span><br/>
        <span class="inviteSpen2" >{{$t('inviterPage.theCurrent')}}</span>
      </div>

      <div class='invite-picture'>
        <img class='invite-img' src="../../assets/imgs/icon7-yqr.png" alt=""><br/>
        <span class="inviteSpen" >15</span><br/>
        <span class="inviteSpen2" >{{$t('inviterPage.theProportion')}}</span>
      </div>

      <div class='invite-picture'>
        <img class='invite-img' src="../../assets/imgs/icon8-yqr.png" alt=""><br/>
        <span class="inviteSpen" >234</span><br/>
        <span class="inviteSpen2" >{{$t('inviterPage.commission')}}</span>
      </div>

      <div class='invite-picture'>
        <img class='invite-img' src="../../assets/imgs/icon9-yqr.png" alt=""><br/>
        <span style="color:rgba(254,235,103,1);" class="inviteSpen" >2341</span><br/>
        <span class="inviteSpen2" >{{$t('inviterPage.LowerCommissions')}}</span>
      </div>
    </div> -->
    <div class="myinvite-content">  
      <!-- <span class="myinvite">//&nbsp;&nbsp;&nbsp;{{$t('inviterPage.myInvitation')}}&nbsp;&nbsp;&nbsp;//</span><br/> -->
      <span class="myinvite">&nbsp;&nbsp;&nbsp;{{$t('inviterPage.myInvitation')}}&nbsp;&nbsp;&nbsp;</span><br/>
    </div>
    <div class="myinvite-tab"> 
  

        <div  class='week-style'>
          <span style='margin-right: 20px;'>{{$t('inviterPage.activeWeek')}}: {{activeUserCnt}}</span>
          <span>{{$t('inviterPage.betWeek')}}: {{totalBetThisWeek | priceFormat}}</span>
        </div>

        <div class="payout-list-table">
          <div class="table-header">
            <div class="timer1">
              {{$t('inviterPage.url')}}
            </div>
            <div class="timer2">
              {{$t('inviterPage.wagerOfTheWeek')}}
            </div>
            <div class="timer3">
              {{$t('inviterPage.theAmountOf')}}
            </div>
          </div>
          <a name="buyTicket"></a>
          <div class="border-tab">
            <el-table class="invite-tab" :row-style="getRowClass"  :show-header ='false' :data="tableData.slice((pageNo-1)*pageSize,pageNo*pageSize)" >
              <el-table-column align="center" label="Date" prop="addr" :formatter="dddressatFormat"></el-table-column>
              <el-table-column align="center" label="Name" prop="totalBetAmt" :formatter="priceFormat1"></el-table-column>
              <el-table-column align="center" label="Name" prop="betAmtThisWeek" :formatter="priceFormat1"></el-table-column>
            </el-table>
          </div>
         
            <el-pagination  class="tab-pagination" id="span" align="right" small @size-change="handleSizeChange" @current-change="handleCurrentChange"  
              :current-page="pageNo"  :page-size="pageSize"  :total="tableData.length">
            </el-pagination>
        </div>
    </div>
  </div>
</template>
<script>
import { getMyInviteTop } from '@/service/api';

export default {
  data(){
    return {
      pageSize:10,
      pageNo: 1, 
      activeUserCnt:0,
      totalBetThisWeek:0,
      tableData:[],
    }
  },

  filters:{
    priceFormat(vaule) {
      if (vaule == undefined) {
        return "";
      }
      let zhi = (vaule / Math.pow(10, 6)).toFixed(2);
      let arr = (zhi.split(".")[1]).substr(0,2)
      //debugger
      let num =  parseInt(vaule / Math.pow(10, 6));
        if(num>0 &&(num + '').length>3){
          return ("" +num).replace( /\B(?=(\d{3})+$)/g, ',' )+'.'+arr;
        }else{
          return (vaule / Math.pow(10, 6)).toFixed(2)
        }

      //return (vaule / Math.pow(10, 6)).toFixed(2);
    },  

    pagination(array,pageNo,pageSize){
      let offset = (pageNo - 1) * pageSize;
      let data=(offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
      return data
    }
  },
  methods:{
   
   /* priceFormat1(row, column) {
      var totalBetAmt = row.totalBetAmt;
      if (totalBetAmt == undefined) {
        return "";
      }
      let zhi = (vaule / Math.pow(10, 6)).toFixed(2);
      let arr = (zhi.split(".")[1]).substr(0,2)
      debugger
      let num =  parseInt(vaule / Math.pow(10, 6));
        if(num>0 &&(num + '').length>3){
          return ("" +num).replace( /\B(?=(\d{3})+$)/g, ',' )+','+arr;
        }else{
          return (vaule / Math.pow(10, 6)).toFixed(2)
        }
    },*/
 
    priceFormat1(row, column) {
      var betAmtThisWeek = row.betAmtThisWeek;
      if (betAmtThisWeek == undefined) {
        return "";
      }
      let zhi = (betAmtThisWeek / Math.pow(10, 6)).toFixed(2);
      let arr = (zhi.split(".")[1]).substr(0,2);
      let num =  parseInt(betAmtThisWeek / Math.pow(10, 6));
        if(num>0 &&(num + '').length>3){
          return ("" +num).replace( /\B(?=(\d{3})+$)/g, ',' )+'.'+arr;
        }else{
          return (betAmtThisWeek / Math.pow(10, 6)).toFixed(2)
        }
      //return (betAmtThisWeek / Math.pow(10, 6)).toFixed(2);
    },

    dddressatFormat(row, column) {
      var addr = row.addr;
      if (addr == undefined) {
        return "";
      }
      let addStr = addr.substring(0,4) + '...' + addr.substring(addr.length-4, addr.length);
      return addStr;
    },

    getMyInviteTop(){
      let params = {'Addr': this.getToken};
        getMyInviteTop(params).then(res =>{
          // debugger
          this.activeUserCnt = res.activeUserCnt //本周活跃用户数
          this.totalBetThisWeek = res.totalBetThisWeek //本周累积下注额
          console.log('getMyInviteTop:======>',res.details);
          this.tableData = res.details;
      })
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
          return "background:rgba(190, 195, 197, 0);color:#00E9E1;";
    },
    handleSizeChange(val) {
      this.pageSize=val;
    },
    handleCurrentChange(val) {
      this.pageNo = val;
    },
    cellStyle({row, column, rowIndex, columnIndex}){
      // debugger
      if(rowIndex%2 == 0){// 偶数
        //return 'background:#000c12;border-bottom:none;'
        return 'background:#000d13;border-bottom:none;color:#fff'
      }else{//奇数
        return 'background:#353f46;border-bottom:none;color:#fff' 
      }
    }
   },
   computed:{
    'url': function(){
      return  this.$t('inviterPage.url');
    },
    'wagerOfTheWeek': function(){
      return  this.$t('inviterPage.wagerOfTheWeek');
    },
    'theAmountOf': function(){
      return  this.$t('inviterPage.theAmountOf');
    },
    'langularType': function(){
      return this.$store.getters.GET_LANGUAR_TYPE;
    },
    'getToken':function(){
         return this.$store.getters.GET_TOKEN;
      },
   
   },
   mounted(){
    this.getMyInviteTop();
    $(".tab-pagination .el-pagination__jump").remove();
    $(".tab-pagination .el-pagination__total").remove();
    if(this.langularType=='en'){
      $(".my-invite .myinvite-tab .payout-list-table .invite-tab .el-table__empty-text").text("No Data");
    }
   }
}
</script>

<style lang='less'>
.my-invite{
  width: 100%;
  padding-bottom: 20px;
  .invite-con{
    .inviteSpan{
      font-size:24px;
      color:rgba(254,235,103,1);
    }
  }
  .invite-cont{
    width: 1000px;
    display: flex;
    margin: 40px auto;
    .invite-picture{
      position: relative;
      flex:1;
      justify-content: center;
      align-items: center;
      .inviteSpen{
        color:rgba(3,144,116,1);
        font-size: 30px;
      }
      .inviteSpen2{
        color:#fff;
        font-size: 12px;
      }
    }
  }
  .myinvite-content{
    .myinvite{
      font-size:24px;
      color:#fff;
    }
  }
  .myinvite-tab{
    width: 900px;
    margin: 10px auto 0px;
    .week-style{
      color: #fff;
      font-size: 12px;
      padding: 10px;
      text-align: right;
    }
    .payout-list-table{
      width:900px;
      display: flex;
      flex-direction: column;
      .table-header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 0;
        border: 1px solid #00E9E1;
        font-size: 13px;
        .timer1{
          flex: 1;
          color: #00E9E1;
          text-align: center;
          font-size: 16px;
        }
        .timer2{
          flex: 1;
          color: #00E9E1;
          text-align: center;
          font-size: 16px;
        }
        .timer3{
          flex: 1;
          color: #00E9E1;
          text-align: center;
          font-size: 16px;
        }
      }
      .item{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 0;
        border: 1px solid #00E9E1;
        border-top: 0px solid #00E9E1;
        font-size: 13px;
        .timer1{
          flex: 1;
          color: #00E9E1;
          text-align: center;
        }
        .timer2{
          flex: 1;
          color: #00E9E1;
          text-align: center;
        }
        .timer3{
          flex: 1;
          color: #00E9E1;
          text-align: center;
          margin-right: 50px;
        }
      }
      .border-tab{
        width: 898px;
        border-left: 1px solid #00E9E1;
        border-right: 1px solid #00E9E1;
      }
      .invite-tab.el-table .cell{
        color:#00E9E1;
        text-align: center;
      }
      .invite-tab .el-table__body, .el-table__footer, .el-table__header{
        border-bottom:1px solid #00E9E1;
      }
      .invite-tab.el-table td, .el-table th.is-leaf{
        border-bottom:1px solid #00E9E1;
      }
      .invite-tab.el-table,
      .el-table__expanded-cell {
          background-color: rgba(190, 195, 197, 0);
      }
      .invite-tab.el-table--enable-row-hover .el-table__body tr:hover>td{
        background-color: rgba(190, 195, 197, 0) !important;
      } 
      .invite-tab .el-table__empty-block{
        background-color: rgba(190, 195, 197, 0);
        border-bottom:1px solid #00E9E1;
      }
      .invite-tab .el-table__empty-text{
        color:#00E9E1;
      }
      .tab-pagination.el-pagination button:disabled{
        color: #fff;
        margin: 10px 0;
        background-color: #231b5b;
      }
      .tab-pagination.el-pagination .btn-next, .el-pagination .btn-prev{
        color: #fff;
        margin: 10px 0;
        background-color: #231b5b;
      }
      .tab-pagination .el-pager, .el-pager li{
            margin: 5px 4px;
      }
    }

    .page-style{
      display: flex;
      justify-content: flex-end;
      padding: 20px 10px;
      box-sizing: border-box;
    }
    
    .ranking-header {
      height: 40px;
      line-height: 40px;
      //background: #1b3441;
      color: #fff;
      font-size: 11px;
    }

    .ranking-item {
        line-height: 36px;
        // background: #162a34;
        .ranking-body {
            font-size: 13px;
            .champion{
                color: #FFC41F;

            }

            .runner-up{
                color: #BDBDBD;
            }

            .bronze{
                color: #66553C;
            }

            .norme{
                color: #FFFFFF;
            }
        }
    }
  }
}


@media screen and (max-width: 500px) {
  .my-invite{
    width: 100%;
    padding-bottom: 0px;
    .invite-con{
      .inviteSpan{
        font-size:24px;
        color:rgba(254,235,103,1);
      }
    }
    .invite-cont{
      width: 100%;
      display: flex;
      margin: 20px auto;
      box-sizing: border-box;
      .invite-picture{
        position: relative;
        flex:1;
        justify-content: center;
        align-items: center;
        .invite-img{
          width: 50px;
        }
        .inviteSpen{
          color:rgba(3,144,116,1);
          font-size: 18px;
        }
        .inviteSpen2{
          color:#fff;
          font-size: 10px;
        }
      }
    }
    .myinvite-content{
      .myinvite{
        font-size:20px;
        color:#fff;
      }
    }
    .myinvite-tab{
      width: 100%;
      margin: 0px auto 0px;
       .week-style{
        color: #fff;
        font-size: 12px;
        padding: 10px;
        text-align: center;
      }
      .payout-list-table{
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0px 10px;
        box-sizing: border-box;
        .table-header{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 10px 0;
          border: 1px solid #00E9E1;  
          font-size: 10px;
          .timer1{
            flex: 1;
            color: #00E9E1;
            text-align: center;
            font-size: 10px;
          }
          .timer2{
            flex: 1;
            color: #00E9E1;
            text-align: center;
            font-size: 10px;
          }
          .timer3{
            flex: 1;
            color: #00E9E1;
            text-align: center;
            font-size: 10px;
          }
        }
        .border-tab{
          width: 99.5%;;
          border-left: 1px solid #00E9E1;
          border-right: 1px solid #00E9E1;
        }
        .invite-tab.el-table .cell{
          color:#00E9E1;
          text-align: center;
        }
        .invite-tab .el-table__body, .el-table__footer, .el-table__header{
          border-bottom:1px solid #00E9E1;
        }
        .invite-tab.el-table td, .el-table th.is-leaf{
          border-bottom:1px solid #00E9E1;;
        }
        .invite-tab.el-table,
        .el-table__expanded-cell {
            background-color: rgba(190, 195, 197, 0);
        }
        .invite-tab.el-table--enable-row-hover .el-table__body tr:hover>td{
          background-color: rgba(190, 195, 197, 0) !important;
        } 
        .invite-tab .el-table__empty-block{
          background-color: rgba(190, 195, 197, 0);
        }
        .invite-tab .el-table__empty-text{
          color:#00E9E1;
        }
        .tab-pagination.el-pagination button:disabled{
          color: #fff;
          margin: 10px 0;
          background-color: #231b5b;
        }
        .tab-pagination.el-pagination .btn-next, .el-pagination .btn-prev{
          color: #fff;
          margin: 10px 0;
          background-color: #231b5b;
        }
        .tab-pagination .el-pager, .el-pager li{
              margin: 5px 4px;
        }
        .item{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 10px 2px;
          border: 1px solid #00E9E1;
          border-top: 0px solid #00E9E1;
          font-size: 10px;
          .timer1{
            flex: 1;
            color: #00E9E1;
            text-align: center;
          }
          .timer2{
            flex: 1;
            color: #00E9E1;
            text-align: center;
            margin-left: 50px;
          }
          .timer3{
            flex: 1;
            color: #00E9E1;
            text-align: center;
            margin-left: 50px;
          }
        }
      }

      .page-style{
        display: flex;
        justify-content: flex-end;
        padding: 20px 10px;
        box-sizing: border-box;
      }
      .ranking-header {
          height: 40px;
          line-height: 40px;
          color: #fff;
          font-size: 11px;
      }

      .ranking-item {
          line-height: 36px;
          // background: #162a34;
          .ranking-body {
              font-size: 13px;
              .champion{
                  color: #FFC41F;

              }

              .runner-up{
                  color: #BDBDBD;
              }

              .bronze{
                  color: #66553C;
              }

              .norme{
                  color: #FFFFFF;
              }
          }
      }
    }
  }
}

.el-table::before {
  height: 0px;
}

</style>
