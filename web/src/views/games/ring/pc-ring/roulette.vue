<template>
    <div class="roulette-box" onload="opener.location.reload()">
        <table border="0" cellpadding="0" cellspacing="1">
            <!-- 上面部分 -->
            <tr>
                <td id="0" class='sudoku3' :class="{'active': selIndex == 0}"></td>
                <td id="1" class='sudoku1' :class="{'active': selIndex == 1}"></td>
                <td id="2" class='sudoku2' :class="{'active': selIndex == 2}"></td>
                <td id="3" class='sudoku1' :class="{'active': selIndex == 3}"></td>
                <td id="4" class='sudoku3' :class="{'active': selIndex == 4}"></td>
                <td id="5" class='sudoku4' :class="{'active': selIndex == 5}">
                    <img class="yellow-img" src="@/assets/images/selected.png" alt="">
                </td>
                <td id="6" class='sudoku2' :class="{'active': selIndex == 6}"></td>
                <td id="7" class='sudoku1' :class="{'active': selIndex == 7}"></td>
                <td id="8" class='sudoku2' :class="{'active': selIndex == 8}"></td>
                <td id="9" class='sudoku1' :class="{'active': selIndex == 9}"></td>
                <td id="10" class='sudoku3' :class="{'active': selIndex == 10}"></td>
            </tr>

            <tr>
                <td id="31" class='sudoku1' :class="{'active': selIndex == 31}"></td>
                <td align="center" colspan="9" rowspan="5" class="sel-box">
                    <el-row :gutter="20" >
                        <el-col :lg="6" :md="6" :sm="6" :xs="6">
                            <p v-show='current == 0' class="title-2x">{{showResultOne||$t('betting.clickHere')}}</p>
                            <div v-if='showMax2x'>
                                <img v-show='langularType == "zh"' :class="{'img-active': imgSel==1}" @click="selCare('2X', 1)" src="@/assets/imgs/2x_big_ch.png" alt="">
                                <img v-show='langularType == "en"' :class="{'img-active': imgSel==1}" @click="selCare('2X', 1)" src="@/assets/imgs/2x_big_en.png" alt="">
                            </div>
                            <div v-if='!showMax2x'>
                                <img v-show='langularType == "zh"' :class="{'img-active': imgSel==1}" src="@/assets/imgs/2x_big_ch1.png" alt="">
                                <img v-show='langularType == "en"' :class="{'img-active': imgSel==1}" src="@/assets/imgs/2x_big_en2.png" alt="">
                            </div>
                            <p class="title-2x but-2x">TOTAL:{{obj2X.totalBetAmt}}</p>
                        </el-col>

                        <el-col :lg="6" :md="6" :sm="6" :xs="6">
                            <p class="title-3x">{{showResultTwo||$t('betting.clickHere')}}</p>
                            <div  v-if='showMax3x'>
                                <img v-show='langularType == "zh"' :class="{'img-active': imgSel==2}" @click="selCare('3X', 2)" src="@/assets/imgs/3x_big_ch.png" alt="">
                                <img v-show='langularType == "en"' :class="{'img-active': imgSel==2}" @click="selCare('3X', 2)" src="@/assets/imgs/3x_big_en.png" alt="">
                            </div>
                            <div  v-if='!showMax3x'>
                                <img v-show='langularType == "zh"' :class="{'img-active': imgSel==2}" src="@/assets/imgs/3x_big_ch1.png" alt="">
                                <img v-show='langularType == "en"' :class="{'img-active': imgSel==2}"  src="@/assets/imgs/3x_big_en2.png" alt="">
                            </div>
                            <p class="title-3x but-3x">TOTAL:{{obj3X.totalBetAmt}}</p>
                        </el-col>

                        <el-col :lg="6" :md="6" :sm="6" :xs="6">
                            <p class="title-5x">{{showResultThree||$t('betting.clickHere')}}</p>
                            <div v-if='showMax5x'>
                                <img v-show='langularType == "zh"' :class="{'img-active': imgSel==3}" @click="selCare('5X', 3)" src="@/assets/imgs/5x_big_ch.png" alt="">
                                <img v-show='langularType == "en"' :class="{'img-active': imgSel==3}" @click="selCare('5X', 3)" src="@/assets/imgs/5x_big_en.png" alt="">
                            </div>
                            <div v-if='!showMax5x'>
                                <img v-show='langularType == "zh"' :class="{'img-active': imgSel==3}" src="@/assets/imgs/5x_big_ch1.png" alt="">
                                <img v-show='langularType == "en"' :class="{'img-active': imgSel==3}" src="@/assets/imgs/5x_big_en2.png" alt="">
                            </div>
                            <p class="title-5x but-5x">TOTAL:{{obj5X.totalBetAmt}}</p>
                        </el-col>

                        <el-col :lg="6" :md="6" :sm="6" :xs="6">
                            <p class="title-30x">{{showResultFour||$t('betting.clickHere')}}</p>
                            <div v-if='showMax30x'>
                                <img v-show='langularType == "zh"' :class="{'img-active': imgSel==4}" @click="selCare('30X', 4)" src="@/assets/imgs/30x_big_ch.png" alt="">
                                <img v-show='langularType == "en"' :class="{'img-active': imgSel==4}" @click="selCare('30X', 4)" src="@/assets/imgs/30x_big_en.png" alt="">
                            </div>
                            <div v-if='!showMax30x'>
                                <img v-show='langularType == "zh"' :class="{'img-active': imgSel==4}" src="@/assets/imgs/30x_big_ch1.png" alt="">
                                <img v-show='langularType == "en"' :class="{'img-active': imgSel==4}" src="@/assets/imgs/30x_big_en2.png" alt="">
                            </div>
                            <p class="title-30x but-30x">TOTAL:{{obj30X.totalBetAmt}}</p>
                        </el-col>
                    </el-row>
                </td>
                <td id="11" class='sudoku1' :class="{'active': selIndex == 11}"></td>
            </tr>

            <tr>
                <td id="30" class='sudoku2' :class="{'active': selIndex == 30}"></td>
                <td id="12" class='sudoku2' :class="{'active': selIndex == 12}"></td>
            </tr>

            <tr>
                <td id="29" class='sudoku1' :class="{'active': selIndex == 29}"></td>
                <td id="13" class='sudoku1' :class="{'active': selIndex == 13}"></td>
            </tr> 

            <tr>
                <td id="28" class='sudoku2' :class="{'active': selIndex == 28}"></td>
                <td id="14" class='sudoku2' :class="{'active': selIndex == 14}"></td>
            </tr>

            <tr>
                <td id="27" class='sudoku1' :class="{'active': selIndex == 27}"></td>
                <td id="15" class='sudoku1' :class="{'active': selIndex == 15}"></td>
            </tr> 
            
            <!-- 底部 -->
            <tr>
                <td id="26" class='sudoku3' :class="{'active': selIndex == 26}"></td>
                <td id="25" class='sudoku1' :class="{'active': selIndex == 25}"></td>
                <td id="24" class='sudoku2' :class="{'active': selIndex ==24}"></td>
                <td id="23" class='sudoku1' :class="{'active': selIndex == 23}"></td>
                <td id="22" class='sudoku2' :class="{'active': selIndex == 22}"></td>
                <td id="21" class='sudoku1' :class="{'active': selIndex == 21}"></td>
                <td id="20" class='sudoku3' :class="{'active': selIndex == 20}"></td>
                <td id="19" class='sudoku1' :class="{'active': selIndex == 19}"></td>
                <td id="18" class='sudoku2' :class="{'active': selIndex == 18}"></td>
                <td id="17" class='sudoku1' :class="{'active': selIndex == 17}"></td>
                <td id="16" class='sudoku3' :class="{'active': selIndex == 16}"></td>
            </tr>
        </table>
        <bonus v-show="isshow" @closeBounsModule='closeBounsModule' :imgSrc='imgUrl'></bonus>
    </div>
</template>

<script>
import utils from '@/utils';
import utilsTron from '@/utilsTron';
import { getRing } from '@/service/api';
import { all, resolve } from 'q';
import { getBetting, getHistory } from '@/service/api';
import { setTimeout, clearInterval } from 'timers';
import bonus from './bonus.vue';
import { constants } from 'fs';
export default {
    name: 'roulette',
 
    components:{bonus},

    data() {
        return {
            selIndex: '',
            timer: '',
            countDown: 200,
            imgSel: 0,
            waitCountDown: '', // 等待开始游戏倒计时
            partnerCountdown: '',
            thisIsesultStr: false, // 投注中倒计时
            thisIsesult: false, // 停止投注
            currGameLotteryNum: '', // 开奖结果
            currGameId: '',  // 当前游戏id
            careType: '',
            betType: '',
            ringString:'',
            ringList:[],
            current: 0,
            showResultOne: null,
            showResultTwo: null,
            showResultThree: null,
            showResultFour: null,
            lose:this.$t('betting.lose'),
            win:this.$t('betting.win'),
            obj2X: {
            },
            obj3X: {
            },
            obj5X: {
            },
            obj30X: {
            },
            historyList: [],
            swtich: true,
            isshow: false,
            imgUrl:'',
            total2x: '',
            total3x: '',
            total5x: '',
            total30x: '',
            showMax2x: true,
            showMax3x: true,
            showMax5x: true,
            showMax30x: true,
            currGameStatus: '',
            currGameStopTime: '',
            isFirst: true,
            isrefresh: false, // 判断是否是浏览器切换过来的
            gameCountTimer: '' // 游戏开奖倒计时剩余毫秒数 （轮盘启动时倒计时）
        }
    },

    computed:{
        'langularType':function(){
            return this.$store.getters.GET_LANGUAR_TYPE;
        },

        'selectIndex':function(){
            return this.$store.getters.GET_SELINDEX;
        },

        'tranwebToken': function() {
            return this.$store.getters.GET_RING_TRON_WEB_TOKEN;
        },

        'getToken': function() {
            return this.$store.getters.GET_TOKEN;
        },

        'tranweb': function() {
            return this.$store.getters.GET_RING_TRON_WEB;
        },

        'betTrxCount': function() {
            return this.$store.getters.GET_BET_COUNT_TRX;
        },

        'isAutoBetTrx': function() {
            return this.$store.getters.GET_AUTO_BET;
        },

        'gameId': function() {
            return this.$store.getters.GTE_GAME_ID
        },
        
        'max2X': function() {
            return this.$store.getters.GET_2X_MAX;
        },

        'max3X': function() {
            return this.$store.getters.GET_3X_MAX;
        },

        'max5X': function() {
            return this.$store.getters.GET_5X_MAX;
        },

        'max30X': function() {
            return this.$store.getters.GET_30X_MAX;
        },

        'changeStatus': function() {
            return this.$store.getters.GET_CHANGE_STATUS;
        }
    },

    watch: {
        countDown(newVal, oldVal) {
            if(this.countDown <= 0) {
                this.isrefresh = false;
                if(this.timer) {
                    clearTimeout(this.timer);
                    this.timer = '';
                    if(this.currGameLotteryNum) {
                        this.judgeResult();
                        this.selIndex = this.currGameLotteryNum;
                        this.$store.commit('SET_SELINDEX', this.selIndex );
                        localStorage.setItem('selIndex',this.selIndex);
                        this.getHistory();
                        this.checkoutIndex(this.currGameLotteryNum);
                    }
                }
            } else {
                this.timer = setTimeout(() => {
                    this.start();
                    this.countDown--;
                }, 40)
            }
        },

        waitCountDown(newVal, oldVal) {
            this.partnerCountdown = utils.translateTime(this.waitCountDown);
            if(this.waitCountDown <= 0){
                clearTimeout(this.partnerTimer);
                this.partnerTimer = '';
                this.thisIsesultStr = false
                this.thisIsesult = true;
                return;
            }
            this.$store.commit('SET_BETTING_TIMER_COUNT_DOWN', this.partnerCountdown);
            this.partnerTimer = setTimeout(() => {
                this.waitCountDown--;
            }, 1000);
        }
    },

    mounted(){
        //this.initTimer();
        this.checkIndex();
        this.getRingList();//获取轮盘列表
        this.getBetting();
        this.initData();
        this.getHistory();
    },

    methods: {
        initTimer() {
            let _this = this;
            document.addEventListener('visibilitychange', function(){
                _this.isHidden = document.hidden;
                if(_this.isHidden === false){
                    if(!_this.isFirst) {
                        _this.isrefresh = true;
                        setTimeout(() => {
                            _this.isrefresh = false;
                        }, 600)
                        // _this.initMaseratiCountDown();
                    }
                }else{
                    //console.log('2')
                    clearInterval(_this.timer);
                    clearInterval(_this.partnerTimer);
                    _this.timer = '';
                    _this.partnerTimer = '';
                }
            })
        },

        checkIndex(){
            let that = this;
            setTimeout(function(){
                if(that.swtich){
                    that.selIndex = localStorage.getItem('selIndex');
                }
            },50);
        },

        getRingList(){
            getRing().then(res =>{
                this.ringString = res;
                this.ringList.push(this.ringString.split(','));
            });
        },

        initData(){
            this.isFirst = false;
            this.interval = setInterval(this.getBetting, 1000);
        },

        getBetting() {
            getBetting().then(res => {
                this.obj2X = res[0];
                this.total2x = res[0].totalBetAmt;
                this.obj3X = res[1];
                this.total3x = res[1].totalBetAmt;
                this.obj5X = res[2];
                this.total5x = res[2].totalBetAmt;
                this.obj30X = res[3];
                this.total30x = res[3].totalBetAmt;
                if(this.total2x >= this.max2X){
                    this.showMax2x = false;
                }
                if(this.total3x >= this.max3X){
                    this.showMax2x = false;
                }
                if(this.total5x >= this.max5X){
                    this.showMax2x = false;
                }
                if(this.total30x >= this.max30X){
                    this.showMax2x = false;
                }
            })
        },

        getHistory(){
            getHistory().then(res =>{
                this.$emit('hisList', res);
            })
        },

        closeBounsModule(){
            this.isshow = false;
        },

        start() {
            this.swtich = false;
            if(this.selIndex >= 32) {
                this.selIndex = 0;
            } else {
                this.selIndex++;
            }
        },

        startRun() {
            // this.countDown = 200;
            this.countDown--;
        },

        selCare(careType, type) {
            if(this.waitCountDown <= 0) {
                this.$message({message:this.$t('betting.calculating'),type:'error'});
            }else {
                this.careType = careType;
                this.startBet(type);
            }
        },

        async startBet(selImgType) {
            switch(this.careType) {
                case '2X':
                    this.betType = 1;
                    if(this.betTrxCount > this.max2X){
                        this.$message({message:this.$t('betting.Limit'),type:'error'});
                        break;
                    }else if(this.betTrxCount > (this.max2X-this.total2x)){
                        this.$message({message:this.$t('betting.TryAgain'),type:'error'});
                        break;
                    }else{
                        this.$message({message:this.$t('betting.BettingSuccess') + "2X",type:'success'});
                    }
                break;

                case '3X':
                    this.betType = 2;
                    if(this.betTrxCount > this.max3X){
                        this.$message({message:this.$t('betting.Limit'),type:'error'});
                        break;
                    }else if(this.betTrxCount > (this.max2X-this.total2x)){
                        this.$message({message:this.$t('betting.TryAgain'),type:'error'});
                        break;
                    }else{
                        this.$message({message:this.$t('betting.BettingSuccess') + "3X",type:'success'});
                    } 
                break;

                case '5X':
                    this.betType = 3;
                    if(this.betTrxCount > this.max5X){
                        this.$message({message:this.$t('betting.Limit'),type:'error'});
                        break;
                    }else if(this.betTrxCount > (this.max2X-this.total2x)){
                        this.$message({message:this.$t('betting.TryAgain'),type:'error'});
                        break;
                    }else{
                        this.$message({message:this.$t('betting.BettingSuccess') + "5X",type:'success'});
                    }
                break;

                case '30X':
                    this.betType = 4;
                    if(this.betTrxCount > this.max30X){
                        this.$message({message:this.$t('betting.Limit'),type:'error'});
                        break;
                    }else if(this.betTrxCount > (this.max2X-this.total2x)){
                        this.$message({message:this.$t('betting.TryAgain'),type:'error'});
                        break;
                    }else{
                        this.$message({message:this.$t('betting.BettingSuccess') + "30X",type:'success'});
                    }
                break;

                default:
                break;
            }
            if(null == this.betType || this.betType == '') {
                this.$message({message:this.$t('betting.chooseWhich'),type:'error'});
                return;
            }else if(this.betTrxCount == '' || this.betTrxCount <= 0) {
                this.$message({message:this.$t('betting.wagerAmount'),type:'error'});
                return;
            }else if(null == this.getToken || this.getToken == '') {
                this.$message({message:this.$t('betting.PleaseTronLink'),type:'error'});
                return;
            }
            this.imgSel = selImgType;
            let _inviterPAddr = this.$route.query.from || '';
            let betResult =  await utilsTron.ringBet(this.gameId, this.betType, this.betTrxCount, _inviterPAddr);
            //this.getTotalNum(this.betType,this.gameId,this.betTrxCount);
            //this.getAllTotalNum(this.betType);
        },

        /* 对获取倒计时时间的处理 */
        initParentCountDown(endTimer) {
            let serviceSecon = endTimer / 1000;
            if( serviceSecon > 0) {
                this.waitCountDown = serviceSecon; // 还剩余多长时间
                this.waitCountDown--;
            }
        },

        //从1970年开始的毫秒数然后截取10位变成 从1970年开始的秒数 获取本地的秒数
        timest() {
            var tmp = Date.parse( new Date() ).toString();
            tmp = tmp.substr(0,10);
            return tmp;
        },

        recovery() {
            this.showResultOne = null;
            this.showResultTwo = null;
            this.showResultThree = null;
            this.showResultFour = null;
        },

        judgeResult() {
            let num = this.ringList[0][this.currGameLotteryNum]
            if(num == 1) {
                if(this.langularType == 'en'){
                    this.showResultOne = "Win";
                    this.showResultTwo = "Lose";
                    this.showResultThree = "Lose";
                    this.showResultFour = "Lose";
                }else if(this.langularType == 'zh'){
                    this.showResultOne = "胜出";
                    this.showResultTwo = "失败";
                    this.showResultThree = "失败";
                    this.showResultFour = "失败";
                }
               
            }else if(num == 2){
                if(this.langularType == 'en'){
                    this.showResultOne = "Lose";
                    this.showResultTwo = "Win";
                    this.showResultThree = "Lose";
                    this.showResultFour = "Lose";
                }else if(this.langularType == 'zh'){
                    this.showResultOne = "失败";
                    this.showResultTwo = "胜出";
                    this.showResultThree = "失败";
                    this.showResultFour = "失败";
                }
            }else if(num == 3) {
                if(this.langularType == 'en'){
                    this.showResultThree = "Win";
                    this.showResultTwo = "Lose";
                    this.showResultOne = "Lose";
                    this.showResultFour = "Lose";
                }else if(this.langularType == 'zh'){
                     this.showResultThree = "胜出";
                    this.showResultTwo = "失败";
                    this.showResultOne = "失败";
                    this.showResultFour = "失败";
                }
            }else if(num == 4) {
                if(this.langularType == 'en'){
                    this.showResultOne = "Lose";
                    this.showResultTwo = "Lose";
                    this.showResultFour = "Win";
                    this.showResultThree = "Lose";
                }else if(this.langularType == 'zh'){
                    this.showResultOne = "失败";
                    this.showResultTwo = "失败";
                    this.showResultFour = "胜出";
                    this.showResultThree = "失败";
                }
            }
        },

        checkoutIndex(index){
            this.isshow = true;
            let num = this.ringList[0][index];
            if(num == 1) {
                if(this.langularType == 'zh'){
                    this.imgUrl = require('@/assets/imgs/ch2.png');
                }else if(this.langularType == 'en'){
                    this.imgUrl = require('@/assets/imgs/en2.png');
                }
            }else if(num == 2) {
                if(this.langularType == 'zh'){
                    this.imgUrl = require('@/assets/imgs/ch1.png')
                }else if(this.langularType == 'en'){
                    this.imgUrl = require('@/assets/imgs/en1.png')
                }
            }else if(num == 3) {
                if(this.langularType == 'zh'){
                    this.imgUrl = require('@/assets/imgs/ch3.png')
                }else if(this.langularType == 'en'){
                    this.imgUrl = require('@/assets/imgs/en3.png')
                }
            }else if(num == 4) {
                if(this.langularType == 'zh'){
                    this.imgUrl = require('@/assets/imgs/ch4.png')
                }else if(this.langularType == 'en'){
                    this.imgUrl = require('@/assets/imgs/en4.png')
                }
            }
        },

        /* 对获取倒计时时间的处理 */
        initMaseratiCountDown(){
            let serviceSecon = this.currGameStopTime / 1000;
            //console.log("serviceSecon===", serviceSecon);
            if(localSecon < serviceSecon) {
                if(this.currGameStatus === 'created') {
                    this.waitCountDown = serviceSecon - localSecon; // 还剩余多长时间
                    this.waitCountDown--;
                }else if(this.currGameStatus === 'lotterying') {
                    let seon = serviceSecon - localSecon; // 还剩余多长时间
                    constants.log('还剩余多长时间:', seon);
                    let mTimer = seon * 1000; // 转换成毫秒
                    let rCount = mTimer / 40;
                    this.countDown = rCount; // 
                    this.countDown--;
                }
            }
        },
        
        //从1970年开始的毫秒数然后截取10位变成 从1970年开始的秒数 获取本地的秒数
        timest() {
            var tmp = Date.parse( new Date() ).toString();
            tmp = tmp.substr(0,10);
            return tmp;
        },

        countNum() {
            if(!this.isrefresh) {
                this.isrefresh = true;
                this.countDown = (this.gameCountTimer-2000) / 40; // 计算总共要走多少格 （40毫秒走一格）
                this.thisIsesult = false;
                this.thisIsesultStr = false;
                this.startRun();
                this.$store.commit('SET_BETTING_TIMER_COUNT_DOWN', this.$t('betting.Lottery'));
            }
        }   
    },

    sockets: {
            connect: function () {
                console.log('socket connected')
            },

            currentStatus: function (res) {
                console.log('this method was fired by the socket server. eg: io.emit("currentStatus", data)')
                if(res) {
                    let result = JSON.parse(res);
                    this.currGameStatus = result.currGameStatus;
                    if(result.currGameStatus === 'lotterying') { // 开奖结果 （收到结果）
                        this.gameCountTimer = result.currGameRemain; // 20123 毫秒
                        this.currGameLotteryNum = result.currGameLotteryNum;
                        this.$store.commit('SET_SELINDEX', this.currGameLotteryNum );
                        this.countNum(); 
                    } else if (result.currGameStatus === 'done') { // 等待下一局游戏开始
                         this.$store.commit('SET_BETTING_TIMER_COUNT_DOWN',this.$t('betting.Preparing'));
                         this.recovery();
                         let that = this;
                         setTimeout(function(){
                             that.isshow = false;
                         },3000)
                    } else if(result.currGameStatus === 'created') { // 下注中，等待开始游戏 （）
                        this.$store.commit('SET_GAME_ID', result.currGameId);
                        this.currGameStopTime = result.currGameStopTime;
                        if(this.changeStatus){
                            if(this.isAutoBetTrx) {
                                this.startBet();
                            }   
                        }
                        this.initParentCountDown(parseInt(result.currGameRemain)); // 收到消息开始倒计时 (等待用户投注中)
                        this.thisIsesult = false;
                        this.thisIsesultStr = true;    
                    }
                }
            }
        }
}
</script>

<style lang="less" scoped>
    .sudoku1{
        background: url(../../../../assets/images/sudo1.png);
        background-size:cover;
        opacity: .4;
        //transition: all 0.2s;
    }

    .sudoku2{
        background: url(../../../../assets/images/sudo2.png);
        background-size:cover;
        opacity: .4;
    }

    .sudoku3{
        background: url(../../../../assets/images/sudo3.png);
        background-size:cover;
        opacity: .4;
    }

    .sudoku4{
        background: url(../../../../assets/images/sudoku4.png);
        background-size:cover;
        opacity: .4;
        position: relative;
    }

    .active{
        opacity: 1;
        border: 3px solid red;
        box-sizing: border-box;
    }

    .sel-box{
        width: 640px;
        img{
            cursor: pointer;
            opacity: .9;
            transition: all 0.3s;
        }
        img:hover{
            opacity: 1;
            transform: scale(1.05);
        }
        .img-active{
            opacity: 1;
        }
        p{
            margin: 5px 2px;
            font-size: 12px;
        }
        .active{
            opacity: .5;
        }

        .title-2x{
            color: #039074;
            font-size: 12px;
        }

        .title-3x{
            color: #1977ce;
            font-size: 12px;
        }

        .title-5x{
            color: #8541af;
            font-size: 12px;
        }

        .title-30x{
            color: #FBC904;
            font-size: 12px;
        }

        .but-2x{
            margin-top: 20px;
            padding: 2px 5px;
            border: 1px solid #039074;
            font-size: 12px;
            border-radius: 2px;
        }

        .but-3x{
            margin-top: 20px;
            padding: 2px 5px;
            border: 1px solid #1977ce;
            font-size: 12px;
            border-radius: 2px;
        }

        .but-5x{
            margin-top: 20px;
            padding: 2px 5px;
            border: 1px solid #8541af;
            font-size: 12px;
            border-radius: 2px;
        }

        .but-30x{
            margin-top: 20px;
            padding: 2px 5px;
            border: 1px solid #FBC904;
            font-size: 12px;
            border-radius: 2px;
        }

        .payout{
            position: relative;
            top: -30px;
            z-index: 1;
            color: #fff;
        }
    }

    .yellow-img{
        margin-top:-40px;height:30px;
    }

    @media screen and (max-width: 500px) {
        .sel-box {
            width: 310px;
            img{
                width: 66px;
            }

            img:hover{
                opacity: 1;
                transform: scale(1.05);
            }

            .img-active{
                opacity: 1;
            }

            p{
                margin: 5px;
                font-size: 9px;
                margin-top: 0;
                padding: 2px 0;
                text-align: center;
            }

            .active{
                opacity: .5;
            }

            .title-2x{
                color: #039074;
                font-size: 9px;
            }

            .title-3x{
                color: #1977ce;
                font-size: 9px;
            }

            .title-5x{
                color: #8541af;
                font-size: 9px;
            }

            .title-30x{
                color: #FBC904;
                font-size: 9px;
            }

            .but-2x{
                padding: 2px 5px;
                border: 1px solid #039074;
                font-size: 9px;
                border-radius: 2px;
                position: relative;
                top: -10px;
            }

            .but-3x{
                padding: 2px 5px;
                border: 1px solid #1977ce;
                font-size: 9px;
                border-radius: 2px;
                position: relative;
                top: -10px;
            }

            .but-5x{
                padding: 2px 5px;
                border: 1px solid #8541af;
                font-size: 9px;
                border-radius: 2px;
                position: relative;
                top: -10px;
            }

            .but-30x{
                padding: 2px 5px;
                border: 1px solid #FBC904;
                font-size: 9px;
                border-radius: 2px;
                position: relative;
                top: -10px;
            }

            .payout{
                position: relative;
                top: -18px;
                z-index: 1;
                color: #fff;
            }
        }

        .yellow-img{
            margin-top:-7px;
            height:12px;
            position: absolute;
            left: 20%;
        }
    }
</style>