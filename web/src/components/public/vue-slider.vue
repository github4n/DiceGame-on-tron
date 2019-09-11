<template>
 <div v-show="someList.length>0" style="width:100%;margin: 0px auto;height: 8px;">
      <slider ref="slider" :options="options">
          <slideritem v-for="(item,index) in someList" :key="index" :style="item.style"><img src="../../assets/imgs/gg.png"/>&nbsp;&nbsp;{{item.html}}</slideritem>
          <div slot="loading">loading...</div>
      </slider>
 </div>
</template>
<script>
import { slider, slideritem } from 'vue-concise-slider'
export default {
   name: 'vueSlider',
   components: {slider,slideritem},
   data () {
      return {
        someList:[
      /*      {
            html: '公告22224354325434354543543564565769879809653654324532522',
          },
          {
            html: '公告222222',
          },
          {
            html: '公告333333',
          } */
        ],
       options: {
          currentPage: 0,//当前页码
          //thresholdDistance: 50,//滑动判定距离
          thresholdTime: 5000,//滑动判定时间
          autoplay:3000,//自动滚动[ms]
          loop:true,//循环滚动
          direction:'horizontal',//方向设置，垂直滚动
          infinite:1,//无限滚动前后遍历数
          slidesToScroll:1,//每次滑动项数
          pagination: false,
          speed: 1500,
        }
      }
    },
    computed:{
      'langularType': function(){
        return this.$store.getters.GET_LANGUAR_TYPE;
      }
    },
    mounted(){
      this.checkChromPlug();
       //$('.left').animate({width:'toggle'},1250);
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
           // this.getInfo();
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
     /** 验证用户是否登录 */
      async getInfo(){
        utilsTron.setTronWeb(this.tronwebObj);
        let user = await utilsTron.sha3(this.getToken);
        let utilsInfo = await utilsTron.sign(user);
        this.$socket.emit('login',JSON.stringify({
            msg:user,
            sign:utilsInfo,
            addr:this.getToken
        }))
        //console.log("msg:",user,"sign:",utilsInfo,"addr:",this.getToken);
        let userInfo ={
            msg:user,
            sign:utilsInfo,
            addr:this.getToken
        }
        sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
      },
    },
    sockets: {
      connect: function () {
          console.log('socket connected22')
      },
      announce: function(msg){
        let massageObj = JSON.parse(msg);
        if(this.langularType=='zh'){
          let zhObj = { html: massageObj.Msg_cn }
           this.someList.push(zhObj);
        }else if(this.langularType=='en'){
          let enObj = { html: massageObj.Msg_en }
          this.someList.push(enObj);
        }
      },
    },
    
}
</script>
<style>
/* .slider-wrapper .slider-item {
    font-size: 14px !important;
    background: #141F27 !important;
    color: #f1de07;
} */
</style>
