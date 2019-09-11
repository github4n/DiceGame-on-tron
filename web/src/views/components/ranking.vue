<template>
    <div class="ranking">
        <!-- <el-tabs class="rankClassRing" v-model="activeName" @tab-click="handleClick"> 
            <el-tab-pane :label="$t('betting.partnersBoard')" name="first"> -->
                <div class='table-header'>
                    <div class='table-title' :class="{'current': selIndex == 1}" @click="handleClick(1)">{{$t('betting.PledgeList')}}</div>
                    <div class='table-title' :class="{'current': selIndex == 2}" @click="handleClick(2)">{{$t('betting.PartnerList')}}</div>
                </div>

                <div  v-show='weekShow'>
                    <el-row style="height: 32px;line-height:32px;"> 
                        <span class="count-down" style='color:#fff;'> {{$t('betting.shutdown')}}: {{partnerCountdown}} </span>
                    </el-row>
                    <el-row>
                        <div class="ranking-header">
                            <el-col :lg="6" :md="6" :sm="6" :xs="3">{{$t('betting.ranking')}}</el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="11">{{$t('betting.location')}}</el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="6">{{$t('betting.AmountPledge')}}</el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="4">{{$t('betting.hortation')}}</el-col>
                        </div>
                    </el-row>

                    <el-row class="ranking-item" v-for='(item, index) in rankingList' v-bind:key="index" >
                        <div class="ranking-body" v-if="index == 0">
                            <el-col :lg="6" :md="6" :sm="6" :xs="3">
                                <img src="@/assets/img/icon24.png" alt="">
                            </el-col>

                            <el-col v-if="isPcDevice" :lg="6" :md="6" :sm="6" :xs="11"><span class="champion">{{item.addr}}</span></el-col>
                            <el-col v-else :lg="6" :md="6" :sm="6" :xs="11"><span class="champion">{{item.addr | addFilter }}</span></el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="6"><span class="champion">{{item.amt | priceFormat}}</span></el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="4"><span class="champion">{{item.prize | priceFormat}}</span></el-col>
                        </div>

                        <div class="ranking-body" v-if="index == 1">
                            <el-col :lg="6" :md="6" :sm="6" :xs="3">
                                <img src="@/assets/img/icon25.png" alt="">
                            </el-col>

                            <el-col v-if="isPcDevice" :lg="6" :md="6" :sm="6" :xs="11"><span class="runner-up">{{item.addr}}</span></el-col>
                            <el-col v-else :lg="6" :md="6" :sm="6" :xs="11"><span class="champion">{{item.addr | addFilter }}</span></el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="6"><span class="runner-up">{{item.amt | priceFormat}}</span></el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="4"><span class="runner-up">{{item.prize | priceFormat}}</span></el-col>
                        </div>

                        <div class="ranking-body" v-if="index == 2">
                            <el-col :lg="6" :md="6" :sm="6" :xs="3">
                                <img src="@/assets/img/icon26.png" alt="">
                            </el-col>

                            <el-col v-if="isPcDevice" :lg="6" :md="6" :sm="6" :xs="11"><span class="bronze">{{item.addr}}</span></el-col>
                            <el-col v-else :lg="6" :md="6" :sm="6" :xs="11"><span class="champion">{{item.addr | addFilter }}</span></el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="6"><span class="bronze">{{item.amt | priceFormat}}</span></el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="4"><span class="bronze">{{item.prize | priceFormat}}</span></el-col>
                        </div>

                        <div class="ranking-body" v-if="index!=0 && index!=1 && index!=2">
                            <el-col :lg="6" :md="6" :sm="6" :xs="3"><span class="norme">{{index+1}}</span></el-col>

                            <el-col v-if="isPcDevice" :lg="6" :md="6" :sm="6" :xs="11"><span class="norme">{{item.addr}}</span></el-col>
                            <el-col v-else :lg="6" :md="6" :sm="6" :xs="11"><span class="champion">{{item.addr | addFilter }}</span></el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="6"><span class="norme">{{item.amt | priceFormat}}</span></el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="4"><span class="norme">{{item.prize | priceFormat}}</span></el-col>
                        </div>
                    </el-row>
                </div>
               
            <!-- </el-tab-pane> -->

            <!-- <el-tab-pane :label="$t('betting.Maserati')" name="second"> -->
                <div  v-show='rewardShow'>
                    <el-row>
                        <div v-if="isPcDevice"  style='display:flex;'>
                            <div style='width:200px;'></div>
                            <span class="count-down" style='color:#fff;flex:1;height: 32px;display:line-block;line-height:32px;'> {{$t('betting.shutdown')}}: {{maseratiCountdown}} 
                            <span @click='changeRouter()' style='color:#05c19c;cursor: pointer;font-size:14px;'>({{$t('betting.Details')}})</span>&nbsp;
                            <span @click='changeGg()' style='color:#05c19c;cursor: pointer;font-size:14px;'>[{{$t('betting.LuckyDraw')}}]</span>
                            </span>
                            <div style='width:200px;color:#fff;height: 32px;line-height:32px;'>{{$t('betting.NextLottery')}}: <span>{{lotteryDetail}}%</span></div>
                        </div>
                        <div v-else style='display:flex;padding:15px 0px;'>
                            <span class="count-down" style='color:#fff;flex:1;text-algin:left;font-size:12px;height: 32px;'> 
                                {{$t('betting.shutdown')}}: {{maseratiCountdown}} 
                                <span @click='changeRouter()' style='color:#05c19c;cursor: pointer;font-size:14px;'>({{$t('betting.Details')}})</span>
                                <!-- <a href="https://www.oscar.pro/ring/move" style='color:#05c19c; text-decoration: none;font-size:14px;'>[{{$t('betting.LuckyDraw')}}]</a> -->
                                <a href="https://www.tronoscar.pro/ring/move" style='color:#05c19c; text-decoration: none;font-size:14px;'>[{{$t('betting.LuckyDraw')}}]</a>
                            </span>
                            <div style='flex:1;color:#fff;text-algin:right;font-size:12px;position:relative;top:3px;'>{{$t('betting.NextLottery')}}: <span>{{lotteryDetail}}%</span></div>
                        </div>
                    </el-row>

                    <el-row>
                        <div class="ranking-header">
                            <el-col :lg="6" :md="6" :sm="6" :xs="3">{{$t('betting.ranking')}}</el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="11">{{$t('betting.address')}}</el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="6">{{$t('betting.ticketsNumber')}}</el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="4">{{$t('betting.winningRate')}}</el-col>
                        </div>
                    </el-row>

                    <el-row class="ranking-item" v-for='(item, index) in getMaseratiList' v-bind:key="index">
                        <div class="ranking-body" v-if="index == 0">
                            <el-col :lg="6" :md="6" :sm="6" :xs="3">
                                <img src="@/assets/img/icon24.png" alt="">
                            </el-col>

                            <el-col v-if="isPcDevice" :lg="6" :md="6" :sm="6" :xs="11"><span class="champion">{{item.pAddr}}</span></el-col>
                            <el-col v-else :lg="6" :md="6" :sm="6" :xs="11"><span class="champion">{{item.pAddr | addFilter }}</span></el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="6"><span class="champion">{{item.count}}</span></el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="4"><span class="champion">{{item.chance}}%</span></el-col>
                        </div>

                        <div class="ranking-body" v-if="index == 1">
                            <el-col :lg="6" :md="6" :sm="6" :xs="3">
                                <img src="@/assets/img/icon25.png" alt="">
                            </el-col>

                            <el-col v-if="isPcDevice" :lg="6" :md="6" :sm="6" :xs="11"><span class="runner-up">{{item.pAddr}}</span></el-col>
                            <el-col v-else :lg="6" :md="6" :sm="6" :xs="11"><span class="champion">{{item.pAddr | addFilter }}</span></el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="6"><span class="runner-up">{{item.count}}</span></el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="4"><span class="runner-up">{{item.chance}}%</span></el-col>
                        </div>

                        <div class="ranking-body" v-if="index == 2">
                            <el-col :lg="6" :md="6" :sm="6" :xs="3">
                                <img src="@/assets/img/icon26.png" alt="">
                            </el-col>

                            <el-col v-if="isPcDevice" :lg="6" :md="6" :sm="6" :xs="11"><span class="bronze">{{item.pAddr}}</span></el-col>
                            <el-col v-else :lg="6" :md="6" :sm="6" :xs="11"><span class="champion">{{item.pAddr | addFilter }}</span></el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="6"><span class="bronze">{{item.count}}</span></el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="4"><span class="bronze">{{item.chance}}%</span></el-col>
                        </div>

                        <div class="ranking-body" v-if="index!=0 && index!=1 && index!=2">
                            <el-col :lg="6" :md="6" :sm="6" :xs="3"><span class="norme">{{index+1}}</span></el-col>

                            <el-col v-if="isPcDevice" :lg="6" :md="6" :sm="6" :xs="11"><span class="norme">{{item.pAddr}}</span></el-col>
                            <el-col v-else :lg="6" :md="6" :sm="6" :xs="11"><span class="champion">{{item.pAddr | addFilter }}</span></el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="6"><span class="norme">{{item.count}}</span></el-col>

                            <el-col :lg="6" :md="6" :sm="6" :xs="4"><span class="norme">{{item.chance}}%</span></el-col>
                        </div>
                    </el-row>
                </div>
               
        <!-- </el-tab-pane>
     </el-tabs> -->

     <ActivityDialog v-show='isRyglRyckEdit' @closeContent='closeContent'></ActivityDialog>
     <WinningDialog v-show='isWinningDialog' @closeContentGg='closeContentGg'></WinningDialog>
    <div> <p></p> <br/> </div>
   <!--   <div style="background:#101920;background: rgb(16, 25, 32);height: 44px;line-height: 44px;">
         <p style="color:rgba(140, 144, 146, 0.85);font-family: -webkit-body;">Copyright  2019 Oscar All rights reserved</p>
     </div> -->
    </div>
</template>

<script>
import { getInviteTopEndTime, getInviteTop, getUserLotteryTicketTop ,getLotteryTicketInfo , getUserLotteryDetail} from '@/service/api';
import utils from '../../utils';
import {showDialog} from '../../utils/dialog';
import ActivityDialog from '../../components/dialog/activity-dialog'
import WinningDialog from '../../components/dialog/winning-dialog'
export default {
    name: 'ranking',
    components: { ActivityDialog , WinningDialog},
    data() {
        return {
            rankingList: [],
            getMaseratiList:[],
            partnerRemainingTime: '',
            partnerTimer: '',
            partnerCountdown: '',
            partnerEndTime: '',
            interval: '',
            interval2: '',
            interval3:'',
            activeName: 'first',
            isPcDevice: this.$isPcDeviceType,

            maseratiEndTime:'',
            maseratiRemainingTime:'',
            maseratiCountdown:'',
            maseratiTimer:'',

            lotteryDetail: '',

            isRyglRyckEdit: false,
            isWinningDialog:false,

            selIndex: 1,
            weekShow: true,
            rewardShow: false,
        } 
    },
    watch: {
        partnerRemainingTime(newVal, oldVal) {
            this.partnerCountdown = utils.translateTime(this.partnerRemainingTime);
            if(this.partnerRemainingTime == 0){
                clearTimeout(this.partnerTimer);
                this.partnerTimer = '';
                return;
            }
            this.partnerTimer = setTimeout(() => {
                this.partnerRemainingTime--;
            },1000);
        },

        maseratiRemainingTime(newVal, oldVal){
            this.maseratiCountdown = utils.translateTime(this.maseratiRemainingTime);
            if(this.maseratiRemainingTime == 0){
                clearTimeout(this.maseratiTimer);
                this.maseratiTimer = '';
                return;
            }
            this.maseratiTimer = setTimeout(() => {
                this.maseratiRemainingTime--;
            },1000);
        }
    },

    computed:{
        'getToken': function() {
            return this.$store.getters.GET_TOKEN;
        },
    },

    mounted() {
      this.getDataList();
      this.getMaserati();
      this.initData();
      this.getInviteTopEndTimeList();
      this.getLotteryTicketInfoList();
      this.getUserLotteryDetail();
    },

    methods: {
        //活动详情弹框关闭方法
        closeContent(){
            this.isRyglRyckEdit = false;
        },
        //中奖公告弹框关闭方法
        closeContentGg(){
            this.isWinningDialog = false;
        },
        initData() {
            this.interval = setInterval(this.getDataList, 5000);
            this.interval2 = setInterval(this.getMaserati, 5000);
            this.interval3 = setInterval(this.getUserLotteryDetail, 5000);
        },

        /* 获取排行榜列表 */
        getDataList() {
            let params = {'Count': 10};
            getInviteTop(params).then(result => {
                this.rankingList = result;
            })
        },

        /* 获取玛莎拉蒂排行榜列表 */
        getMaserati() {
            let params = {'Count': 10};
            /*getUserLotteryTicketTop(params).then(result => {
                this.getMaseratiList = result;
            })*/
        },

         /* 获取超级合伙人排行榜倒计时时间 */
        getInviteTopEndTimeList(){
            getInviteTopEndTime().then(result =>{
                //console.log(result);
                this.partnerEndTime = result;
                if(this.partnerEndTime > 0) {
                    if(null != this.partnerTimer && this.partnerTimer != ""){

                    }else {
                        this.initParentCountDown();
                    }
                }
            })
        },

         /* 对获取倒计时时间的处理 */
        initParentCountDown() {
            let localSecon = parseInt(this.timest());
            let serviceSecon = this.partnerEndTime / 1000;
            if(localSecon < serviceSecon) {
                this.partnerRemainingTime = serviceSecon - localSecon; // 还剩余多长时间
                this.partnerRemainingTime--;
            }
        },

        /* 获取玛莎拉蒂排行榜倒计时时间 */
        getLotteryTicketInfoList(){
            /*getLotteryTicketInfo().then(res =>{
                this.maseratiEndTime = res.endTime;
                if(this.maseratiEndTime > 0){
                    if(null != this.maseratiTimer && this.maseratiTimer != ""){

                    }else {
                        this.initMaseratiCountDown();
                    }
                }
            })*/
        },

         /* 对获取玛莎拉蒂倒计时时间的处理 */
        initMaseratiCountDown(){
            let localSecon = parseInt(this.timest());
            let serviceSecon = this.maseratiEndTime / 1000;
            if(localSecon < serviceSecon) {
                this.maseratiRemainingTime = serviceSecon - localSecon; // 还剩余多长时间
                this.maseratiRemainingTime--;
            }
        },

        //从1970年开始的毫秒数然后截取10位变成 从1970年开始的秒数 获取本地的秒数
        timest() {
            var tmp = Date.parse( new Date() ).toString();
            tmp = tmp.substr(0,10);
            return tmp;
        },

        handleClick(index) {
            this.selIndex = index;
            if(index == 1){
                this.weekShow = true;
                this.rewardShow = false;
                this.getDataList();
            }else if(index == 2){
                this.weekShow = false;
                this.rewardShow = true;
                this.getMaserati();
            }
        },

        /* 活动详情跳转页面 */
        changeRouter(){
            //debugger
            if(this.isPcDevice){
                this.isRyglRyckEdit = true; 
            }else {
                this.$router.push({path:'/active'})
            }

        },
         /* 中奖公告跳转页面 */
        changeGg(){
             //debugger
            if(this.isPcDevice){
                this.isWinningDialog = true; 
            }else {
               // this.$router.push({path:'/active'})
            }
        },

        /* 获取奖券还差多少*/
        getUserLotteryDetail(){
            let params = {pAddr: this.getToken }
            /*getUserLotteryDetail(params).then(res =>{
                this.lotteryDetail = (res/Math.pow(10, 4)).toFixed(2);
            })*/
        }
    },

     /* 销毁监听事件 */
    destroyed() {
      if(this.partnerTimer) {
        clearTimeout(this.partnerTimer);
      }

    if(this.maseratiTimer) {
        clearTimeout(this.maseratiTimer);
      }
    },

    filters: {
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

        addFilter(vaule) {
            if (vaule == undefined) {
                return "";
            }
            if(vaule.length>12){
                return vaule.substr(0,5) + '...' + vaule.substr(vaule.length-5, vaule.length);
            }
        }
    }
}
</script>

<style lang='less'>
    .ranking{
        width: 100%;
        margin-bottom: 10px;
        margin-top: 30px;
        .table-header{
            display: flex;
            padding: 10px 0px;
            //justify-content: center;
            .table-title{
                color: #00E9E1;
                border: 1px solid #00E9E1;
                margin-right: 10px;
                padding: 10px 20px;
                border-radius: 6px; 
                cursor: pointer;
            }
            .current{
                background: #00E9E1;
                color: #181845;
            }
        }
        .ranking-title {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin: 20px 0;

            img{
                width: 30px;
                margin-right: 10px;
            }

            .ranking-list {
                font-size: 18px;
                color: #fff;
                margin-right: 10px;
            }

            .count-down{
                font-size: 12px;
                color: #fff;
                padding: 20px;
                display: block;
            }
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
            border: 1px solid #00E9E1;
            border-radius: 4px;
            margin-bottom: 6px !important; 
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

    .el-tabs__header{
        margin: 15px 0px 0px;
    }

    .el-tabs__nav-wrap::after{
        height: 0px;
    }

    .el-tabs__item{
        color: #fff;
    }

    .el-tabs__item.is-active{
        color: #05c19c;
    }

    .el-tabs__item:hover{
        color: #05c19c;
    }
    .hdxq-dialog .el-dialog__body {
    padding: 0;
}

.hdxq-dialog .tc {
    border-radius: 0;
    opacity: 1 !important;
}

.hdxq-dialog .el-dialog__header {
    background-color: #153f3d;
    text-align: center;
}
.hdxq-dialog .el-dialog {
    margin-top: 0vh !important;
}
.hdxq-dialog .el-dialog__title {
    color: #fff;
    line-height: 2px;
    font-size: 22px;
}
.el-tabs__nav-scroll {
    overflow: hidden;
    //height: 54px;
    background: #565E64;
    //padding: 0 18px;
}

.el-tabs__active-bar {
    background-color: none;
}

.el-tab-pane{
    .ranking-item:nth-child(2n){
        background: #2C363D;
    }
}
.el-tabs__nav{
    z-index:0;
}


.rankClassRing .el-tabs__nav-scroll{
    background: #565e64 ;
    padding: 0 18px ;
}
.rankClassRing .el-tabs__item.is-active {
    font-weight: 500;
    color: #05c19c !important;
    font-size: 14px;
}
.rankClassRing .el-tabs__item{
    color: #fff !important;
    font-weight: normal !important;
}
.rankClassRing .el-tabs__item:hover {
    color: #05c19c !important;
    opacity: 1 !important;
}
</style>