<template>
  <div class='home-app-rank-list'>
    <div class='strike'>
      <div class='table-header'>
        <div class='table-title' :class="{'current': selIndex == 1}" @click="handleClick(1)">
          <span>{{$t('betting.PledgeList')}}</span>
          <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content" style='width:320px;'>
                  <div class="app-bonus-tooltip-title">{{$t('betting.title1')}}</div>
                  <div class='app-bonus-tooltip-title'>{{$t('betting.title2')}}</div>
                  <div class='app-bonus-tooltip-title'>{{$t('betting.title3')}}</div>
                  <div class="app-bonus-tooltip-box">
                    <div class="app-bonus-tooltip-item app-bonus-tooltip-item-th">
                      <div style='width:130px;padding-left:6px;'>{{$t('betting.ranking')}}</div>
                      <div>1</div>
                      <div>2</div>
                      <div>3</div>
                      <div>4</div>
                      <div>5</div>
                    </div>

                    <div class="app-bonus-tooltip-item">
                      <div style='width:130px;padding-left:6px;'>{{$t('betting.Proportion')}}</div>
                      <div>50%</div>
                      <div>30%</div>
                      <div>15%</div>
                      <div>4%</div>
                      <div>1%</div>
                    </div>
                  </div> 
              </div>
              <i class="fa fa-question-circle icon" aria-hidden="true"></i>
            </el-tooltip>
        </div>
        <div class='table-title' :class="{'current': selIndex == 2}" @click="handleClick(2)">
          <span>{{$t('betting.PartnerList')}}</span>
          <router-link :to="{ path: '/reward' }" style='text-decoration: none;'>
            <i class="fa fa-question-circle icon" aria-hidden="true"></i>
          </router-link>
        </div>
      </div>
      <div class='strike-tabs' v-show='weekShow'>
          <table class="rabk-table" border="0" cellpadding="0" cellspacing="0">
            <thead align="center">
              <tr>
                <th><span>{{$t('betting.ranking')}}</span></th>
                <th><span>{{$t('betting.location')}}</span></th>
                <th><span>{{$t('betting.AmountPledge')}}</span></th>
                <th><span>{{$t('betting.hortation')}}</span></th>
              </tr>
            </thead>
          </table>

          <div class="rank-table-body" >
            <table border="0" cellspacing="0" cellpadding="0">
              <tbody>
                <tr v-for="(item, index) in weeklyAmountLis" v-if="index < 5" :key='index'>
                  <td v-if="index == 0"><img  style='width:16px;position:relative;top: 6px;' src='@/assets/img/icon24.png'/></td>
                  <td v-if="index == 1"><img style='width:16px;position:relative;top: 6px;'  src='@/assets/img/icon25.png'/></td>
                  <td v-if="index == 2"><img style='width:16px;position:relative;top: 6px;'  src='@/assets/img/icon26.png'/></td>
                  <td v-if="index!=0 && index!=1 && index!=2">{{index + 1}}</td>

                  <td v-if="index == 0" style="color: #FFC41F">{{item.addr | dddressatFormat}}</td>
                  <td v-if="index == 1" style="color: #BDBDBD">{{item.addr | dddressatFormat}}</td>
                  <td v-if="index == 2" style="color: #66553C">{{item.addr | dddressatFormat}}</td>
                  <td v-if="index!=0 && index!=1 && index!=2">{{item.addr | dddressatFormat}}</td>

                  <td v-if="index == 0" style="color: #FFC41F">{{(item.weeklyAmount).toFixed(2)}}</td>
                  <td v-if="index == 1" style="color: #BDBDBD">{{(item.weeklyAmount).toFixed(2)}}</td>
                  <td v-if="index == 2" style="color: #66553C">{{(item.weeklyAmount).toFixed(2)}}</td>
                  <td v-if="index!=0 && index!=1 && index!=2">{{(item.weeklyAmount).toFixed(2)}}</td>

                  <td v-if="index == 0" style="color: #FFC41F">{{item.prizeAmount | priceFormat}}</td>
                  <td v-if="index == 1" style="color: #BDBDBD">{{item.prizeAmount | priceFormat}}</td>
                  <td v-if="index == 2" style="color: #66553C">{{item.prizeAmount | priceFormat}}</td>
                  <td v-if="index!=0 && index!=1 && index!=2">{{item.prizeAmount | priceFormat}}</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>

      <div class='strike-tabs' v-show='rewardShow'>
          <table class="rabk-table" border="0" cellpadding="0" cellspacing="0">
            <thead align="center">
              <tr>
                <th><span>{{$t('betting.ranking')}}</span></th>
                <th><span>{{$t('betting.location')}}</span></th>
                <th><span>{{$t('betting.volume')}}</span></th>
                <th><span>{{$t('betting.hortation')}}</span></th>
              </tr>
            </thead>
          </table>

          <div class="rank-table-body">
            <table border="0" cellspacing="0" cellpadding="0">
              <tbody>
                <tr v-for="(item, index) in inviteTopList" v-if="index < 5" :key='index'>
                  <td v-if="index == 0"><img style='width:16px;position:relative;top: 6px;' src='@/assets/img/icon24.png'/></td>
                  <td v-if="index == 1"><img style='width:16px;position:relative;top: 6px;' src='@/assets/img/icon25.png'/></td>
                  <td v-if="index == 2"><img style='width:16px;position:relative;top: 6px;' src='@/assets/img/icon26.png'/></td>
                  <td v-if="index!=0 && index!=1 && index!=2">{{index + 1}}</td>

                  <td v-if="index == 0" style="color: #FFC41F">{{item.addr | dddressatFormat}}</td>
                  <td v-if="index == 1" style="color: #BDBDBD">{{item.addr | dddressatFormat}}</td>
                  <td v-if="index == 2" style="color: #66553C">{{item.addr | dddressatFormat}}</td>
                  <td v-if="index!=0 && index!=1 && index!=2">{{item.addr | dddressatFormat}}</td>

                  <td v-if="index == 0" style="color: #FFC41F">{{item.amt}}</td>
                  <td v-if="index == 1" style="color: #BDBDBD">{{item.amt}}</td>
                  <td v-if="index == 2" style="color: #66553C">{{item.amt}}</td>
                  <td v-if="index!=0 && index!=1 && index!=2">{{item.amt}}</td>

                  <td v-if="index == 0" style="color: #FFC41F">{{item.prize | priceFormat}}</td>
                  <td v-if="index == 1" style="color: #BDBDBD">{{item.prize | priceFormat}}</td>
                  <td v-if="index == 2" style="color: #66553C">{{item.prize | priceFormat}}</td>
                  <td v-if="index!=0 && index!=1 && index!=2">{{item.prize | priceFormat}}</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {  getWeeklyAmountTop,  getInviteTopList } from '@/service/api';

export default {
  data(){
    return {
      weeklyAmountLis:[],
      inviteTopList:[],
      activeName: 'first',

      selIndex: 1,
      weekShow: true,
      rewardShow: false,
    }
  },

  mounted(){
    this.getWeeklyAmountTop();//获取周成交额排行版
    this.getInviteTopList();//获取活动成交额排行版
  },

  methods:{
    /* 获取周成交额排行版 */
    getWeeklyAmountTop(){
      let params = {'Count': 6};
      getWeeklyAmountTop(params).then(res =>{
        this.weeklyAmountLis = res;
      })
    },

    /* 获取活动成交额排行版 */
    getInviteTopList(){
      let params = {'Count': 6};
      getInviteTopList(params).then(res =>{
        this.inviteTopList = res;
      })
    },

    handleClick(index) {
      this.selIndex = index;
      if(index == 1){
        this.weekShow = true;
        this.rewardShow = false;
        this.getWeeklyAmountTop();
      }else if(index == 2){
        this.weekShow = false;
        this.rewardShow = true;
        this.getInviteTopList();
      }
    }
  },

  filters:{
     priceFormat(vaule) {
          if (vaule == undefined) {
            return "";
          }
          let num =  parseInt(vaule / Math.pow(10, 6));
          if(num>0 &&(num + '').length>3){
            return ("" +num).replace( /\B(?=(\d{3})+$)/g, ',' );
          }else{
            return num;
          }
          // return parseInt(vaule / Math.pow(10, 6));
        },
    
    dddressatFormat(addr) {
      if (addr == undefined) {
        return "";
      }
      let addStr = addr.substring(0,3) + '...' + addr.substring(addr.length-3, addr.length);
      return addStr;
    }
  }
}
</script>

<style lang='less'>
  .home-app-rank-list{
    width:100%;
    box-sizing: border-box;
    display: flex;
    .strike{
      position: relative;
      box-sizing: border-box;
      width: 100%;
      .table-header{
        display: flex;
        justify-content: center;
        padding: 10px 0px;
        box-sizing: border-box;
        .table-title{
          display: flex;
          justify-content: center;
          align-items: center;
          color: #00E9E1;
          border: 1px solid #00E9E1;
          margin-right: 10px;
          padding: 6px 10px;
          border-radius: 6px; 
          cursor: pointer;
          font-size: 13px;
        }
        .current{
          background: #00E9E1;
          color: #181845;
        }
      }
      .strike-tabs{
        .rabk-table{
          width: 100%;
          color: #00E9E1;
          background: transparent;
          padding: 0px 10px 0px;
          box-sizing: border-box;
          thead{
            height: 40px;
            line-height: 40px;
            background: transparent;
            color: #00E9E1;
            tr th{
              span{
                color: #00E9E1;
                font-size: 11px;
              }
            }
            tr th:nth-child(1){
              width: 20%;
            }
            tr th:nth-child(2){
              width: 30%;
            }
            tr th:nth-child(3){
              width: 30%;
            }
            tr th:nth-child(4){
              width: 20%;
            }
          }
        }
        .rank-table-body{
          padding: 5px 10px 0px;
          box-sizing: border-box;
          width: 100%;
          table{
            width: 100%;
            tbody{
              tr{
                border: 1px solid #00E9E1;
                border-radius: 4px; 
                display: block;
                margin-bottom: 10px;
                width: 100%;
                
                box-sizing: border-box;
              }
              tr td{
                color: #fff;
                font-size: 13px;
                line-height: 40px;
                height: 40px;
              }
              tr td:nth-child(1){
                width: 1%;
                text-align: center;
              }
              tr td:nth-child(2){
                width: 1%;
                box-sizing: border-box;
                text-align: center;
              }
              tr td:nth-child(3){
                width: 1%;
                text-align: center;
              }
              tr td:nth-child(4){
                width: 1%;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }

  .home-app-rank-list .el-tabs__nav-scroll{
    background: #565E64;
  }

  .home-app-rank-list  .el-tabs__item{
    font-size: 14px;
  }

  .home-app-rank-list .el-tabs__item.is-active {
    font-weight: 600;
    color: #039074 !important;
    font-size: 14px;
  }

  .home-app-rank-list .el-tabs__active-bar{
    background-color: none !important;
  }

  .home-app-rank-list .el-tabs__header{
    margin: 0;
  }

  .home-app-rank-list .el-tabs__item{
    color: #ccc !important;
    font-weight: 600;
  }

  .home-app-rank-list .el-tabs__item:hover {
    color: #039074 !important;
    font-weight: 600;
    opacity: .7;
  }

  .home-app-rank-list .el-table tr {
    background-color: #084744;
  }

  .home-app-rank-list .el-table__empty-block{
    background: #2C363D;
  }
  
  .home-app-rank-list .el-tabs__nav-wrap::after{
    height: 0px;
  }



  .app-bonus-tooltip-header{
    text-align: center;
    height: 40px;
    line-height: 40px;
    //border-bottom: 1px solid #216266;
    color: #fff;
    font-weight: bold;
    font-size: 15px;
  }

  .app-bonus-tooltip-title{
    padding: 0px 20px;
    font-size: 11px;
    color: #fff;
    line-height: 18px;
  }

  .app-bonus-text-content{
    padding: 10px 20px 0px;
    line-height: 25px;
    font-size: 12px;
    max-width: 450px;
  }

  .app-bonus-texts{
     padding: 0px 25px;
  }

  .app-bonus-tooltip-box{
    padding: 0 20px;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  }

  .app-bonus-tooltip-item{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 30px;
    line-height: 30px;
    border-left: 1px solid #00E9E1;
    border-right: 1px solid #00E9E1;
    // border-top: 1px solid #A78D65;
    border-bottom: 1px solid #00E9E1;
    color: #00E9E1;
    div{
      width: 100px;
      text-align: center;
    }
  }

  .app-bonus-tooltip-up{
    padding: 20px 20px 0px;
    font-size: 13px;
    color: #00E9E1;
  }

  .app-bonus-tooltip-item-th{
    border-top: 1px solid #00E9E1;
  }

  .app-bonus-tooltip-h{
    text-align: center;
    font-size: 16px;
    color: #fff;
  }

  .fa-question-circle:before{
    color: #fff;
    top: 0 !important; 
    margin-left: 6px;
  }

</style>

