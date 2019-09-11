<template>
  <!-- 邀请奖励 -->
  <div class='app-player-dialog'>
    <div class="player-box">
      <img @click="closeDialog()"  class="del-icon" src="../../assets/img/delete.png" alt="">
      <div class='table-header'> 
        <div class='table-title' :class="{'current': selIndex == 1}" @click="handleClick(1)">
          <span>{{$t('header.rewardsEvent')}}</span>
        </div>
        <div class='table-title' :class="{'current': selIndex == 2}" @click="handleClick(2)">
          <span>{{$t('header.rewardsDetail')}}</span>
        </div>
      </div>
      <div v-show='selIndex == 1' class='event-reward'>
        <div class='reward-inp'>
          <img class='reward-img' src="@/assets/img/dpicon.png" alt="">
          <div class='reward-num'>{{eventTotal}} ODIN</div>
          <el-tooltip class="reward-item" effect="dark" placement="top">
            <div slot="content" class="reward-title" style="width:280px;">
              <div>
                {{$t('header.batchRelease')}}
              </div>
              <div style='margin-top:10px;'>
                {{$t('header.caseInfo')}}
              </div>
            </div>
            <i class="fa fa-question-circle icon" aria-hidden="true"></i>
          </el-tooltip>
        </div>
        <div class='cashable-num'>
          {{$t('header.ExtractableNumber')}} <span style='color:#00E9E1;'>{{eventActive}}</span>
        </div>
        <div class='draw-reward' @click='getPriceInfo()'>
            {{$t('header.getPrice')}}
        </div>
      </div>

      <div v-show='selIndex == 2'  class='event-detail'>
          <div class='detail-table'>
            <div class='detail-time'>{{$t('header.time')}}</div>
            <div class='detail-matter'>{{$t('header.origin')}}</div>
            <div class='detail-num'>{{$t('header.number')}}</div>
          </div>
          <!-- <div class='detail-list' v-for='(item,index) in detailList' :key='index'>
            <div class='detail-time'>{{item.timestamp}}</div>
            <div class='detail-matter'>{{item.desc}}</div>
            <div class='detail-num'>{{item.amt}}</div>
          </div>
          <div class='page-style'>
            <el-pagination background small layout="prev, pager, next" :current-page='currentSize' :pager-count='5' :total="10"></el-pagination>
          </div> -->
          <div class="app-border-tab">
            <el-table class="app-invite-tab" :row-style="getRowClass"  :show-header ='false' :data="detailList.slice((currentSize-1)*pageSize,currentSize*pageSize)" >
              <el-table-column width='150' align="center" label="Date" prop="timestamp" :formatter="dateFormat"></el-table-column>
              <el-table-column width='100' align="center" label="Name" prop="desc"></el-table-column>
              <el-table-column width='70' align="center" label="Name" prop="amt"></el-table-column>
            </el-table>
          </div>
          
          <div class='page-style'>
            <el-pagination class="tab-pagination" id="span" align="right" background small layout="prev, pager,next" 
            :current-page='currentSize' :page-size='pageSize' :pager-count='5' :total="detailList.length"
            @size-change="handleSizeChange" @current-change="handleCurrentChange"  
            ></el-pagination>
          </div>
      </div>
      
    </div>
  </div>
</template>

<script>
  import { getOdinPrize } from '@/service/api';
  let moment = require("moment");

  export default {
    name: 'pcPlayerDialog',

    data(){
      return {
        selIndex: 1,
        detailList: [],
        eventList:{},
        eventTotal: '',
        eventActive: '',
        currentSize: 1,
        pageSize: 5,
        totalPage: 0,
      }
    },

    computed:{
      'getToken':function(){
         return this.$store.getters.GET_TOKEN;
      },
      'langularType': function(){
        return this.$store.getters.GET_LANGUAR_TYPE;
      },
    },

    mounted(){
      this.getOdinPrize();
      if(this.langularType=='en'){
        $(".app-invite-tab .el-table__empty-block .el-table__empty-text").text("No Data");
      }
    },

    methods: {
      handleClick(index){
        this.selIndex = index;
      },

      getOdinPrize(){
        let params = {Addr: this.getToken}
        getOdinPrize(params).then(res =>{
          this.eventList = res;
          this.eventTotal = res.total;
          this.eventActive = res.active;
          this.detailList = res.details;
          this.totalPage = parseInt(res.details.length);
        })
      },

      closeDialog() {
        this.$emit('closeRewardModule');
      },

      getRowClass({ row, column, rowIndex, columnIndex }) {
        return "background:rgba(190, 195, 197, 0);color:#00E9E1;";
      },

      handleSizeChange(val) {
        this.pageSize = val;
      },

      handleCurrentChange(val) {
        this.currentSize = val;
      },

      dateFormat(row, column) {
        var timestamp = row.timestamp;
        if(timestamp) {
          let timer = moment(timestamp).format("YYYY-MM-DD HH:mm:ss");
          return timer;
        }
      },

      getPriceInfo(){
        this.$message({
          message: this.$t('betting.NoAvailable'),
          type: 'warn'
        });
      }
    }
  }
</script>

<style lang="less">
  .el-button{
    line-height: 0;
  }

  .app-player-dialog{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 9;
    background-color: rgba(0,0,0,.77);
    .player-box{
      position: relative;
      margin: auto;
      width: 90%;
      padding: 10px 10px;
      margin-top: 150px;
      font-size: 14px;
      color: #fff;
      border: 1px solid #00E9E1;
      border-radius: 5px;
      background:#181845;
      box-sizing: border-box;
      .del-icon{
        position: absolute;
        top: -25px;
        right: -20px;
        width: 25px;
        cursor: pointer;
      }
      .table-header{
        display: flex;
        padding: 10px 0px;
        justify-content: space-between;
        .table-title{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 130px;
          color: #00E9E1;
          border: 1px solid #00E9E1;
          margin-right: 10px;
          padding: 6px 0px;
          border-radius: 6px; 
          cursor: pointer;
          box-sizing: border-box;
        }
        .current{
          background: #00E9E1;
          color: #181845;
        }
      }
      .event-reward{
        width: 100%;
        padding: 20px 0px 0px;
        .reward-inp{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50%;
          margin: 0 auto;
          border: 1px solid #fff;
          border-radius: 6px; 
          padding: 6px 0px;
          .reward-img{
            width: 24px;
            margin-right: 10px;
          }
          .reward-num{
            margin-right: 10px;
            font-size: 14px;
          }
        }
        .cashable-num{
          padding: 10px 0px;
          text-align:  center;
          font-size: 12px;
        }
        .draw-reward{
          background:  #00E9E1;
          width: 100px;
          padding: 3px 0px;
          border-radius: 6px; 
          margin: 15px auto;
          color: #181845;
          font-size: 12px;
        }
      }

      .event-detail{
        width: 100%;
        padding: 10px 0px;
        .detail-table{
          display: flex;
          justify-content: space-between;
          padding: 10px 0px;
          .detail-time{
            width: 50%;
            text-align: center;
            color: #00E9E1;
            font-size: 12px;
          }
          .detail-matter{
            width: 30%;
            text-align: center;
            color: #00E9E1;
            font-size: 12px;
          }
          .detail-num{
            width: 20%;
            text-align: center;
            color: #00E9E1;
            font-size: 12px;
          }
        }
        .detail-list{
          display: flex;
          justify-content: space-between;
          border: 1px solid #00E9E1;
          border-radius: 4px; 
          margin-top: 6px;
          .detail-time{
            width: 40%;
            text-align: center;
            padding: 6px 0px;
            font-size: 14px;
          }
          .detail-matter{
            width: 30%;
            text-align: center;
            padding: 6px 0px;
            font-size: 14px;
          }
          .detail-num{
            width: 30%;
            text-align: center;
            padding: 6px 0px;
            font-size: 14px;
          }
        }
        .page-style{
          padding: 10px 0px;
          text-align: right;
        }
      }
    }
  }

  
  .app-border-tab{
    width: 100%;
    border-left: 1px solid #00E9E1;
    border-right: 1px solid #00E9E1;
    border-top: 1px solid #00E9E1;
  }

  .app-invite-tab.el-table td, .el-table th.is-leaf{
    border-bottom:1px solid #00E9E1;
    font-size: 10px;
    padding: 6px 0px;
    box-sizing: border-box;
  }
  .app-invite-tab.el-table,.el-table__expanded-cell {
      background-color: rgba(190, 195, 197, 0);
  }
  .app-invite-tab.el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: rgba(190, 195, 197, 0) !important;
  } 
  .app-invite-tab .el-table__empty-block{
    background-color: rgba(190, 195, 197, 0);
    border-bottom:1px solid #00E9E1;
  }
  .app-invite-tab .el-table__empty-text{
    color:#00E9E1;
  }
</style>
