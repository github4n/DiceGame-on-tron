<template>
  <div class="app-header">
    <payout v-show="showPayoutDialog" @closeModule='closeModule'></payout>
    <player v-show="showPlayerDialog" @closePlayerModule='closePlayerModule'></player>
    <reward v-show="showRewardDialog" @closeRewardModule='closeRewardModule'></reward>
    <tron v-show="showTronDialog" @closeTronLinkModule='closeTronLinkModule'></tron>

    <div class="mobile-device">
      <div class="menu-item" v-show="!isShowMenu">
        <i @click="showMenu()" class="fa fa-bars i-menu" style='color:#00E9E1' aria-hidden="true"></i>
        <router-link :to="{ path: '/' }" style='text-decoration: none;'><img class="header-logo" @click='changeStatus()' src="../../assets/img/header.png" alt=""></router-link>
        <div class="login-lang">
          <span v-if="!isLogin" @click="selClick(4)" class="login-title">{{$t('header.login')}}</span>
          <span v-else class="login-title">{{accountName}}</span>
          <img v-if="langTypeChEn == 'zh'" @click="changeLang('zh')" class="lang-logo" src="../../assets/img/icon10.png" alt="">
          <img v-if="langTypeChEn == 'en'" @click="changeLang('en')" class="lang-logo" src="../../assets/img/icon11.png" alt="">
          <img v-if="!openSound" @click="switchAudio()" class='lang-logo' src="../../assets/imge/sound_cut.png">
          <img v-if="openSound" @click="switchAudio()" class='lang-logo' src="../../assets/imge/sound_open.png">
        </div>
      </div>

      <el-row class="tac" v-show="isShowMenu">
        <el-col>
          <el-menu class="el-menu-vertical-demo" background-color="#181945" text-color="#fff"
            active-text-color="#00E9E1" @select="handleSelect" :default-active="activeIndex">
            <el-menu-item-group>
              <el-menu-item index="whitePaper">{{$t('header.whitePaper')}}</el-menu-item>
              <el-menu-item index="howToPlay">{{$t('header.howToPlay')}}</el-menu-item>
              <el-menu-item index="payout">{{$t('header.payout')}}</el-menu-item>
              <el-menu-item index="rewards">{{$t('header.rewardsEvent')}}</el-menu-item>
              <el-menu-item index="graphic">{{$t('header.graphic')}}</el-menu-item>
              <!-- <el-menu-item index="login">{{$t('header.login')}}</el-menu-item> -->
            </el-menu-item-group>
          </el-menu>
        </el-col>
        <img @click="closeMenu()"  class="delete-icon" src="../../assets/img/delete.png" alt="">
      </el-row>
    </div>
    <!-- <div style='background:#FDF6EB;color:#181945;padding:4px 0px;width:100%;'>
      <slider v-if="isShowMarquee && isShowAdd" ref="slider" :options="options">
        <slideritem  v-for="(item,index) in marqueeZhList" :key="index">{{item}}</slideritem>
      </slider>

      <slider v-if="!isShowMarquee && isShowAdd" ref="slider" :options="options">
        <slideritem v-for="(itemAdd,index) in marqueeEnList" :key="index">{{itemAdd}}</slideritem>
      </slider>
    </div> -->

  </div>
</template>

<script>
  import utils from '@/utils/index.js';
  import Payout from '../app-dialog/payout.vue';
  import Player from '../app-dialog/player.vue';
  import Reward from '../app-dialog/reward.vue';
  import Tron from '../app-dialog/tron.vue';
  import utilsTron from '@/utilsTron';
  import { getMyBetList, getPrizePot } from '@/service/api';
  import { slider, slideritem } from 'vue-concise-slider' 

  export default {
    name: 'appHeader',

    components: { slider, slideritem, Payout, Player, Reward, Tron, },

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
        langStr: localStorage.getItem('langType') == 'en' ? 'English' : '简体中文',
        activeIndex: 'howToPlay',
        isShowMenu: false,
        selIndex: 1,
        langType: localStorage.getItem('langType') == 'en' ? 'en' : 'zh',
        showPayoutDialog: false,
        showPlayerDialog: false,
        showRewardDialog: false,
        showTronDialog: false,
        tronAccountName: '',
        prizePot: 0,
        deposit: 0,
        totalDeposit: 0,
        earnings: 0,
        odinEarnings: 0,
        addr: localStorage.getItem('token'),
        langTypeChEn: 'en',
        dataBetList: [],
        isVip: false,
        clickLogin: false,

        isShowMarquee: false,
        isShowAdd: 1,
       /*  marqueeZhList: [],
        marqueeEnList: [], */

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

    mounted() {
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

      initData() {
        if(this.tronwebObj){
        }else{
          this.checkTronLinkToken();
        }
      },

      handleSelect(key, keyPath) {
        this.isShowMenu = false;
        switch(key){
          case 'whitePaper': //白皮书
            this.activeIndex = key;
            let pdfName = '';
            if(localStorage.getItem('langType') == 'zh'){
              // pdfName = 'TRONOSCAR-Whitepaper-CN';
              window.open(this.pdfUrlCn);
            }else if(localStorage.getItem('langType') == 'en'){
              // pdfName = 'TRONOSCAR-Whitepaper-EN';
               window.open(this.pdfUrlEn);
            }
            //window.open('https://www.oscar.pro/pdf?pdf='+pdfName,'_blank');
            window.open('https://www.tronoscar.pro/pdf?pdf='+pdfName,'_blank');
            //this.setUrl(pdfName);
          break;

          case 'howToPlay': //玩家介绍
            this.activeIndex = key;
            this.showPlayerDialog = true;
          break;

          case 'rewards': //邀请奖励
            this.activeIndex = key;
            this.showRewardDialog = true;
          break;

          case 'payout': //分红
            // this.activeIndex = key;
            // if(!this.isLogin){
            //   this.$message({
            //     message: this.$t('betting.loginTronLink'),
            //     type: 'error'
            //   });
            // }else{
            //   this.showPayoutDialog = true;
            //   this.getPrizePotDepositTotalDeposit();
            // }
            this.showPayoutDialog = true;
            this.getPrizePotDepositTotalDeposit();
          break;

          case 'ch':
            this.langType = 'zh';
            this.$i18n.locale = 'zh';
            this.langStr = '简体中文';
            localStorage.setItem('langType', 'zh');
            this.$store.commit('SET_LANGUAR_TYPE', 'zh');
          break;

          case 'en':
            this.langType = 'en';
            this.$i18n.locale = 'en';
            this.langStr = 'English';
            localStorage.setItem('langType', 'en');
            this.$store.commit('SET_LANGUAR_TYPE', 'en');
          break;

          case 'login': //登录
          break;

          case 'graphic': // 图文详解
            this.activeIndex = key;
            let name = '';
            if(localStorage.getItem('langType') == 'zh'){
              // name = 'TronOscar-CN';
              window.open(this.pdfNameCn);
            }else if(localStorage.getItem('langType') == 'en'){
              // name = 'TronOscar-EN';
              window.open(this.pdfNameEn);
            }
            //window.open('https://www.oscar.pro/pdf?pdf='+name,'_blank');
            window.open('https://www.tronoscar.pro/pdf?pdf='+name,'_blank');
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

      showMenu() {
        this.isShowMenu = true;
      },

      closeMenu(){
        this.isShowMenu = false;
      },

      selClick(index) {
        this.selIndex = index;
        switch(index){
          case 1: //邀请奖励
          this.showRewardDialog = true;
          break;

          case 2: //分红
              this.showPayoutDialog = true;
              this.getPrizePotDepositTotalDeposit();
          break;

          case 3: //玩家介绍
            this.showPlayerDialog = true;
          break;

          case 4: //登录
            clickLogin = true;
            this.checkTronLinkToken();
          break;

          case 5:
            this.langType = 'zh';
            this.$i18n.locale = 'zh';
            this.langStr = '简体中文';
            localStorage.setItem('langType', 'zh');
          break;

          case 6:
            this.langType = 'en';
            this.$i18n.locale = 'en';
            this.langStr = 'English';
            localStorage.setItem('langType', 'en');
          break;

          default:
          break;
        }
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
              this.$store.commit('SET_NEW_BET_RECORD', parseInt(this.dataBetList[0].betId));
            }
          }
        })
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
            this.getMyBetList();
            this.initTrontData(this.tronwebObj.defaultAddress.base58);
          }else{
            this.$message({
              message: this.$t('betting.loginTronLink'),
              type: 'error'
            });
          }
        }else{
          this.showTronDialog = true;
        }
      },

      async initTrontData(_addr){
        // this.isVip = await utilsTron.checkOcnAddr(_addr);
        // if(this.isVip){
        //   this.$message({
        //     message: '欢迎ocn用户加入oscar生态，您将获得50%的挖矿加成。',
        //     type: 'success'
        //   });
        // }
        let mintLevelAndOverage = await utilsTron.getMintLevelAndOverage(); //挖矿阶段和当前阶段挖矿剩余量
        this.$store.commit('SET_MINT_RATE', mintLevelAndOverage.mintRate); //比例值
        this.$store.commit('SET_OVERAGE', mintLevelAndOverage.overage); //剩余量
        this.$store.commit('SET_MINT_LEVEL', mintLevelAndOverage.mintLevel); //阶段
        let odinFreeBalance = await utilsTron.getFreeBalanceOf(_addr); // 当前可质押ODIN余额
        this.$store.commit('SET_ODIN_FREE_BALANCE', odinFreeBalance);
        let maxDiceWagerPrice = await utilsTron.getDiceWager(); // 获取dice当前最大赌注金额
        //let maxRingWagerPrice = await utilsTron.getRingWager(); // 获取ring当前最大赌注金额
        //let maxTreeWagerPrice = await utilsTron.getTowerWager(); // 获取tree当前最大赌注金额
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
            // 3. 一切正常。
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

      changeLang(type){
        switch(type) {
          case 'en':
            this.langTypeChEn = 'zh';
            this.$i18n.locale = 'zh';
            this.langStr = '简体中文';
            localStorage.setItem('langType', 'zh');
            this.$store.commit('SET_LANGUAR_TYPE', 'zh');
          break;

          case 'zh':
            this.langTypeChEn = 'en';
            this.$i18n.locale = 'en';
            this.langStr = 'English';
            localStorage.setItem('langType', 'en');
            this.$store.commit('SET_LANGUAR_TYPE', 'en');
          break;

          default:
          break;
        }
      }
    },

  /*   sockets: {
      announce: function(res){
        if(res) {
          let result = JSON.parse(res);

          this.marqueeZhList = [];
          this.marqueeEnList = [];
          this.marqueeZhList.push(result.Msg_cn);
          this.marqueeEnList.push(result.Msg_en);
        }
      }
    } */
  }
</script>

<style lang="less" scoped>

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

  .app-header{
    position: relative;
    z-index: 99;
    //display: flex;
    box-sizing: border-box;
  }

  .header-box{
    width: 100%;
    height: 60px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    background: radial-gradient(#500c07 5%, #000 70%);

    .pc-device{
      width: 1200px;
      margin: auto;
      display: flex;
      flex-wrap: nowrap;

      .header-left{
        width: 40%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .header-logo{
          width: 100%;
          height: 37px;
          background: url(../../assets/images/logo.png) no-repeat;
          background-position: 0;
        }
      }

      .header-right{
        width: 60%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .menu{
          margin: 0;
          padding: 0;
          list-style: none;
          li{
            float: left;
            padding: 0 20px;
            cursor: pointer;
            background-image: -webkit-gradient(linear, left 0, right 0, from(#A78D65), to(#f7e9b3));
            -webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
            -webkit-text-fill-color: transparent; /*text-fill-color会覆盖color所定义的字体颜色： */
            height: 60px;
            line-height: 60px;
            font-weight: 600;
            font-size: 14px;
            .login{
              padding: 2px 20px;
              border-radius: 3px;
              -webkit-text-fill-color: #111111;
              background: linear-gradient(0deg,rgba(167,141,101,1),rgba(247,233,179,1));
            }
            span{
              color: #fff;
              padding: 2px 5px;
              border: 1px solid #d5c69b;
            }
            .active{
              background: #d5c69b;
              -webkit-text-fill-color: #111111;
            }
          }
          li:hover{
            opacity: .7;
          }
          .active{
            color: #AB9169;
          }
        }
      }
    }
  }

  .mobile-device{
    width: 100%;
    height: 60px;
    .menu-item{
      display: flex;
      align-items: center;
      background:#181845;
      justify-content: space-between;
      padding: 15px;
      box-sizing: border-box;

      .i-menu{
        flex: 1;
        color: #fff;
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
          color: #00E9E1;
          background: transparent;
          font-size: 12px;
          display: inline-block;
          height: 24px;
          text-align: center;
          line-height: 24px;
          padding: 0px 10px;
          margin-right: 8px;
          border: 1px solid #00E9E1;
        }

        .lang-logo{
          height: 23px;
          margin-left: 3px;
        }
      }
    }

    .tac{
      width: 100%;
      position: relative;
      .delete-icon{
        width: 20px;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
  }
</style>
