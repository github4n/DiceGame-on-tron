<template>
  <div class='chatroom-box'>
    <!--audio id="eventAudio" autoplay loop="true" preload="auto"></audio-->
    <div class='chatroom-content'>
      <div class='list-item first-item' :class="{'current': selIndex == 1}" @click='complete(1)'>
        <router-link :to="{ path: '/',query:{from:fromAdd} }" style='text-decoration: none;'>
          <div class='list-picture'>
              <img class='picture' src="../../assets/img/icon13.png">
          </div>
          <p class='list-title'>Home</p>
        </router-link>
      </div>

      <div class='list-item game-item' :class="{'current': selIndex == 2}" @click='complete(2)'>
          <div class='list-picture'>
              <img class='picture' src="../../assets/img/icon14.png">
          </div>
          <p class='list-title'>Games</p>
      </div>

      <div class='list-item' :class="{'current': selIndex == 3}" @click='complete(3)'>
        <div class='list-picture'>
            <img class='picture' src="../../assets/img/icon17.png">
        </div>
        <p class='list-title'>Chatroom</p>
      </div>

      <div class='list-item' :class="{'current': selIndex == 4}" @click='complete(4)'>
        <router-link :to="{ path: '/reward',query:{from:fromAdd} }" style='text-decoration: none;'>
          <div class='list-picture'>
              <img class='picture' src="../../assets/img/icon18.png">
          </div>
          <p class='list-title'>Referral</p>
        </router-link> 
      </div>

      <div class='list-item last-item' :class="{'current': selIndex == 5}" @click='complete(5)'>
        <router-link :to="{ path: '/email',query:{from:fromAdd} }" style='text-decoration: none;'>
          <div class='list-picture'>
              <img class='picture' src="../../assets/img/icon19.png">
          </div>
          <p class='list-title'>Mailbox</p>
        </router-link> 
      </div>
    </div>
    <div class='games-style' v-show='gamesShow'>
      <div class='games-item' :class="{'current1': selIndex1 == 1}" @click='complete1(1)'>
        <router-link :to="{ path: '/dice',query:{from:fromAdd} }" style='text-decoration: none;'>
          <div class='list-picture'>
              <img class='picture' src="../../assets/img/icon15.png">
              <p class='list-title'>{{$t('betting.Dice')}}</p>
          </div>
        </router-link>
      </div>
    
      <div class='games-item' :class="{'current1': selIndex1 == 2}" @click='complete1(2)'>
        <router-link :to="{ path: '/ring',query:{from:fromAdd} }" style='text-decoration: none;'>
          <div class='list-picture'>
              <img class='picture' src="../../assets/img/icon16.png">
              <p class='list-title'>{{$t('betting.RotaryTable')}}</p>
          </div>
        </router-link>
      </div>
    </div>
    <div style="width:100%;padding:2px 0;">
      <div v-show="langularType == 'zh'" style='height: 44px;background:#00E9E1;color:#181945;width:100%;display:flex; justify-content: left;align-items: left;'>
        <img style='width: 24px;position: relative;margin-top: 8px;height: 24px;' src="@/assets/imge/notice.png" alt="">
        <div > 
          <span style="font-size: 10px;" v-for="(item,index) in marqueeZhList" :key="index">{{item}}</span>
        <!--   <slider v-if="langularType == 'zh'" class="slider"  ref="slider" :options="options">
            <slideritem  v-for="(item,index) in marqueeZhList" :key="index">{{item}}</slideritem>
          </slider> -->
        </div>
      </div>
      <div v-show="langularType == 'en'" style='height: 50px;background:#00E9E1;color:#181945;width:100%;display:flex; justify-content: left;align-items: left;'> 
        <img style='width: 24px;position: relative;margin-top: 12px;height: 24px;' src="@/assets/imge/notice.png" alt="">
        <span style="font-size: 10px;margin-top: 5px;" v-for="(itemAdd,index) in marqueeEnList" :key="index">{{itemAdd}}</span>
        <!-- <slider v-if="langularType == 'en'" class="slider" ref="slider" :options="options">
          <slideritem v-for="(itemAdd,index) in marqueeEnList" :key="index">{{itemAdd}}</slideritem>
        </slider> -->
      </div>
    </div>
    <app-chatroom-dialog v-show='isChatroomDialog' ref="ChatroomDialog" @closeContent='closeContent'></app-chatroom-dialog >
  </div>
</template>

<script>
import appChatroomDialog from '../../components/dialog/app-chatroom-dialog'
//import bgMusic from '@/assets/sound/bg.mp3'
  import { slider, slideritem } from 'vue-concise-slider'

export default {
  components :{ slider , slideritem , appChatroomDialog },
  
  data(){
    return {
     
      baseStepUrl: 'https://www.tronoscar.pro/dice/',
      diceLink: 'https://www.tronoscar.pro/dice/', // dice游戏地址
      ringLink: 'https://www.tronoscar.pro/ring/', // 轮盘游戏地址
      treeLink: 'https://www.tronoscar.pro/tree/', // 铁塔游戏地址

      isChatroomDialog: false,

      selIndex: 1,
      selIndex1: 1,
      gamesShow: false,
      marqueeZhList:  ['2019年6月10日，TronOscar將於24點整（UTC+8）起暫停遊戲業務。待合約更新完畢，將另行通知。'],
      marqueeEnList: ['On 10th June, 2019, all games will be temporarily shut down from 12:00 (UTC-4). Further announcement will be released once the smart contracts update is completed.'],
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

      fromAdd:'',
      
    }
  },
  created() {
      this.checkChromPlug();
    },
  mounted(){
    this.initStepUrl();
    
    function checkIE(){
      return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style
    }
    if (checkIE()) {
      window.addReferralListener('hashchange', () => {
        let currentPath = window.location.hash.slice(1);
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath)
        }
      }, false)
    }

    //window.onload = this.playBGMusic
  },
  computed:{
    'langularType': function(){
        return this.$store.getters.GET_LANGUAR_TYPE;
      }
  },
  sockets: {
      connect: function () {
          console.log("app:========>",'socket connected22')
      },

      announce: function(res){
        if(res) {
          debugger
          let result = JSON.parse(res);
          this.marqueeZhList = [];
          this.marqueeEnList = [];
          this.marqueeZhList.push(result.Msg_cn);
          this.marqueeEnList.push(result.Msg_en);
        }
      }
    },
  methods:{
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
    playBGMusic(){
      let bgAudio = document.getElementById('eventAudio');
      bgAudio.setAttribute('src', bgMusic);
      bgAudio.load();

      setInterval(function () {
        if (bgAudio.paused){
          bgAudio.play();
        }
      }, 3000);
    },


    
    complete(index){
        this.selIndex = index;
        if(this.selIndex == '1'){
            this.isChatroomDialog = false;
            this.gamesShow = false;
            this.selIndex1 = 1;
        }else if(this.selIndex == '2'){
            this.isChatroomDialog = false;
            this.gamesShow = true;
            //this.playBGMusic();
            this.selIndex1 = 1;
        }else if(this.selIndex == '3'){
            this.isChatroomDialog = true;
            this.messageContents = '';
            this.gamesShow = false;
            this.selIndex1 = 1;

            this.$refs.ChatroomDialog.checkChromPlug();
            this.$refs.ChatroomDialog.getChatHistoryInfo();
        }else if(this.selIndex == '4'){
            this.isChatroomDialog = false;
            this.gamesShow = false;
            this.selIndex1 = 1;
        }else if(this.selIndex == '5'){
            this.isEmailDialog = true;
            this.isChatroomDialog = false;
            this.gamesShow = false;
            this.selIndex1 = 1;
        }
    },

    complete1(index){
        this.selIndex1 = index;
    },


   

     //弹框关闭方法
    closeContent(){
        this.isChatroomDialog = false;
        this.isChatroom = true;
    },


    initStepUrl() {
      this.fromAdd = this.$route.query.from;
      if(this.fromAdd) {
        this.diceLink = this.diceLink + '?from=' + this.fromAdd;
        this.ringLink = this.ringLink + '?from=' + this.fromAdd;
        this.treeLink = this.treeLink + '?from=' + this.fromAdd;
      }
    },

  }
}
</script>

<style lang='less' scoped>
  .chatroom-box{
    width: 100%;
    position: relative;
    top: 5px;
    .chatroom-content{
      width: 100%;
      display: flex;
      box-sizing: border-box;
        .list-item{
          flex: 1;
          padding: 10px 0px 0px;
          border-right: 1px solid #00E9E1; 
          border-bottom: 1px solid #00E9E1; 
          border-top: 1px solid #00E9E1; 
          background: #13133C;
          box-sizing: border-box;
          .list-picture{
            .picture{
              height: 26px;
            }
          }
          .list-title{
            font-size: 12px;
            font-weight: 700;
            color: #fff;
            text-align: center;
          }
        }

        .current{
            background: #00E9E1;
        }
        
        .first-item{
            border-top: 1px solid #00E9E1;
        }

        .game-item{
          border-bottom: 1px solid #00E9E1;
        }

        .last-item{
          border-right: 0px solid #00E9E1;
        }
    }

    .games-style{
      display: flex;
      width: 100%;
      .games-item{
        flex: 1;
        background: #666;
        .list-picture{
          display: flex;
          justify-content: center;
          align-items: center;
          .picture{
            height: 26px;
          }
          .list-title{
            font-size: 12px;
            font-weight: 700;
            color: #fff;
            text-align: center;
            margin-left: 10px; 
          }
        }
        
      }
      .current1{
          background: #343458;
      }
      .slider .slider-wrapper .slider-item{
          width:100% !important;
          font-size: 12px !important;
      }
    }
  }
</style>
