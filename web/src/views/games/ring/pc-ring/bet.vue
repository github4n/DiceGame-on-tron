<template>
    <div class="bet-content-home">
        <!--audio id="evtAudio" preload="auto"></audio-->
        <el-row :gutter="15">
            <iframe @load="onGameLoad" src="/static/roll/index.html" class="game-frame" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
            <right-aside ref="ringSide"></right-aside>
        </el-row>
         <el-row>
            <div class="bet-content-main">
                <el-col :lg="24" :md="24" :sm="24" :xs="24">
                    <div class="bet-t">
                        <el-row>
                            <div class="bet-top">
                                <el-col :lg="12" :md="12" :sm="12" :xs="12">
                                    <div class="bet-count" style="">
                                        <div class='count-time'>{{$t('betting.cathecticTime')}}</div>
                                        <div class='count-font'>{{bettingTimerCountDown}}</div>
                                    </div>
                                </el-col>

                                <el-col :lg="12" :md="12" :sm="12" :xs="12">
                                    <div class="bet-detail-content">
                                        <!--a class="bet-detail" href="#details">{{$t('betting.Bettings')}}</a-->
                                        <span class="bet-detail" @click="betting()">{{$t('betting.Bettings')}}</span>
                                    </div>
                                    <div> 
                                        <span style="color: #fff;margin-right:10px;font-size: 12px;">{{$t('betting.automaticBet')}}</span>
                                        <el-switch v-model="autoBet" active-color="#00E9E1" inactive-color="#666" @change='changeAuto'></el-switch>
                                    </div>
                                </el-col>
                            </div>   
                        </el-row>

                        <el-row>
                            <div class='bettings-content'>
                                <div class="dice-xz"  v-if="isPcDevice">
                                    <div class="amount3">
                                        <p class="amount-span">{{$t('betting.dicexz')}}</p>
                                        <img style="position: absolute;left:10%;top:13px;" src='@/assets/imgs/zsicon.png' />
                                        <el-input class="input-xz" type="number" v-model="betCount" @blur="betCountNum"></el-input>
                                    </div>
                                    <div class="amount2">
                                        <div class="sp-num" @click="betCare(1)">2X</div> 
                                        <div class="sp-num" @click="betCare(2)">1/2</div>
                                        <div class="sp-num" @click="betCare(3)">MAX</div>
                                        <span class="sp-span" @click="betCare(4)">MIN</span>
                                    </div>
                                </div>
                                <div class="dice-footer"  v-if="isPcDevice">
                                    <div class="footer">
                                    <p class="foot-p">{{$t('betting.balance')}}</p>
                                    <div class="input-footer" >
                                        <div class="tp-sty">
                                        <img class="img" src='@/assets/imgs/zsicon.png'>
                                        </div>
                                        <span style="margin-top: -10px;">{{trxFreeBalance || 0}}</span>
                                    </div>
                                    
                                    </div>
                                    <div class="footer">
                                    <p class="foot-p">{{$t('betting.payout')}}</p>
                                        <div class="input-footer" >
                                        <div class="tp-sty">
                                            <img class="img" src='@/assets/imgs/zsicon.png'>
                                        </div>
                                        <span>{{betNum1 || 0}}</span>
                                        </div>
                                    </div>
                                    <div class="footer">
                                    <p class="foot-p">{{$t('betting.odin')}}</p>
                                        <div class="input-footer" >
                                        <div class="tp-sty">
                                            <img class="img" src='@/assets/img/dpicon.png'>
                                        </div>
                                        <span>{{odinFreeBalance || 0}}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div  class="bet-withdraw"  v-if="!isPcDevice"> 
                                    <el-col :lg="12" :md="12" :sm="12" :xs="12" style="text-align: left;position:relative;">
                                        <div class='title'>{{$t('betting.dicexz')}}</div>
                                        <img style='width: 20px;position:absolute;top:55%;left:10px;' src="@/assets/img/zsicon.png" alt="">
                                        <input class="inp" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" type="text" placeholder="投注数量" v-model="betCount" @blur="betCountNum">
                                    </el-col>

                                    <el-col :lg="12" :md="12" :sm="12" :xs="12">
                                        <div class='bet-contents'>
                                            <span class="span-but" style="color: #fff" @click="betCare(1)">2X</span>
                                            <span  class="span-but" style="color: #fff" @click="betCare(2)">1/2</span>    
                                            <span  class="span-but" style="color: #fff" @click="betCare(3)">MAX</span>   
                                            <span  class="span-but last-but" style="color: #fff" @click="betCare(4)">MIN</span>   
                                        </div>
                                    </el-col>
                                </div>

                                <div  v-if="!isPcDevice"  class="bet-banner">
                                    <el-col :lg="8" :md="8" :sm="8" :xs="8">
                                        <div class='bet-title'>{{$t('betting.balance')}}</div>
                                        <div class='bet-change'>
                                            <div class="banner">
                                                <img src="@/assets/img/zsicon.png" alt="">
                                                <span style="margin-left: 10px;color:#ccc">{{trxFreeBalance || 0}}</span>
                                            </div>
                                        </div>
                                    </el-col>

                                    <el-col :lg="8" :md="8" :sm="8" :xs="8">
                                        <div class='bet-title'>{{$t('betting.payout')}}</div>
                                        <div class='bet-change'>
                                            <div class="banner">
                                                <img src="@/assets/img/zsicon.png" alt="">
                                                <span style="margin-left: 10px;color:#ccc">{{betNum1 || 0}}</span>
                                            </div>
                                        </div>
                                    </el-col>

                                    <el-col :lg="8" :md="8" :sm="8" :xs="8">
                                        <div class='bet-title'>{{$t('betting.odin')}}</div>
                                        <div class='bet-change'>
                                            <div class="banner">
                                                <img src="@/assets/img/dpicon.png" alt="">
                                                <span style="margin-left: 10px;color: #ccc">{{odinFreeBalance || 0}}</span>
                                            </div>
                                        </div>
                                    </el-col>
                                </div>
                            </div>
                            
                        </el-row>
                    </div>
                </el-col>
            </div>
        </el-row>
    </div>
</template>

<script>
    import utils from '@/utils';
    import utilsTron from '@/utilsTron';
    //import overMusic from '@/assets/sound/over.mp3'
    //import winMusic from '@/assets/sound/win.mp3'
    import rightAside from './right.aside'
    import { getBetting , getHistory } from '@/service/api';

    export default {
        name: 'betBox',

        components:{ rightAside },

        computed: {
            'betNum1': function(){
                switch (this.$store.getters.GET_SEL_CARE) {
                    case '2X':
                        return 2 * this.$store.getters.GET_BET_COUNT_TRX;
                    case '3X':
                        return 3 * this.$store.getters.GET_BET_COUNT_TRX;
                    case '5X':
                        return 5 * this.$store.getters.GET_BET_COUNT_TRX;
                    case '30X':
                        return 30 * this.$store.getters.GET_BET_COUNT_TRX;
                }
                return 0;
            },

            'careType': function() {
                return this.$store.getters.GET_SEL_CARE;
            },

            'bettingTimerCountDown': function() {
                if(this.$store.getters.GET_BETTING_TIMER_COUNT_DOWN) {
                    if( this.$store.getters.GET_BETTING_TIMER_COUNT_DOWN == this.$t('betting.Lottery') ||
                        this.$store.getters.GET_BETTING_TIMER_COUNT_DOWN == this.$t('betting.Preparing')){
                        this.betDisbled = true;
                    }else{
                        this.betDisbled = false;
                    }
                }
                return this.$store.getters.GET_BETTING_TIMER_COUNT_DOWN;
            },

            'tranwebToken': function() {
                return this.$store.getters.GET_RING_TRON_WEB_TOKEN;
            },

            'tronwebObj': function() {
                return this.$store.getters.GET_RING_TRON_WEB;
            },

            'gameId': function() {
                return this.$store.getters.GTE_GAME_ID
            },

            'maxBetCount': function() {
                return this.$store.getters.GET_RING_MAX_WAGER_PRICE 
            },

            'trxFreeBalance': function() {
                if(this.$store.getters.GET_TRX_FREE_BALANCE > 0){
                this.isDisabled = false;
                return this.$store.getters.GET_TRX_FREE_BALANCE.toFixed(0);
                }
            },

            'odinFreeBalance': function() {
                return this.$store.getters.GET_ODIN_FREE_BALANCE;
            },

            'isAutoBetTrx': function() {
                return this.$store.getters.GET_AUTO_BET;
            },

            'changeStatus': function() {
                return this.$store.getters.GET_CHANGE_STATUS;
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

            'min2X': function() {
                return this.$store.getters.GET_2X_MIN;
            },

            'min3X': function() {
                return this.$store.getters.GET_3X_MIN;
            },

            'min5X': function() {
                return this.$store.getters.GET_5X_MIN;
            },

            'min30X': function() {
                return this.$store.getters.GET_30X_MIN;
            },
        },

        data() {
            return {
                'betDisbled': true,
                'betCount': 50,
                'autoBet': false,
                'minBetCount': 50,
                Freebalance: 0,
                TokenBalance: 0,
                isPcDevice: this.$isPcDeviceType,
                currGameStatus: '',

                waitCountDown: '', // 等待开始游戏倒计时
                partnerCountdown: '',
                partnerTimer: '',

                total2x: '',
                total3x: '',
                total5x: '',
                total30x: '',

                total2xMax: '',
                total3xMax: '',
                total5xMax: '',
                total30xMax: '',

                betNum: 0,
                betType: '',

                total2x: 0,
                total3x: 0,
                total5x: 0,
                total30x: 0,
                betIndex: '',
            }
        },

        watch: {
            betCount(newVal, oldVal) {
                this.$store.commit('SET_BET_COUNT_TRX', this.betCount);
            },

            waitCountDown(newVal, oldVal) {
            this.partnerCountdown = utils.translateTime(this.waitCountDown);
            if(this.waitCountDown <= 0){
                clearTimeout(this.partnerTimer);
                this.partnerTimer = '';
                return;
            }
            this.$store.commit('SET_BETTING_TIMER_COUNT_DOWN', this.partnerCountdown);
            this.partnerTimer = setTimeout(() => {
                this.waitCountDown--;
            }, 1000);
        }
        },

        mounted () {
            this.initTimer();
            // 在外部vue的window上添加postMessage的监听，并且绑定处理函数handleMessage
            window.addEventListener('message', this.handleMessage);

            window.onload = this.onWindowLoadOver;
            this.onWindowLoadOver();
            this.getBetting();
            this.initData();

            let self = this;
            document.addEventListener("visibilitychange", () => {
                if (document.hidden) {
                    self.on_hide();
                } else {
                    self.on_show();
                }
            });
        },

        methods: {
            initData(){
                this.interval = setInterval(this.getBetting, 1000);

                setInterval(this.getBalance, 1000);
                setInterval(this.switchAudio, 10);
            },

            getBalance(){
                this.tronData(this.$store.getters.GET_TOKEN);
            },

            switchAudio(){
                var isOpen = this.$store.getters.GET_OPEN_SOUND ? 1 : 0;
                if (this.gameWindow)
                    this.gameWindow.postMessage('{\"cmd\":\"switchAudio\",\"isOpen\":' + isOpen.toString() + '}','*');
            },

            async tronData(_addr) {
                if(this.tronwebObj){
                    if(_addr){
                        let trxBalance = await this.tronwebObj.trx.getBalance(_addr);
                        if(trxBalance > 0) {
                            let trxFreeBalance = trxBalance / Math.pow(10,6);
                            this.$store.commit('SET_TRX_FREE_BALANCE', trxFreeBalance);
                        }
                        let odinFreeBalance = await utilsTron.getFreeBalanceOf(_addr);
                        this.$store.commit('SET_ODIN_FREE_BALANCE', odinFreeBalance);
                    }
                }
            },

            getBetting() {
                let self = this;
                getBetting().then(res => {
                    self.obj2X = res[0];
                    self.total2x = res[0].totalBetAmt;
                    self.total2xMax = this.max2X - this.total2x ;
                    self.obj3X = res[1];
                    self.total3x = res[1].totalBetAmt;
                    self.total3xMax = this.max3X - this.total3x ;
                    self.obj5X = res[2];
                    self.total5x = res[2].totalBetAmt;
                    self.total5xMax = this.max5X - this.total5x ;
                    self.obj30X = res[3];
                    self.total30x = res[3].totalBetAmt;
                    self.total30xMax = this.max30X - this.total30x ;
                })
            },

            betting() {
                if(this.betDisbled) {
                    this.$message({message:this.$t('betting.calculating'),type:'error'});
                }else {
                    if(this.tronwebObj) {
                        this.startBet();
                    } else {
                        this.$message({message:this.$t('betting.PleaseTronLink'),type:'error'});
                    }
                    //this.startBet();
                }
            },

            onWindowLoadOver(){
                setInterval(this.getBetting1, 1000);
            },

            getBetting1() {
                if((this.currGameStatus === 'lotterying') || (this.currGameStatus === 'done')){
                    return;
                }

                let self = this;
                getBetting().then(res => {
                    let total2x = res[0].totalBetAmt;
                    let total3x = res[1].totalBetAmt;
                    let total5x = res[2].totalBetAmt;
                    let total30x = res[3].totalBetAmt;

                    let showMax2x = 1;
                    if(total2x >= this.max2X){
                        showMax2x = 0;
                    }
                    let showMax3x = 1;
                    if(total3x >= this.max3X){
                        showMax3x = 0;
                    }
                    let showMax5x = 1;
                    if(total5x >= this.max5X){
                        showMax5x = 0;
                    }
                    let showMax30x = 1;
                    if(total30x >= this.max30X){
                        showMax30x = 0;
                    }

                    let bet = [
                        {
                            total: total2x,
                            show: showMax2x
                        },
                        {
                            total: total3x,
                            show: showMax3x
                        },
                        {
                            total: total5x,
                            show: showMax5x
                        },
                        {
                            total: total30x,
                            show: showMax30x
                        },
                    ]

                    if (self.gameWindow){
                        self.gameWindow.postMessage('{\"cmd\":\"getBetting\",\"bet\":' + JSON.stringify(bet) + '}','*');
                    }
                })
            },

            betCountNum() {
                if(this.betCount < this.minBetCount) {
                    //this.$message.error(`投注金额必须大于${this.minBetCount}`);
                    this.$message({message:this.$t('betting.maxBetCount'),type:'error'});
                    this.betCount = this.minBetCount;
                }else {
                    this.betCount = parseInt(this.betCount);
                }
            },

            async startBet() {
                let betType = '';
                switch (this.careType) {
                    case '2X':
                        this.betType = 1;
                        break;

                    case '3X':
                        this.betType = 2;
                        break;

                    case '5X':
                        this.betType = 3;
                        break;

                    case '30X':
                        this.betType = 4;
                        break;

                    default:
                        break;
                }
                if (null == this.betType || this.betType == '') {
                    this.$message({message: this.$t('betting.chooseWhich'), type: 'error'});
                    return;
                } else if (this.betCount == '' || this.betCount == 0) {
                    this.$message({message: this.$t('betting.wagerAmount'), type: 'error'});
                    return;
                } else if (null == this.tranwebToken || this.tranwebToken == '') {
                    this.$message({message: this.$t('betting.PleaseTronLink'), type: 'error'});
                    return;
                } else if (this.betCount > this.trxFreeBalance){
                    this.$message({message: this.$t('betting.toopTitle'), type: 'error'});
                    return;
                }
                let _inviterPAddr = this.$route.query.from || '';
                let betResult = await utilsTron.ringBet(this.$store.getters.GTE_GAME_ID, this.betType, this.betCount * Math.pow(10, 6), _inviterPAddr);
            },

            changeAuto(event) {
                this.$store.commit('SET_CHANGE_STATUS', true);
                this.$store.commit('SET_AUTO_BET', event);

                /*let winAudio = document.getElementById('evtAudio');
                winAudio.setAttribute('src', winMusic);
                winAudio.play();*/
            },

            getFreeBalanceOf(baseName) {
                utilsTron.getFreeBalanceOf(baseName).then(res => {
                    this.Freebalance = res
                })
            },

            getBalanceOf(baseName) {
                utilsTron.getBalanceOf(baseName).then(res => {
                    // console.log(res,123)
                    this.TokenBalance = res;
                })
            },

            betCare(type) {
                if (this. betIndex == ''){
                    this.$message({
                        message: this.$t('betting.hasSelCare'),
                        type: 'error'
                    });
                    return;
                }
                if(type == 1) {
                    if(this.betCount) {
                        let maxBet = 0;
                        if(this. betIndex == '2X'){
                            maxBet = this.total2xMax;
                        }else if(this. betIndex == '3X'){
                            maxBet = this.total3xMax;
                        }else if(this. betIndex == '5X'){
                            maxBet = this.total5xMax;
                        }else if(this. betIndex == '30X'){
                            maxBet = this.total30xMax;
                        }
                        if (maxBet > 0){
                            if(this.betCount > (maxBet / 2)){
                                this.betCount = maxBet;
                            }else{
                                this.betCount = (this.betCount * 2);
                            }
                            this.$store.commit('SET_BET_COUNT_TRX', this.betCount);
                        }
                    }
                }else if(type == 2) {
                    if(this.betCount) {
                        let betP = Math.ceil(this.betCount / 2);
                        if(betP < this.minBetCount){
                            this.betCount = this.minBetCount;
                        }else{
                            this.betCount = betP;
                        }
                        this.$store.commit('SET_BET_COUNT_TRX', this.betCount);
                    }
                }else if(type == 3) {
                    if(this. betIndex == '2X'){
                        this.betCount = this.total2xMax;
                        this.$store.commit('SET_BET_COUNT_TRX', this.betCount);
                    }else if(this. betIndex == '3X'){
                        this.betCount = this.total3xMax;
                        this.$store.commit('SET_BET_COUNT_TRX', this.betCount);
                    }else if(this. betIndex == '5X'){
                        this.betCount = this.total5xMax;
                        this.$store.commit('SET_BET_COUNT_TRX', this.betCount);
                    }else if(this. betIndex == '30X'){
                        this.betCount = this.total30xMax;
                        this.$store.commit('SET_BET_COUNT_TRX', this.betCount);
                    }
                }else if(type == 4) {
                    if(this. betIndex == '2X'){
                        this.betCount = this.min2X;
                        this.$store.commit('SET_BET_COUNT_TRX', this.betCount);
                    }else if(this. betIndex == '3X'){
                        this.betCount = this.min3X;
                        this.$store.commit('SET_BET_COUNT_TRX', this.betCount);
                    }else if(this. betIndex == '5X'){
                        this.betCount = this.min5X;
                        this.$store.commit('SET_BET_COUNT_TRX', this.betCount);
                    }else if(this. betIndex == '30X'){
                        this.betCount = this.min30X;
                        this.$store.commit('SET_BET_COUNT_TRX', this.betCount);
                    }
                }
            },

            inputFunc(){
                if(this.betCount < this.minBetCount){
                    this.$message({
                        message: this.$t(betting.minBetCount),
                        type: 'error'
                    });
                }else if(this.betCount > this.maxBetCount){
                    this.betCount = this.maxBetCount;
                }else{
                    this.betCount = parseInt(this.betCount);
                }
            },

            onGameLoad(event) {
                this.gameWindow = event.target.contentWindow;
            },

            start_bet(currGameLotteryNum, retainTimes) {
                if (this.gameWindow){
                    this.gameWindow.postMessage('{\"cmd\":\"startBet\",\"id\":' +
                        currGameLotteryNum + ',\"retainTimes\":' + retainTimes + ',\"lang\":\"' +
                        this.$store.getters.GET_LANGUAR_TYPE + '\"}','*');
                }
            },

            on_hide() {
                if (this.gameWindow){
                    this.gameWindow.postMessage('{\"cmd\":\"on_hide\"}','*');
                }
            },

            on_show() {
                if (this.gameWindow){
                    this.gameWindow.postMessage('{\"cmd\":\"on_show\"}','*');
                }
            },

            handleMessage(e) {
                const data = e.data;
                //console.log(data);

                var sMsg = JSON.stringify(data);
                if (sMsg.indexOf('cmd') == -1){
                    return;
                }

                switch (data.cmd) {
                    case 'selCare':
                        this. betIndex = data.careType;
                        this.$store.commit('SET_SEL_CARE', data.careType);
                        // 业务逻辑
                        break;
                    case 'animateOver':
                        this.$refs.ringSide.a();
                        break;
                }
            },

            initTimer() {
                let _this = this;
                document.addEventListener('visibilitychange', function(){
                    _this.isHidden = document.hidden;
                    if(_this.isHidden === false){

                    }else{
                        if(this.waitCountDown <= 0){
                            clearInterval(_this.partnerTimer);
                            _this.partnerTimer = '';
                        }

                    }
                })
            },

            /* 对获取倒计时时间的处理 */
            initParentCountDown(endTimer) {
                let serviceSecon = endTimer / 1000;
                if( serviceSecon > 0) {
                    this.waitCountDown = serviceSecon; // 还剩余多长时间
                    this.waitCountDown--;
                }
            },
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
                        /*this.gameCountTimer = result.currGameRemain; // 20123 毫秒
                        this.currGameLotteryNum = result.currGameLotteryNum; 0-31
                        this.$store.commit('SET_SELINDEX', this.currGameLotteryNum );
                        this.countNum();*/

                        this.start_bet(result.currGameLotteryNum, result.currGameRemain);

                        this.$store.commit('SET_BETTING_TIMER_COUNT_DOWN',this.$t('betting.Lottery'));
                    } else if (result.currGameStatus === 'done') { // 等待下一局游戏开始
                        /*this.$store.commit('SET_BETTING_TIMER_COUNT_DOWN',this.$t('betting.Preparing'));
                        this.recovery();
                        let that = this;
                        setTimeout(function(){
                            that.isshow = false;
                        },3000)*/

                        this.$store.commit('SET_BETTING_TIMER_COUNT_DOWN',this.$t('betting.Preparing'));
                    } else if(result.currGameStatus === 'created') { // 下注中，等待开始游戏 （）
                        this.$store.commit('SET_GAME_ID', result.currGameId);
                        //this.currGameStopTime = result.currGameStopTime;
                        if(this.changeStatus){
                            if(this.isAutoBetTrx) {
                                this.startBet();
                            }
                        }
                        /*this.initParentCountDown(parseInt(result.currGameRemain)); // 收到消息开始倒计时 (等待用户投注中)
                        this.thisIsesult = false;
                        this.thisIsesultStr = true;*/
                        this.initParentCountDown(parseInt(result.currGameRemain));

                        //下注中定时器
                        //this.$store.commit('SET_BETTING_TIMER_COUNT_DOWN',result.currGameRemain);
                    }
                }
            }
        }
    }
</script>

<style lang="less">
      .bet-content-home {
        width: 100%;
        .game-frame {
            width: 45vw;
            height: 20vw;
            /*pointer-events:none*/
        }
        .bet-content-main {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding-bottom: 30px;
            .bet-t {
                .bet-top {
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;

                    .bet-time {
                        color: #fff;
                        font-size:11px;
                        //text-align: left;
                        opacity: 0.1;
                    }

                    .bet-count {
                        color: #fff;
                        font-size:11px;
                        font-weight: bold;
                        text-align: center;
                        .count-font{
                            font-size: 30px;
                            padding: 7px 0px;
                        }
                    }

                    .bet-detail-content{
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        margin-bottom: 5px;
                        .bet-detail {
                            border: none;
                            margin: 0 auto;
                            cursor: pointer;
                            font-size: 24px;
                            font-family: "PingFang-SC-Bold";
                            font-weight: bold;
                            color: #181845;
                            width: 160px;
                            line-height: 46px;
                            background: rgba(0, 233, 225, 1);
                            border-radius: 10px;
                            padding-bottom: 6px;
                        }

                        .bet-detail:hover {opacity: .6;}
                    }
                }

               
                
                .bet-withdraw {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 20px;
                    width: 100%;
                    .title{
                        text-align: left;
                        color: #fff;
                        padding: 6px;
                    }
                    .inp {
                        outline: none;
                        border: 1px solid #00E9E1;
                        background: #181845;
                        color: #fff;
                        font-size: 14px;
                        border-radius: 3px;
                        width: 60%;
                        text-align: center;
                        line-height: 32px;
                    }

                    .bet-contents{
                        width: 60%;
                        display: flex;
                        justify-content: flex-start;
                        border: 1px solid #fff;
                        height: 36px;
                        line-height: 36px;
                        border-radius: 4px;
                        margin-top: 30px; 
                        .span-but {
                            flex: 1;
                            color: #2D5876;
                            cursor: pointer;
                            font-size: 14px;
                            border-right: 1px solid #fff;
                        }
                        .last-but{
                            border-right: 0px solid #fff;
                        }
                    }
                
                    .span-but:hover {
                        opacity: .4;  
                    }

                    .with-but {
                        cursor: pointer;
                        color: #fff;
                        font-size: 15px;
                        padding: 5px 25px;
                        border-radius: 3px;
                        background: #0B4543;
                        border: none;

                    }

                    .with-but:hover {
                        opacity: .6;
                    }
                }

                .bet-banner {
                    margin-top: 20px;
                    padding: 10px 0px;
                    border-radius: 3px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    box-sizing: border-box;
                    .bet-title{
                        text-align: left;
                        padding: 6px 0px;
                        color: #fff;
                        width: 70%;
                    }
                    .bet-change{
                        width: 100%;
                        .banner{
                            width: 70%;
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            align-items: center;
                            border: 1px solid #fff;
                            border-radius: 4px; 
                            padding: 6px 10px 6px 10px;
                            img {
                                height: 20px;
                                width: auto;
                            }
                        }
                    }
                    
                }
            }  
            
            .bettings-content{
                box-sizing: border-box;
                padding-top: 20px;
                 .dice-xz{
                    width: 990px;
                    margin: 0 auto;
                    margin-top: 15px;
                    //margin-left: 230px;
                    height: 80px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    
                    .amount2{
                        width:278px;
                        height:54px;
                        float: left;
                        margin-left:25px;
                        border:1px solid rgba(255,255,255,1);
                        border-radius:10px;
                        .sp-num{
                            width:68px;
                            float: left;
                            font-size:18px;
                            font-weight:400;
                            //padding: 0 20px;
                            cursor: pointer;
                            line-height: 54px;
                            color:rgba(255,255,255,1);
                            font-family:'PingFangSC-Regular';
                            border:1px solid #fff; border-top:none; border-bottom:none;border-left:none;
                            }
                        .sp-span{
                            font-size:18px;
                            font-weight:400;
                            padding: 0 13px;
                            cursor: pointer;
                            line-height: 54px;
                            color:rgba(255,255,255,1);
                        }
                    }
                    .amount3{
                        float: left;
                        position: relative;
                        .amount-span{
                            opacity:0.5;
                            font-size:14px;
                            text-align: left;
                            margin-left:62px;
                            color:rgba(255,255,255,1);
                            font-weight:400;
                            font-family:'PingFangSC-Regular';
                            position: absolute;
                            left: -40px;
                            top: -40px;
                        }
                        .input-xz .el-input__inner{
                            height: 56px;
                            width: 310px;
                            text-align: center;
                            background: transparent;/* #181845 */
                            margin-left: 20px;
                            font-size: 22px;
                            border-radius: 10px;
                            padding: 0 10px;
                            border: 1px solid #00E9E1;
                            color: #fff;
                            outline: none;
                            // opacity: 0.8;
                        }
                    }
                }
                .dice-footer{
                    width: 990px;
                    height: 100px;
                    margin: 0 auto;
                    margin-top: 20px;
                    .footer{
                    float:left;
                    // margin-left: 55px;
                    padding: 0 54px;
                    .foot-p{
                        opacity:0.5;
                        font-size:14px;
                        text-align: left;
                        font-weight:400;
                        line-height: 28px;
                        color:rgba(255,255,255,1);
                        font-family:'PingFangSC-Regular';
                    }
                    .input-footer {
                        height: 54px;
                        width: 200px;
                        line-height: 54px;
                        // text-align: center;
                        // margin-left: 20px;
                        margin-top: -10px;
                        font-size: 22px;
                        border-radius: 10px;
                        padding: 0 10px;
                        border: 1px solid #fff;
                        color: #fff;
                        outline: none;
                        background: transparent;
                        .tp-sty{
                        float:left;
                        width:10px;
                        .img{
                            vertical-align: middle;
                        }
                        }
                    }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 500px){
        .bet-content-home {
            width: 100%;
            .game-frame {
                width: 100vw;
                height: 45vw;
            }
            .bet-content-main {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .bet-t {
                    .bettings-content{
                        box-sizing: border-box;
                        padding-top: 0px;
                        .bet-banner {
                            padding: 10px;
                            font-size: 12px;
                            img{
                                height: 20px;
                                width: auto;
                            }
                        }
                        .bet-count {color: #fff;font-size:11px;font-weight: bold}
                        .bet-withdraw {
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            align-items: center;
                            margin-top: 20px;
                            width: 90%;
                            .title{
                                text-align: left;
                                color: #fff;
                                padding: 6px;
                            }
                            .inp {
                                outline: none;
                                border: 1px solid #00E9E1;
                                background: #181845;
                                color: #fff;
                                font-size: 14px;
                                border-radius: 3px;
                                width: 90%;
                                text-align: center;
                                line-height: 32px;
                            }

                            .bet-contents{
                                width: 90%;
                                display: flex;
                                justify-content: flex-start;
                                border: 1px solid #fff;
                                height: 36px;
                                line-height: 36px;
                                border-radius: 4px;
                                margin-top: 30px; 
                                .span-but {
                                    flex: 1;
                                    color: #2D5876;
                                    cursor: pointer;
                                    font-size: 14px;
                                    border-right: 1px solid #fff;
                                }
                                .last-but{
                                    border-right: 0px solid #fff;
                                }
                            }
                    
                            .span-but:hover {
                                opacity: .6;  
                            }

                            .with-but {
                                cursor: pointer;
                                color: #fff;
                                font-size: 15px;
                                padding: 5px 25px;
                                border-radius: 3px;
                                background: #0B4543;
                                border: none;

                            }

                            .with-but:hover {
                                opacity: .6;
                            }
                        }
                    }
                    .bet-top{
                        .bet-detail-content{
                            .bet-detail {
                                border: none;
                                margin: 0 auto;
                                cursor: pointer;
                                font-size: 24px;
                                font-family: "PingFang-SC-Bold";
                                font-weight: bold;
                                color: #181845;
                                width: 120px;
                                line-height: 26px;
                                background: rgba(0, 233, 225, 1);
                                border-radius: 10px;
                                padding-bottom: 6px;
                            }

                            .bet-detail:hover {opacity: .6;}
                        }
                    }
                }
            }
        }
    }

    .el-switch__core{
        border: 1px solid #039074;
        background: #999;
    }

    .el-switch__core:after{
        background: #fff;
    }

    .el-switch.is-checked .el-switch__core{
        background: #039074;
    }
</style>