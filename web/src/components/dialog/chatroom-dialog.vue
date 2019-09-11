<template>
        <div class="tc">
            <img @click="closeDialog()"  class="del-icon" src="../../assets/img/delete.png" alt="">
            <div class='content-box'>
                <img style="vertical-align:middle;" width="20" src="../../assets/img/icon17.png" alt="">
                <span style="font-size:16px;color:#FFFFFF;">&nbsp;{{$t('betting.Chatroom')}}</span>
            </div>
            <div class='online-content'>
                <ul class="ulSty" style='margin:0;height: 432px;overflow-y:auto;padding: 10px 30px;' id='ulMessage'>
                    <li class='list-item' v-for='(item,index) in lookList' :key='index'>
                        <p class='item-title'><span>【LV.{{item.userLevel}}】</span><span>{{item.username | addFilter}}:</span></p>
                        <p style='padding-left:10px;'>{{item.message}}</p>
                    </li>
                </ul>
            </div>
            <div class="content-floor"> 
                <el-input  v-if="langularType == 'en'" @keyup.enter.native="send" :disabled="disabled" class="textarea" type="textarea" placeholder="Please enter the content" :autosize="{ minRows: 1, maxRows: 1}" v-model="textarea"></el-input>
                <el-input  v-if="langularType == 'zh'" @keyup.enter.native="send" :disabled="disabled" class="textarea" type="textarea" placeholder="请输入内容" :autosize="{ minRows: 1, maxRows: 1}" v-model="textarea"></el-input>
                <el-button style="margin-left:2px;background:#00E9E1;" @click="send" type="success">{{$t('betting.Send')}}</el-button>
            </div>
        </div>
</template>
<script>
import utilsTron from '@/utilsTron/index' 
import {getChatHistory} from '@/service/api'
export default {
    data() {
        return {
            disabled:false,
            textarea:'',
            lookList:[],
            userObj:{},
        }; 
    },
    mounted() {
      this.getChatHistoryInfo();
      //this.ifMassage();
    },

    computed:{
      'getToken':function(){
         return this.$store.getters.GET_TOKEN;
      },
     'tronwebObj': function() {
          return this.$store.getters.GET_RING_TRON_WEB;
      },
     'langularType': function(){
        return this.$store.getters.GET_LANGUAR_TYPE;
      }
    },

    created() {
        //this.checkChromPlug();
      
    },

    methods:{
        /** 关闭聊天窗口 */
      closeDialog() {
          this.$emit('closeContent');
      },
       /** 拿聊天历史信息 */
      getChatHistoryInfo(){
          getChatHistory().then(res => {
            this.lookList = res;
            this.scroll()
          });
      },
      /** 发送信息 */
      send(){
        let lv = this.userObj.userLevel;
        if(lv>=5){
            if(this.textarea.length>0){
                this.$socket.emit('newMsg',this.textarea);
                let obj = {
                    message:this.textarea,
                    username:this.getToken,
                    userLevel:lv
                }
                this.lookList.push(obj);
                this.textarea = ''
                this.scroll();
                
            }else{
                if(this.langularType == 'zh'){
                    this.$message("輸入的內容不能為空!")//
                }else if(this.langularType == 'en'){
                    this.$message("The input field cannot be empty!")//输入的内容不能为空
                }
            }
        }else{
            if(this.langularType == 'zh'){
                const h = this.$createElement;
                this.$message({
                    //showClose: true,
                    message: h('p',  { style: 'color: #181945' }, '僅當用戶等級超過5級（質押ODIN>=100）後方可發言聊天！ '),
                    duration: 800,
                    //type: 'warning'
                });
            }else if(this.langularType == 'en'){
                const h = this.$createElement;
                this.$message({
                    //showClose: true,
                    message: h('p',  { style: 'color: #181945' }, 'Reach Lv.5 (Frozen ODIN token >=100 ) to unlock the chat function.'),
                    duration: 800,
                    //type: 'warning'
                });
            }
           
        }

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
            let user =  JSON.parse(sessionStorage.getItem('userInfo'));
            if (user==''||user==null) {
                this.getInfo();
            }else if(this.getToken!=user.addr){
                this.getInfo()
            }else{
                this.$socket.emit('login',JSON.stringify({
                    msg:user.msg,
                    sign:user.sign,
                    addr:user.addr
                }))
            }
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

   scroll: function() {
        this.$nextTick(() => {
            //document.getElementById('ulMessage').scrollTop = document.getElementById('ulMessage').scrollHeight + 90;
            //alert($('#ulMessage')[0]);
            let hig = $('#ulMessage')[0].scrollHeight;
            $('#ulMessage').scrollTop(hig);
        });
    },

    },
    sockets: {
        connect: function () {
            console.log('chatroom-dialog socket connected22')
        },
        newMsg: function(msg){
            let obj = JSON.parse(msg);
            /* if(msg.keys(msg).length === 0){ 
                return false;
            } */
            //alert(1);
            this.lookList.push(obj);
            this.getChatHistoryInfo();
            
        },
        login: function(res){
            let massageObj = JSON.parse(res);
            for (var i in massageObj) { 
                this.userObj = massageObj;
                let lv = this.userObj.userLevel;
               /*  if(lv<5){
                    this.disabled = false;
                } */
            }
            //alert(2);
           return false 
          
        }
    },
    filters: {
        addFilter(vaule) {
            if (vaule == undefined) {
                return "";
            }
            if(vaule.length>12){
                return vaule.substr(0,5) + '...' + vaule.substr(vaule.length-5, vaule.length);
            }
        }
    },
}
</script>

<style lang='less'>
 
    .tc{
        z-index: 99;
        background-color: #000000d6;
        margin: 0 auto;
       /*  position: relative;
        width: 420px;
        height: 445px;
        margin: -334px 190px; */
        position: relative;
        width: 420px;
        height: 538px;
        margin: -490px 190px;
        .del-icon{
            position: absolute;
            top: -18px;
            right: -25px;
            width: 25px;
            cursor: pointer;
        }
        .content-box{
            width: 420px;
            height: 45px;
            background-color: #25256b;
            display: flex;
            justify-content: center;
            align-items: center;
        }
         .online-content{
            //background: #ccc;
            position: relative;
            z-index: 99999;
            height: 361px;
            .list-item{
                cursor: pointer;
                list-style:none;
                background:#25256b;
                color:#fff;
                padding: 2px 4px;
                border-radius: 8px;
                text-align: left;
                padding-left: 10px; 
                margin-bottom: 10px; 
                font-size: 11px; 
                .item-title{
                    color: #00E9E1;
                    font-size: 12px; 
                }
            }
        }
        .content-chantroom{
            /* width: 420px;
            height: 362px; */
            //overflow-y:scroll;   
            //visibility: visible; 
            .span{
                width: 336px;
                background-color: #262525;
                text-align: left;
                border-radius:10px;
                margin: 8px;
                .userInfo{
                    margin-left: 6px;
                    color: #297091;
                    font-size: 16px;
                    /* margin-top: 36px; */
                    padding: 8px;
                }
                .speak{
                    margin-left: 6px;
                    color: #FFFFFF;
                    font-size: 14px;
                    width: 320px;
                    /* padding: 10px 0px; */
                    padding-bottom: 10px;
                    margin-left: 22px;
                }
            }
        }
        .content-floor{
            width: 420px;
            margin-top: 92px;
            box-sizing: border-box;
            display: flex;
        }
    }
    .el-textarea__inner {
        height: 38px !important;
       //line-height: 1 !important;
       color: #b1b1b1 !important;
       font-size: 14px !important;
       background-color: #3f40408f !important;
       border: 1px solid #3f40408f !important;
   }
   .el-textarea {
        width: 80% !important;
   }
    .el-button {
        height:38px;
        font-size: 16px;
    }
    .el-button--success {
        background-color: #00E9E1 !important;
        border-color: #00E9E1 !important;
    }
    .ulSty::-webkit-scrollbar {
        width: 8px;
    }
    .ulSty::-webkit-scrollbar-track {
        background-color:#5f5757bd;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius:2em;
    }
    .ulSty::-webkit-scrollbar-thumb {
        background-color:#297092;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius:2em;
    }
    .el-message {
        left:32.8% !important;
        top:50% !important;
        background: #00E9E1 !important;
        color: #297092 !important;
        width: 90%;
        box-sizing: border-box;
    }

    .el-icon-info:before{
        color: #181945 !important;
    }
</style>
