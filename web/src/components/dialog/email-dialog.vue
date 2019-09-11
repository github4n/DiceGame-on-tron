<template>
<!-- 邮箱绑定 -->
<div class='email-dia'>
    <div class="email-box">
      <img @click="closeEmailDialog()" class="del-icon" src="../../assets/img/delete.png" alt="">
      <div class="email-con">
        <span class="email-span2">{{$t('email.theBinding')}}</span><!-- 绑定成功即赠送30+TRX -->
      </div>
      <div v-show="showEmailYZ" class="email-yx">
        <table>
          <tr>
            <td algin='right' class="emailSpan" width="240">{{$t('email.email')}}：</td>
            <td width="560"> 
              <el-input v-if="langularType == 'zh'" class="el-input" style="width:360px;" v-model="emailInput" placeholder="請輸入邮箱"></el-input>
              <el-input v-if="langularType == 'en'" class="el-input" style="width:360px;" v-model="emailInput" :placeholder="ts1"></el-input>
              <a class="butt" @click="sentEmailNum">{{$t('email.sendAuthCode')}}</a>
            </td>
          </tr>
          <tr>
            <td algin='right' class="emailSpan" width="240">{{$t('email.authCode')}}：</td>
            <td width="560" >
              <el-input v-if="langularType == 'zh'" class="el-input" style="width:360px;" v-model="inputYzm" placeholder="請輸入验证碼"></el-input>
              <el-input v-if="langularType == 'en'" class="el-input" style="width:360px;" v-model="inputYzm" :placeholder="ts2"></el-input>
              <a class="butt" @click="validateEmail">{{$t('email.validation')}}</a>
            </td>
          </tr>
        </table>
      </div>
      <div style="margin: 60px auto;" v-show="showYz" class='email-yx'>
        <table>
          <tr>
            <td algin='right' class="emailSpan" width="240">{{$t('email.email')}}：</td>
            <td width="560"> 
              <el-input :disabled='disabled' class="el-inputDis" style="width:360px;" v-model="emailInput" ></el-input>
              <a class="butt" >{{$t('email.successEmail')}}</a>
            </td>
          </tr>
        </table>
      </div>
      <div v-show="getAdd" class="email-url">
       <a class="email-a" href="https://t.me/tronoscar">
         <img style="vertical-align:middle;" src="../../assets/img/icon1.png"/>&nbsp;
         {{$t('email.addGroup')}}
       </a>
      </div> 
    </div>

  </div>
</template>

<script>
import { bindEmail , validateEmail , getUserEmailInfo} from '@/service/api';

  export default {
    name: 'emailDialog',

    data(){
      return {
        emailInput:'',
        inputYzm:'',
        getAdd:false,
        ts1:this.$t('betting.PromptBox'),
        ts2:this.$t('betting.PromptBox'),
        showEmailYZ:true,
        emailInput:'',
        showYz:false,
        disabled:true
      }
    },

    computed:{
      'getToken':function(){
         return this.$store.getters.GET_TOKEN;
      },
      'langularType': function(){
        return this.$store.getters.GET_LANGUAR_TYPE;
      }
    },

    mounted(){
      this.getUserEmailInfo();
    },

    methods: {
      /* 判断是否绑定了邮箱接口 shif 6-4 */
      getUserEmailInfo(){
        let params = {'Addr': this.getToken};
        getUserEmailInfo(params).then(res =>{
          // console.log("res1111111:----->",res);
          // res = {"isBind":true,"email":"Snapdaddyk4f@gmail.com"}
          let result = res;
          this.emailInput = result.email;
          // debugger
          if(result.isBind){//true
            // debugger
            this.showEmailYZ = false;
            this.getAdd = true;
            this.showYz = true;
          }else{//false
            this.showEmailYZ = true;
            this.getAdd = false;
            this.showYz = false;
            // debugger

          }
        })
      },
      /** 关闭窗口 */
      closeEmailDialog() {
        this.$emit('closeEmailContent');
      },
      validateEmail(){//{"success":false,"data":"Wrong Code"}
        if(this.inputYzm!=''){
        let params = {'Addr': this.getToken,'Code':this.inputYzm};
        validateEmail(params).then(res =>{
           let isSuccess = res.success
           let tit = res.data
           if(isSuccess){
             this.getAdd = true;
             this.$message({
                  showClose: true,
                  message: tit, //'验证成功 '
                  type: 'warning'
              });
           }else{
              this.$message({
                  showClose: true,
                  message: res.data,//'验证失败 ',
                  type: 'warning'
              });
           }
         })
        }else{
          this.$message({
              message: this.$t('betting.input'),//'輸入的內容不能為空!',//this.$t('betting.toopTitle'),
              type: 'error'
          });
          return;
        }
      },
    sentEmailNum(){
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!this.emailInput) {
        this.$message({
            message: this.$t('betting.input'),//'輸入的內容不能為空!',//this.$t('betting.toopTitle'),
            type: 'error'
          });
        return;
      }
        if (mailReg.test(this.emailInput)) {
            let params = {'Addr': this.getToken,'Email':this.emailInput};
            bindEmail(params).then(res =>{
              // console.log("email:------->",res);
              let success = res.success
              if(success){
                this.$message({
                    showClose: true,
                    message: this.$t('betting.sendSuccess'),//'发送成功 ',
                    type: 'warning'
                });
              }else{ 
                this.$message({
                    showClose: true,
                    message: this.$t('betting.sendBad'),//'发送失败 ',
                    type: 'warning'
                });
              }
            })
        }else{
          this.$message({
            message: this.$t('betting.inputEmail'),//'请输入正确的邮箱格式',//this.$t('betting.toopTitle'),
            type: 'error'
          });
          return;
        }
        // }, 100)
      }

    }
  }
</script>

<style lang="less">
.email-dia{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 99;
  background-color: rgba(0,0,0,.77);
  .email-box{
    width: 850px;
    height: 400px;
    margin: 56px auto;
    background: #181845; /* url(../../assets/imgs/email.png) no-repeat; */
    border: 2px solid #00E9E1;
    border-radius: 20px;
    .del-icon{
      position: absolute;
      top: 82px;
      right: 365px;
      width: 46px;
      cursor: pointer;
    }
    .email-con{
      margin:32px auto;
      .email-span2{
        color:#fff;
        font-size:26px;
        font-family:'PingFangSC-Semibold';
      }
    } 
    .email-yx{
      width:850px;
      margin:0 auto;
      line-height: 95px;
      .emailSpan{
        color:#fff;
        font-size:24px;
        text-align: right;
        font-family:'PingFangSC-Semibold';
      }
      .butt{
        width: 125px;
        cursor: pointer;
        color: #181845;
        font-size: 24px;
        text-align: center;
        padding: 8px 16px;
        border-radius: 5px;
        line-height: 28px;
        background: #00E9E1;
        display: inline-block;
        font-family:'PingFangSC-Semibold';
      }
    /*   .buttSucc{

      } */
    }
    .email-url{
      width:850px;
      line-height: 44px;
      margin:0 auto;
      .email-a {
        cursor: pointer;
        font-size: 20px;
        color: #68e5df;
        text-decoration:none;
        font-family:'PingFangSC-Semibold';
      }
      .email-a:hover {
        color:#fff; 
         font-size: 20px;
        text-decoration:none;
        font-family:'PingFangSC-Semibold';
      }
    }

  }
}
.el-input .el-input__inner{
  width:340px;
  height:58px;
  color:#68e5df;
  border-radius: 10px;
  font-size: 18px;
  background-color: transparent;
  font-family:'PingFangSC-Semibold';
  // border-radius: 4px 0px 0px 4px;
}
.el-inputDis.is-disabled .el-input__inner {
  background-color: transparent !important;
  color:#68e5df !important;
  padding: 0 20px;
  border-radius: 10px;
  font-size: 18px;
}
</style>
