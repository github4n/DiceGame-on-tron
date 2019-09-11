<template>
  <div class="box">
    <div v-if="isPcDevice" class="header-box">
      <div class="pc-device">
        <div class="header-center">
          <ul class="menu">

            <li @click="selClick(0)" :class="{'active': selIndex==0}">{{$t('header.whitePaper')}}</li>

            <li @click="selClick(2)" :class="{'active': selIndex==2}">{{$t('header.payout')}}</li>

            <li @click="selClick(1)" :class="{'active': selIndex==1}">{{$t('header.rewardsEvent')}}</li>

            <!-- <li @click="selClick(7)" :class="{'active': selIndex==7}">{{$t('header.fair')}}</li> -->

            <!-- <li @click="selClick(3)" :class="{'active': selIndex==3}">{{$t('header.howToPlay')}}</li> -->

            <li>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link" style="border:none;-webkit-text-fill-color: #fff;">
                  {{$t('header.help')}}
                </span>
                <el-dropdown-menu slot="dropdown" style="margin: 0;">
                  <el-dropdown-item command=3>{{$t('header.howToPlay')}}</el-dropdown-item>
                  <el-dropdown-item command=8>{{$t('header.graphic')}}</el-dropdown-item>
                  <!-- <el-dropdown-item command=7>{{$t('header.fair')}}</el-dropdown-item> -->
                </el-dropdown-menu>
              </el-dropdown>
            </li>

            <li v-show="!isLogin" :class="{'active': selIndex==4}">
              <span @click="selClick(4)" class="login">{{$t('header.login')}}</span>
            </li>

            <li v-show="isLogin">
               <el-tooltip class="item" effect="dark" placement="bottom">
                <div slot="content" class="tooltip-bolck">
                  <div class="left-block">
                    <circle-progress v-if="isShowProgress" :id="energy" ref="$circle"  class="progress" :isAnimation="true" :isRound="true"
                      :width="width" :radius="radius" :progress="energyNum" :barColor="barColor"
                      :duration="duration" :delay="delay" :timeFunction="timeFunction" :backgroundColor="backgroundColor">
                    </circle-progress>

                    <div class="progress-title">
                      <p>{{energyNum}}%</p>
                      <p>{{$t('betting.Energy')}}</p>
                    </div>
                  </div>

                  <div class="right-block">
                    <circle-progress v-if="isShowProgress" :id="bandwidth" ref="$circle"  class="progress" :isAnimation="true" :isRound="true"
                      :width="width" :radius="radius" :progress="bandwidthNum" :barColor="barColor"
                      :duration="duration" :delay="delay" :timeFunction="timeFunction" :backgroundColor="backgroundColor">
                    </circle-progress>

                    <div class="progress-title">
                      <p>{{bandwidthNum}}%</p>
                      <p>{{$t('betting.Bandwidth')}}</p>
                    </div>
                  </div>
                </div>
                <span>{{accountName}}</span>
               </el-tooltip>
            </li>

            <!-- <li>
             
              <span :class="{'active': langType=='zh'}" @click="selClick(5)">CN</span>
              <span :class="{'active': langType=='en'}" style="margin-left: -5px;" @click="selClick(6)">EN</span>
            </li> -->
          </ul>
        </div>

        <div class="header-left">
          <a @click="switchAudio()" style='inline-block;'>
            <img v-if="!openSound" class='picture' src="../../assets/imge/sound_cut.png">
            <img v-if="openSound" class='picture' src="../../assets/imge/sound_open.png">
          </a>
          <a style='inline-block;' target="_blank" href="https://t.me/tronoscar">
            <img class='picture' src="../../assets/img/icon1.png">
          </a>

          <a style='inline-block;' target="_blank" href="https://twitter.com/TronOscar1">
            <img class='picture' src="../../assets/img/icon2.png">
          </a>

          <a style='inline-block;' target="_blank" href="https://medium.com/@TronOscar1">
            <img class='picture' src="../../assets/img/icon3.png">
          </a>

          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">
              <span>TronOscar.Official@gmail.com</span>
            </div>
            <img @click='copyNum' class='picture' style="position:relative;top:-2px;" src="../../assets/img/icon4.png">
          </el-tooltip>

          <!-- <a style='inline-block;' target="_blank" href="https://discord.gg/APKBQAN">
            <img class='picture' src="../../assets/img/icon5.png">
          </a> -->

          <div class='lang'>
            <img class='right-img picture' @click="selClick(6)" v-show='zhShow' src="../../assets/img/icon10.png">
            <img class='right-img picture' @click="selClick(5)" v-show='enShow' src="../../assets/img/icon11.png">
          </div>
          <div class='position:relative'>
            <img class='right-img picture' v-show='imgIndex == "1"' @click="changeShow()"  src="../../assets/img/icon6.png" alt="">
            <img class='right-img picture' v-show='imgIndex == "2"' @click="changeShow()" src="../../assets/img/icon7.png" alt="">
            <img class='right-img picture' v-show='imgIndex == "3"' @click="changeShow()" src="../../assets/img/icon8.png" alt="">
            <img class='right-img picture' v-show='imgIndex == "4"' @click="changeShow()" src="../../assets/img/icon9.png" alt="">
            <div class='picture-list' v-show='showImg'>
              <img class='right-img picture' @click='changeIndex(1)' src="../../assets/img/icon6.png" alt="">
              <img class='right-img picture' @click='changeIndex(2)' src="../../assets/img/icon7.png" alt="">
              <img class='right-img picture' @click='changeIndex(3)' src="../../assets/img/icon8.png" alt="">
              <img class='right-img picture' @click='changeIndex(4)' src="../../assets/img/icon9.png" alt="">
            </div>
          </div>
        </div>

        <!-- <div class='header-right'>
          <div class='lang'>
            <img class='right-img' @click="selClick(6)" v-show='zhShow' src="../../assets/img/icon10.png">
            <img class='right-img' @click="selClick(5)" v-show='enShow' src="../../assets/img/icon11.png">
          </div>
          <div class='position:relative'>
            <img class='right-img' v-show='imgIndex == "1"' @click="changeShow()"  src="../../assets/img/icon6.png" alt="">
            <img class='right-img' v-show='imgIndex == "2"' @click="changeShow()" src="../../assets/img/icon7.png" alt="">
            <img class='right-img' v-show='imgIndex == "3"' @click="changeShow()" src="../../assets/img/icon8.png" alt="">
            <img class='right-img' v-show='imgIndex == "4"' @click="changeShow()" src="../../assets/img/icon9.png" alt="">
            <div class='picture-list' v-show='showImg'>
              <img class='right-img' @click='changeIndex(1)' src="../../assets/img/icon6.png" alt="">
              <img class='right-img' @click='changeIndex(2)' src="../../assets/img/icon7.png" alt="">
              <img class='right-img' @click='changeIndex(3)' src="../../assets/img/icon8.png" alt="">
              <img class='right-img' @click='changeIndex(4)' src="../../assets/img/icon9.png" alt="">
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div style='background:#00E9E1;color:#181945;width:100%;display:flex; justify-content: center;align-items: center;'>
      <div style='margin-right:10px;'><img style='width:14px;position:relative;top:2px;' src="@/assets/imge/notice.png" alt=""></div>
      <div v-show="langType == 'zh'">
        <slider v-if="langType == 'zh'" ref="slider" :options="options">
          <slideritem  v-for="(item,index) in marqueeZhList" :key="index">{{item}}</slideritem>
        </slider>
      </div>
      
      <div v-show="langType == 'en'">
        <slider v-if="langType == 'en'" ref="slider" :options="options">
          <slideritem v-for="(itemAdd,index) in marqueeEnList" :key="index">{{itemAdd}}</slideritem>
        </slider>
      </div>
      
    </div>
   

    <payout-dialog v-show="showPayoutDialog" @closeModule='closeModule'></payout-dialog>
    <player-dialog v-show="showPlayerDialog" @closePlayerModule='closePlayerModule'></player-dialog>
    <reward-dialog v-show="showRewardDialog" @closeRewardModule='closeRewardModule'></reward-dialog>
    <tron-link v-show="showTronDialog" @closeTronLinkModule='closeTronLinkModule'></tron-link>
    <fair-dialog :baseInfo='baseInfo' v-show="showFairDialog" @closeFairModule='closeFairModule'></fair-dialog>

    <div v-if="!isPcDevice" class="mobile-device">
      <div class="menu-item" v-show="!isShowMenu">
        <i @click="showMenu()" class="fa fa-bars i-menu" aria-hidden="true"></i>
        <img class="header-logo" src="../../assets/images/logo.png" alt="">
        <div class="login-lang">
          <span v-if="!isLogin" @click="selClick(4)" class="login-title">{{$t('header.login')}}</span>
          <span v-else class="login-title">{{accountName}}</span>
          <img v-if="langTypeChEn == 'zh'" @click="changeLang('zh')" class="lang-logo" src="../../assets/images/chinese@2x.png" alt="">
          <img v-else @click="changeLang('en')" class="lang-logo" src="../../assets/images/english@2x.png" alt="">
        </div>
      </div>

      <el-row class="tac" v-show="isShowMenu">
        <el-col>
          <el-menu class="el-menu-vertical-demo" background-color="#1c1b2b" text-color="#fff"
            active-text-color="#ffd04b" @select="handleSelect" :default-active="activeIndex">
            <el-menu-item-group>
              <el-menu-item index="howToPlay">{{$t('header.howToPlay')}}</el-menu-item>
              <el-menu-item index="rewards">{{$t('header.rewards')}}</el-menu-item>
              <el-menu-item index="payout">{{$t('header.payout')}}</el-menu-item>
              <!-- <el-menu-item index="login">{{$t('header.login')}}</el-menu-item> -->
            </el-menu-item-group>
          </el-menu>
        </el-col>
      </el-row>
    </div>

    
  </div>
</template>

<script>
  import CircleProgress from '../common/circle-progress';
  import PayoutDialog from '../dialog/payout-dialog.vue';
  import PlayerDialog from '../dialog/player-dialog.vue';
  import RewardDialog from '../dialog/reward-dialog.vue';
  import TronLink from '../dialog/tron-link.vue';
  import FairDialog from '../dialog/fair-dialog.vue';
  import utilsTron from '@/utilsTron';
  import utils from '@/utils';
  import { all } from 'q';
  import { slider, slideritem } from 'vue-concise-slider'
  import { setStore, getStore, removeStore } from "@/config/storage";
  import { getNextDividendTime, getPrizeRecords , getMyPrizes ,withdrawPrizes, getVerifyRandom ,getMyBetList, getPrizePot } from '@/service/api';

  export default {
    name: 'pcHeader',

    components: { slider, slideritem, PayoutDialog, PlayerDialog, RewardDialog, TronLink, CircleProgress, FairDialog  },

    computed: {
      'openSound': function () {
        return this.$store.getters.GET_OPEN_SOUND;
      },

      'isLogin': function() {
        return this.$store.getters.IS_USER_LOGIN;
      },

      'accountName': function() {
        return this.$store.getters.GET_ACCOUNT_Name;
      },

      'tronwebObj': function() {
          return this.$store.getters.GET_RING_TRON_WEB;
      },

      'tranwebToken': function() {
          return this.$store.getters.GET_RING_TRON_WEB_TOKEN;
      },

      'getToken':function(){
         return this.$store.getters.GET_TOKEN;
      },
    },

    data(){
      return {
        imgIndex: '1',
        showImg: false,
        walletValue:'TronLink',
        walletList:[
          {name:'TronLink',id: 1},
          {name:'Scatter',id: 2},
          {name:'GuildWallet',id: 3},
          {name:'TronPay',id: 4},
        ],
        options1: [{
          value: 'TronLink',
          label: 'TronLink'
        }, {
          value: 'Scatter',
          label: 'Scatter'
        }, {
          value: 'GuildWallet',
          label: 'GuildWallet'
        }, {
          value: 'TronPay',
          label: 'TronPay'
        }],
        value: 'TronLink',
        baseInfo: {},
        isShowMarquee: false,
        langStr: localStorage.getItem('langType') == 'en' ? 'English' : '简体中文',
        activeIndex: 'howToPlay',
        isShowMenu: false,
        selIndex: 1,
        langType: localStorage.getItem('langType') == 'en' ? 'en' : 'zh',
        showPayoutDialog: false,
        showPlayerDialog: false,
        showRewardDialog: false,
        showTronDialog: false,
        showFairDialog: false,
        tronAccountName: '',
        prizePot: 0,
        deposit: 0,
        totalDeposit: 0,
        earnings: 0,
        odinEarnings: 0,
        //addr: localStorage.getItem('token'),
        isPcDevice: this.$isPcDeviceType,
        langTypeChEn: 'zh',
        dataBetList: [],
        isVip: false,
        isShow: true,

        zhShow: false,
        enShow: true,

        isShowProgress: true,
        energy: 'energy',
        bandwidth: 'bandwidth',
        width: 100,
        radius: 10,
        duration: 1000,
        delay: 20,
        barColor: '#F2AE57',
        backgroundColor: '#FFE8CC',
        timeFunction: 'cubic-bezier(0.99, 0.01, 0.22, 0.94)',

        energyNum: 0, // 能量
        bandwidthNum: 0, // 宽带

        isShowAdd: 1,
        marqueeZhList:  ['2019年6月10日，TronOscar將於24點整（UTC+8）起暫停遊戲業務。待合約更新完畢，將另行通知。'],
        marqueeEnList: ['On 10th June, 2019, all games will be temporarily shut down from 12:00 (UTC-4). Further announcement will be released once the smart contracts update is completed.'],

         //Sliding configuration [obj]
        options: {
          pagination: false, // 底部小圆点是否隐藏（true显示，false隐藏）
          currentPage: 0, // 当前页码
          thresholdDistance:1000, // 滑动判定距离
          thresholdTime:1000, // 滑动判定时间
          autoplay: 3000, // 自动滚动[ms]
          loop: true, // 是否循环滚动
          direction:'vertical', // 滚动方向 horizontal vertical
          infinite:1, // 无限滚动前后遍历数
          slidesToScroll:1, // 滚动行数
          timingFunction: 'ease',
          duration: 300,
          speed: 1000

        },
        pdfUrlCn:"./static/pdf/TRONOSCAR-Whitepaper-CN.pdf",
        pdfUrlEn:"./static/pdf/TRONOSCAR-Whitepaper-EN.pdf", 
        pdfNameCn:"./static/pdf/TronOscar-CN.pdf", 
        pdfNameEn:"./static/pdf/TronOscar-EN.pdf",
      }
    },

    created() {
      this.checkChromPlug();

      let that = this;
      setInterval(function () {
        that.refreshPrizePot();
      },2000);
    },

    methods: {
      async refreshPrizePot(){
        if (this.$store.getters.IS_USER_LOGIN){
            let pot = await utilsTron.getPrizePot(); //获取分红奖池余额
            this.prizePot = pot / Math.pow(10, 6);
            this.$store.commit('SET_PRIZE_POT_BALANCE', this.prizePot); //获取分红奖池余额
        } else {
            let that = this;
            getPrizePot().then(res =>{
                that.prizePot = res / Math.pow(10, 6);
                that.$store.commit('SET_PRIZE_POT_BALANCE', that.prizePot); //获取分红奖池余额
            })
        }
      },

      switchAudio(){
        if (this.openSound){
          this.$store.commit('SET_OPEN_SOUND', false);
        }else {
          this.$store.commit('SET_OPEN_SOUND', true);
        }
      },

      copyNum() {
          var oInput = document.createElement("input");
          oInput.value = "TronOscar.Official@gmail.com";
          document.body.appendChild(oInput);
          oInput.select(); // 选择对象
          document.execCommand("Copy"); // 执行浏览器复制命令

          const h = this.$createElement;
          this.$message({
              message: h('p', { style: 'color: #181945' }, this.$t("betting.mailCopy")),
              //type: "info"
              duration: 1000,
          });
      },

      initData() {
        if(this.tronwebObj){
        }else{
          this.checkTronLinkToken();
        }
      },

      handleSelect(key, keyPath) {
        this.isShowMenu = false;
        switch(key){
          case 'howToPlay': //玩家介绍
            this.activeIndex = key;
            this.showPlayerDialog = true;
          break;

          case 'rewards': //邀请奖励
            this.activeIndex = key;
            // this.showRewardDialog = true;
            this.$router.push({path:'/reward'})
          break;

          case 'payout': //分红
            this.activeIndex = key;
          break;

          case 'ch':
            this.langType = 'zh';
            this.$i18n.locale = 'zh';
            this.langStr = '简体中文';
            localStorage.setItem('langType', 'zh');
          break;

          case 'en':
            this.langType = 'en';
            this.$i18n.locale = 'en';
            this.langStr = 'English';
            localStorage.setItem('langType', 'en');
          break;

          case 'login': //登录
          break;

          default:
          break;
        }
      },

      changeShow(){
        this.showImg = !this.showImg;
      },

      changeIndex(index){
        this.imgIndex = index;
        this.showImg = false;
      },

      showMenu() {
        this.isShowMenu = true;
      },

      selClick(index) {
        this.selIndex = index;
        switch(index){
          case 0: // 白皮书
            let pdfName = '';
            if(localStorage.getItem('langType') == 'zh'){
              // pdfName = 'TRONOSCAR-Whitepaper-CN.pdf';
              window.open(this.pdfUrlCn);
            }else if(localStorage.getItem('langType') == 'en'){
              // pdfName = 'TRONOSCAR-Whitepaper-EN.pdf';
              window.open(this.pdfUrlEn);
            }
            //this.setUrl(pdfName);
            // window.open('https://www.tronoscar.pro/pdf?pdf='+pdfName,'_blank');
          break;

          case 1: //邀请奖励
            this.showRewardDialog = true;
            //this.$router.push({path:'/reward'})
          break;

          case 2: //分红
              this.showPayoutDialog = true;
              this.getPrizePotDepositTotalDeposit();
          break;

          case 3: //玩家介绍
            this.showPlayerDialog = true;
          break;

          case 4: //登录
            this.checkTronLinkToken();
          break;

          case 5:
            this.isShowMarquee = true;
            this.zhShow = true;
            this.enShow = false;
            this.langType = 'zh';
            this.$i18n.locale = 'zh';
            this.langStr = '简体中文';
            localStorage.setItem('langType', 'zh');
            this.$store.commit('SET_LANGUAR_TYPE', 'zh');
          break;

          case 6:
            this.isShowMarquee = false;
            this.zhShow = false;
            this.enShow = true;
            this.langType = 'en';
            this.$i18n.locale = 'en';
            this.langStr = 'English';
            localStorage.setItem('langType', 'en');
            this.$store.commit('SET_LANGUAR_TYPE', 'en');
          break;

          case 7:
            this.getFairData();
          break;

          case 8: // 图文详解
            let name = '';
            // debugger
            if(localStorage.getItem('langType') == 'zh'){
              // name = 'TronOscar-CN';
              window.open(this.pdfNameCn);
            }else if(localStorage.getItem('langType') == 'en'){
              // name = 'TronOscar-EN';
              window.open(this.pdfNameEn);
            }
            //window.open('https://www.oscar.pro/pdf?pdf='+name,'_blank');
            // window.open('https://www.tronoscar.pro/pdf?pdf='+name,'_blank');
            //this.setUrl(name);
          break;

          default:
          break;
        }
      },

      setUrl(name) {
        const {href} = this.$router.resolve({
          path: '/pdf',
          query: {
            pdf: name
          }
        })
        window.open(href, '_blank')
      },

      getFairData() {
        this.showFairDialog = true;
        let params = {'Addr':  this.getToken}
        // let params = {'Addr':  'TGahEPj2Nr6EbvdXW3rFH9BUR6oXxoaXVW'}
        getVerifyRandom(params).then( res => {
          this.baseInfo = res;
          //this.showFairDialog = true;
        })
      },

      async getPrizePotDepositTotalDeposit(){
        let pot = await utilsTron.getPrizePot(); //获取分红奖池余额
        this.prizePot = pot / Math.pow(10, 6);
        this.$store.commit('SET_PRIZE_POT_BALANCE', this.prizePot); //获取分红奖池余额
        // console.log('获取分红奖池余额===', this.prizePot);

        if(this.isLogin){
          this.deposit = await utilsTron.getDeposit(this.getToken); //当前已质押的ODIN量
          this.$store.commit('SET_CURRENT_DEPOSIT_ODIN', this.deposit); //当前已质押的ODIN量
          // console.log('当前已质押的ODIN量===', this.deposit);

          this.totalDeposit = await utilsTron.getTotalDeposit(); //当前质押池ODIN总量
          this.$store.commit('SET_CURRENT_ODIN_TOTAL_DEPOSIT',  this.totalDeposit); //当前质押池ODIN总量
          // console.log('当前质押池ODIN总量===', this.totalDeposit);

          let totalDepotSupply = await utilsTron.getCirculatingSupply(); //ODIN流通总量 getTotalSupply
          this.$store.commit('SET_ODIN_YOYAL_DEPOT_SUPPLY', totalDepotSupply); //ODIN流通总量
          // console.log('ODIN流通总量===', totalDepotSupply);

          if(this.prizePot && this.totalDeposit) {
            if(this.deposit){
              this.earnings = (this.deposit / this.totalDeposit * this.prizePot).toFixed(4); //预期收益
              this.$store.commit('SET_EARNINGS',  this.earnings); //预期收益
              // console.log('预期收益===', this.earnings);
            }

            this.odinEarnings = (10000 / this.totalDeposit * this.prizePot).toFixed(4); //每万收益
            this.$store.commit('SET_ODIN_EARNINGS',  this.odinEarnings); //每万收益
            // console.log('每万收益===', this.odinEarnings);
          }
        }
      },

      /* 获取我的投注 */
      getMyBetList(){
        let params = {'Count': 1, 'Addr': this.getToken};
        getMyBetList(params).then(result => {
          if(result){
            if(result.length > 0){
              this.dataBetList = result;
              //console.log("parseInt(this.dataBetList[0].betId):---------->",parseInt(this.dataBetList[0].betId));
              this.$store.commit('SET_NEW_BET_RECORD', parseInt(this.dataBetList[0].betId));
            }
          }
        })
      },

      async checkChromPlug() {
              // 1. check variable, 检查tronweb是否已经加载
          if(window.tronWeb) {
              //console.log('检查tronweb是否已经加载');
              let tronweb = window.tronWeb;
              // 2. check node connection，检查所需要的API是否都可以连通
              const nodes = await tronWeb.isConnected();
              const connected = !Object.entries(nodes).map(([name, connected]) => {
                  if (!connected) {
                      console.error(`Error: ${name} is not connected`);
                  }
                  return connected;
              }).includes(false);
              if (connected) {
                  //console.log('一切正常。');
                  this.$store.commit('SET_RING_TRON_WEB', tronweb);
                  this.checkTronLinkToken();
              } else {
                  setTimeout(async () => {
                      await this.checkChromPlug();
                  }, 100);
              }
          } else {
              // 如果检测到没有注入tronWeb对象，则等待100ms后重新检测
              // console.log('等待500ms后重新检测');
              setTimeout(async () => {
                  await this.checkChromPlug();
              }, 500);
          }
      },

      checkTronLinkToken() {
          if(this.tronwebObj) {
              if(this.tronwebObj.defaultAddress.hex && this.tronwebObj.defaultAddress.base58){
                  let base58Name = '';
                  if(this.tronwebObj.defaultAddress.base58.length > 15){
                      this.$store.commit('SET_TOKEN', this.tronwebObj.defaultAddress.base58);
                      base58Name = this.tronwebObj.defaultAddress.base58.substring(0,3) + '...' + this.tronwebObj.defaultAddress.base58.substring(this.tronwebObj.defaultAddress.base58.length-3, this.tronwebObj.defaultAddress.base58.length)
                  }else{
                      base58Name = this.tronwebObj.defaultAddress.base58;
                  }
                  this.$store.commit('SET_ACCOUNT_NAME', base58Name);
                  this.$store.commit('SET_RING_TOKEN', this.tronwebObj.defaultAddress.base58);
                  utilsTron.setTronWeb(this.tronwebObj);
                  this.initTrontData(this.tronwebObj.defaultAddress.base58);
              } else {
                  this.$message({
                      message:  this.$t('betting.PleaseTronLink'),
                      type: 'error'
                  });
              }
          }
      },

      reset() {
        this.isShowProgress = false
        this.$nextTick(() => {
          this.isShowProgress = true
        })
      },

      getWager() { 
          utilsTron.getRingWager(1).then(res => {
            if(res) {
              this.$store.commit('SET_2X_MAX', res.wager);
              this.$store.commit('SET_2X_MIN', res.minimal);
            }
              // this.maxOne = res.wager;
          })
          utilsTron.getRingWager(2).then(res => {
            if(res) {
              this.$store.commit('SET_3X_MAX', res.wager);
              this.$store.commit('SET_3X_MIN', res.minimal);
            }
              // this.maxTwo = res.wager;
          })
          utilsTron.getRingWager(3).then(res => {
            if(res) {
              this.$store.commit('SET_5X_MAX', res.wager);
              this.$store.commit('SET_5X_MIN', res.minimal);
            }
              // this.maxThree = res.wager;
          })
          utilsTron.getRingWager(4).then(res => {
            if(res) {
              this.$store.commit('SET_30X_MAX', res.wager);
              this.$store.commit('SET_30X_MIN', res.minimal);
            }
              // this.maxFour = res.wager;
          })
      },

      async initTrontData(_addr){
        let userAccountResorcces = await this.tronwebObj.trx.getAccountResources(_addr); //获取用户能量宽带
        if(userAccountResorcces.EnergyUsed > 0 && userAccountResorcces.EnergyLimit > 0){
          this.energyNum = parseInt((userAccountResorcces.EnergyUsed / userAccountResorcces.EnergyLimit * 100).toFixed(0));
        }
        if(userAccountResorcces.freeNetUsed > 0 && userAccountResorcces.freeNetLimit > 0){
          this.bandwidthNum = parseInt((userAccountResorcces.freeNetUsed / userAccountResorcces.freeNetLimit * 100).toFixed(0));
        }
        this.reset();
        this.getWager();
        let mintLevelAndOverage = await utilsTron.getMintLevelAndOverage(); //挖矿阶段和当前阶段挖矿剩余量
        this.$store.commit('SET_MINT_RATE', mintLevelAndOverage.mintRate); //比例值
        this.$store.commit('SET_OVERAGE', mintLevelAndOverage.overage); //剩余量
        this.$store.commit('SET_MINT_LEVEL', mintLevelAndOverage.mintLevel); //阶段
        let odinFreeBalance = await utilsTron.getFreeBalanceOf(_addr); // 当前可质押ODIN余额
        this.$store.commit('SET_ODIN_FREE_BALANCE', odinFreeBalance);
        let maxDiceWagerPrice = await utilsTron.getDiceWager(); // 获取dice当前最大赌注金额
        //let maxRingWagerPrice = await utilsTron.getRingWager(); // 获取ring当前最大赌注金额
        // let maxTreeWagerPrice = await utilsTron.getTowerWager(); // 获取tree当前最大赌注金额
        this.$store.commit('SET_DICE_MAX_WAGER_PRICE', maxDiceWagerPrice);
        //this.$store.commit('SET_RING_MAX_WAGER_PRICE', maxRingWagerPrice);
        //this.$store.commit('SET_TREE_MAX_WAGER_PRICE', maxTreeWagerPrice);
        let trxBalance = await this.tronwebObj.trx.getBalance(_addr); //  获取账户TRX余额
        if(trxBalance > 0) {
          let trxFreeBalance = trxBalance / Math.pow(10,6);
          this.$store.commit('SET_TRX_FREE_BALANCE', trxFreeBalance);
        }
        let amount = mintLevelAndOverage.amount;
        if(mintLevelAndOverage.overage && amount){
          let overage = (mintLevelAndOverage.overage / amount);
          let phaseRatio = (overage * 100).toString().substring(0, 2);
          let num = parseInt(phaseRatio);
          this.$store.commit('SET_PHASE_RATIO', num);
        }
      },

      closeModule() {
        this.showPayoutDialog = false;
      },

      closePlayerModule(){
        this.showPlayerDialog = false;
      },

      closeRewardModule() {
        this.showRewardDialog = false;
      },

      closeTronLinkModule() {
        this.showTronDialog = false;
      },

      closeFairModule() {
        this.showFairDialog = false;
      },

      changeLang(type){
        switch(type) {
          case 'en':
            this.langTypeChEn = 'zh';
            this.$i18n.locale = 'zh';
            this.langStr = '简体中文';
            localStorage.setItem('langType', 'zh');
          break;

          case 'ch':
            this.langTypeChEn = 'en';
            this.$i18n.locale = 'en';
            this.langStr = 'English';
            localStorage.setItem('langType', 'en');
          break;

          default:
          break;
        }
      },

      handleCommand(command) {
        this.selClick(parseInt(command));
      }
    },

    sockets: {
      connect: function () {
            console.log('socket connected22')
      },

      announce: function(res){
        if(res) {
          let result = JSON.parse(res);
          this.marqueeZhList = [];
          this.marqueeEnList = [];
          this.marqueeZhList.push(result.Msg_cn);
          this.marqueeEnList.push(result.Msg_en);
        }
      }
    }
  }
</script>

<style lang="less">
  .el-popper .popper__arrow{
    display: none !important;
  }

  .el-dropdown-menu{
    background: #fff;
    color: #f7e9b3;
    border: none;
    margin: 0;
  }

  .el-dropdown-menu__item:hover{
    background: #ccc;
  }

  .el-dropdown-menu__item--divided{
    border: none;
  }

  .el-menu--horizontal>.el-menu-item {
    color: #fff;
  }

  .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
    color: #909399;
  }

  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    outline: 0;
    color: #fff;
  }

  .el-select-dropdown.el-popper{
    border: none;
  }

  .el-scrollbar__wrap{
    overflow: hidden !important;
    background: #204252;
  }

  .el-select-dropdown__item.selected{
    background: #204252 !important;
    color: #fff !important;
  }

  .el-select-dropdown__item:hover{
    background: #bec3ca7d !important;
    color: #fff !important;
  }

  .el-select-dropdown__item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    color: #fff;
  }

  .el-select-dropdown{
    border: 0px solid #204252;
  }

  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background: #bec3ca7d;
    color: #fff;
  }

  .el-icon-arrow-up:before{
    content: ''
  }

  .box{
     @media screen and (max-width: 1440px) and (min-width: 992px) {
      .header-box{
        width: 1010px;
        height: 60px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        align-items: center;
        background: #181845;
        //background:linear-gradient(0deg,rgba(0,204,208,1),rgba(24,24,69,1));
        box-sizing: border-box;
        padding: 0px 10px;
        .pc-device{
          width: 1010px;
          margin: auto;
          display: flex;
          flex-wrap: nowrap;
          box-sizing: border-box;
          .header-left{
            width: 30%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            .picture{
              width: 26px;
            }
            .header-logo{
              width: 100%;
              height: 37px;
              background: url(../../assets/images/logo.png) no-repeat;
              background-position: 0;
            }

            .picture-list{
              width: 26px;
              padding: 0px 10px;
              position: absolute;
              top: 56px;
              right:0px;
              z-index: 99;
              .right-img{
                margin-top:5px;
              }
            }
          }

          .header-center{
            width: 70%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 60px;
            .menu{
              margin: 0;
              padding: 0;
              list-style: none;
              li{
                float: left;
                padding: 0 20px;
                cursor: pointer;
                height: 60px;
                line-height: 60px;
                font-weight: 600;
                font-size: 12px;
                color: #fff;
                .login{
                  color: #fff;
                  padding: 2px 10px;
                  border: 1px solid #039074;
                }
                span{
                  color: #fff;
                  padding: 2px 10px;
                  border: 1px solid #039074;
                }
                .active{
                  background: #039074;
                  -webkit-text-fill-color: #fff;
                }
              }
              li:hover{
                opacity: .7;
              }
              .active{
                color: #fff;
              }
            }
          }

          // .header-right{
          //   height: 60px;
          //   width: 10%;
          //   display: flex;
          //   justify-content: flex-end;
          //   align-items: center;
          //   .lang{
          //     margin-right: 10px;
          //     cursor: pointer;
          //   }
          //   .right-img{
          //     width: 26px;
          //   }

          //   .picture-list{
          //     width: 26px;
          //     padding: 0px 10px;
          //     position: absolute;
          //     top: 56px;
          //     right:0px;
          //     z-index: 99;
          //     .right-img{
          //       margin-top:5px;
          //     }
          //   }

          //   .el-input--suffix .el-input__inner{
          //     background: transparent;
          //     border: 0px;
          //     font-size: 14px;
          //     font-weight: 700; 
          //     width: 130px;
          //     text-align: left;
          //     color: #fff;
          //   }
          // }
        }
      }
    }

    @media screen and (max-width: 3000px) and (min-width: 1440px) {
      .header-box{
        width: 1250px;
        height: 60px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        align-items: center;
        background: #181845;
        //background:linear-gradient(0deg,rgba(0,204,208,1),rgba(24,24,69,1));
        position: relative;
        //left:190px;
        box-sizing: border-box;
        padding: 0 25px;
        .pc-device{
          width: 1250px;
          margin: auto;
          display: flex;
          flex-wrap: nowrap;
          box-sizing: border-box;     
          .header-left{
            width: 30%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            .picture{
              width: 36px;
            }
            .header-logo{
              width: 100%;
              height: 37px;
              background: url(../../assets/images/logo.png) no-repeat;
              background-position: 0;
            }

            .picture-list{
              width: 36px;
              padding: 0px 10px;
              position: absolute;
              top: 61px;
              right:10px;
              z-index: 99;
              .right-img{
                margin-top:5px;
              }
            }
          }

          .header-center{
            width: 70%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .menu{
              margin: 0;
              padding: 0;
              list-style: none;
              li{
                float: left;
                padding: 0 20px;
                cursor: pointer;
                height: 60px;
                line-height: 60px;
                font-weight: 600;
                font-size: 14px;
                color: #fff;
                .login{
                  color: #fff;
                  padding: 2px 10px;
                  border: 1px solid #039074;
                }
                span{
                  color: #fff;
                  padding: 2px 10px;
                  border: 1px solid #00E9E1;
                }
                .active{
                  background: #039074;
                  -webkit-text-fill-color: #fff;
                }
              }
              li:hover{
                opacity: .7;
              }
              .active{
                color: #fff;
              }
            }
          }

          // .header-right{
          //   height: 60px;
          //   width: 10%;
          //   display: flex;
          //   justify-content: flex-end;
          //   align-items: center;
          //   .lang{
          //     margin-right: 10px;
          //     cursor: pointer;
          //   }
          //   .right-img{
          //     width: 36px;
          //   }
          //   .picture-list{
          //     width: 36px;
          //     padding: 0px 10px;
          //     position: absolute;
          //     top: 61px;
          //     right:10px;
          //     .right-img{
          //       margin-top:5px;
          //     }
          //   }

          //   .el-input--suffix .el-input__inner{
          //     background: transparent;
          //     border: 0px;
          //     font-size: 16px;
          //     font-weight: 700; 
          //     width: 150px;
          //     text-align: left;
          //     color: #fff;
          //   }
          // }
        }
      }
    }

    .mobile-device{
      width: 100%;
      height: 60px;
      .menu-item{
        display: flex;
        align-items: center;
        background: radial-gradient(#500c07 5%, #000 70%);
        justify-content: space-between;
        padding: 15px;
        box-sizing: border-box;



        .i-menu{
          flex: 1;
          color: #f7e9b3;
          font-size: 22px;
          text-align: left;
        }

        .header-logo{
          height: 30px;
        }

        .login-lang{
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          .login-title {
            border-radius: 3px;
            color: #111;
            background: rgba(167,141,101,1);
            font-size: 12px;
            display: inline-block;
            height: 24px;
            text-align: center;
            line-height: 24px;
            padding: 0px 10px;
            margin-right: 8px;
          }

          .lang-logo{
            height: 23px;
          }
        }


      }
    }
  }

  .tooltip-bolck{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;

    .left-block{
      position: relative;
      .progress-title{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        p{
          margin: 0;
          padding: 0;
          font-size: 12px;
          text-align: center;
        }
      }
    }

      .right-block{
        position: relative;
        margin-left: 20px;
        .progress-title{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          p{
            margin: 0;
            padding: 0;
            font-size: 12px;
            text-align: center;
          }
        }
      }

    }

    .slider-container{
      height: 25px !important;
      line-height: 25px;
      //background: #f0ece2;
    }

    .slider-wrapper .slider-item{
      font-size: 13px !important;
      background: #00E9E1 !important;
      color: #181945;
    }
</style>

