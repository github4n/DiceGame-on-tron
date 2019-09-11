<template>
  <div class='invit-box'>
    <div class="inviter-bg">
      <div class="copeUrl">
        <span id='inviteCode' v-if="langularType == 'zh'" class='copyText1'>{{urlCopy}}</span> 
        <span id='inviteCode' v-if="langularType == 'en'" style="font-size:14px;" class='copyText1'>{{urlCopy}}</span>
      </div>
      <div class="copeButton"> 
         <a  v-if="isPcDeviceType" class="cope-butt" @click="copyNum" >{{$t('betting.copy')}}</a>
      </div>
      <div class="copeButton"> 
         <a v-if="!isPcDeviceType" class="cope-butt" @click="copyNumThpto" >{{$t('betting.copy')}} </a>
         <span v-show="showTit">{{$t('betting.successTit')}}</span>
      </div>
         <p class="p-toop">{{$t('betting.inviterToop')}}</p>
    </div> 
    <!-- <div class="inviter-bg2">
      <div class="copeUrl2">
        <span class='copyText2'>https://4bb82e.axshare.com/#G=P=%E9%82%80%E8%</span>
        <div class="inviter-zz" style="width:716px; height:71px;background:#2c3e50;margin: 0 32px;margin-top: -105px;"></div>
      </div>
      <div class="copeButton2">
         <a class="cope-butt2">{{$t('inviterPage.cope')}}</a>
         <p style="color:#fff;font-size:16px;">35000TRX{{$t('inviterPage.areUnlocked')}}</p>
      </div>
    </div> -->
    <div class="table-ph">
      <span v-if="langularType == 'zh'" class="table-title">{{$t('inviterPage.bonusPools')}}</span>
      <span v-if="langularType == 'en'" class="table-title">{{$t('inviterPage.bonusPools')}}</span>
      <div class="tab-content">
        <table style="width:100%">
          <tr>
            <td>{{$t('inviterPage.address')}}</td>
            <td>{{$t('inviterPage.rangkingTit')}}</td>
            <td>{{$t('inviterPage.subscriptionScore')}}</td>
            <td>{{$t('inviterPage.activeNumberScore')}}</td>
            <td>{{$t('inviterPage.award')}}</td>
          </tr>
          <tr v-for="(item,index) in tableData" v-bind:key="index">
            <td v-if="index == 0" style="color: #FFC41F">{{item.addr | addFilter}}</td>
            <td v-if="index == 1" style="color: #BDBDBD">{{item.addr | addFilter}}</td>
            <td v-if="index == 2" style="color: #66553C">{{item.addr | addFilter}}</td>
            <td v-if="index!=0 && index!=1 && index!=2">{{item.addr | addFilter}}</td>

            <td v-if="index == 0"><img src='@/assets/img/icon24.png'/></td>
            <td v-if="index == 1"><img src='@/assets/img/icon25.png'/></td>
            <td v-if="index == 2"><img src='@/assets/img/icon26.png'/></td>
            <td v-if="index!=0 && index!=1 && index!=2">{{index + 1}}</td>

            <td v-if="index == 0" style="color: #FFC41F">{{item.amtBet}}</td>
            <td v-if="index == 1" style="color: #BDBDBD">{{item.amtBet}}</td>
            <td v-if="index == 2" style="color: #66553C">{{item.amtBet}}</td>
            <td v-if="index!=0 && index!=1 && index!=2">{{item.amtBet}}</td>

            <td v-if="index == 0" style="color: #FFC41F">{{item.amtUser}}</td>
            <td v-if="index == 1" style="color: #BDBDBD">{{item.amtUser}}</td>
            <td v-if="index == 2" style="color: #66553C">{{item.amtUser}}</td>
            <td v-if="index!=0 && index!=1 && index!=2">{{item.amtUser}}</td>

            <td v-if="index == 0" style="color: #FFC41F">{{item.prize | priceFormat}}</td>
            <td v-if="index == 1" style="color: #BDBDBD">{{item.prize | priceFormat}}</td>
            <td v-if="index == 2" style="color: #66553C">{{item.prize | priceFormat}}</td>
            <td v-if="index!=0 && index!=1 && index!=2">{{item.prize | priceFormat}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { getInviteTopYqr } from '@/service/api';

export default {
  data(){
    return {
      urlCopy:'',
      urlInvite:'',
      showTit:false,
      tableData:[
        {addr:'dfgdsgsfdgfds',amtBet:'67576',amtUser:'tfytfdyt',prize:'657656'}
      ],
      isPcDeviceType: this.$isPcDeviceType,
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
        },

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
    },
   computed:{
    'langularType': function(){
      return this.$store.getters.GET_LANGUAR_TYPE;
    },
    'getToken':function(){
         return this.$store.getters.GET_TOKEN;
      },
   },
    mounted(){
      this.getInviteTopYqr();
      let url = "https://www.tronoscar.pro/?from="
      let fristStr = this.getToken.substring(0,3);
      let lostStr = this.getToken.substring(this.getToken.length-3);
      this.urlInvite = url + this.getToken
      this.urlCopy = url + fristStr +'...'+ lostStr
      // console.log("urlCopy:=======>",this.urlCopy);
      this.getInviteTopYqr();
    },
    methods:{
      copyNum() {  
        let _this = this;
        // var Url2 = document.getElementById("inviteCode").innerText;
        var oInput = document.createElement("input");
        oInput.value = this.urlInvite;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = "oInput";
        oInput.style.display = "none";
        // if(_this.langularType=='en'){
          _this.$message({
            showClose: true,
            message: this.$t('betting.successTit'),
            type: 'warning'
          });
        // }else if(_this.langularType=='zh'){
        //   _this.$message({
        //     showClose: true,
        //     message:'成功',//'发送成功 ',
        //     type: 'warning'
        //   });
        // }
      },
      copyNumThpto(){
        let _this = this;
        // var Url2 = document.getElementById("inviteCode").innerText;
        var oInput = document.createElement("input");
        oInput.value = this.urlInvite;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = "oInput";
        oInput.style.display = "none";
        // debugger
        this.showTit = true
      },

      getInviteTopYqr(){
          getInviteTopYqr().then(res =>{
            this.tableData = res
                  
          });
      },
    }

}
</script>

<style lang='less' scoped>
.invit-box{
  width: 100%;
  .inviter-bg{
    width: 70%;
    margin: 0 auto;
    .copeUrl{
      width: 85%;
      padding: 20px;
      background: url(../../assets/img/border2.png) no-repeat;
      background-size: 100% 100%; 
      margin: 0 auto;
      .copyText1{
        color: #fff;
        font-size:20px;
      }
    }
    .copeButton{
      width: 85%;
      padding: 30px 0px 0px;
      margin: 0 auto;
      box-sizing: border-box;
      height: 100%;
      .cope-butt{
        margin: 0 auto;
        width: 163px;
        display: block;
        background: #00E9E1;
        color: #181845;
        font-size: 16px;
        //border: 1px solid #fff;
        text-align: center;
        padding: 6px 28px;
        border-radius: 20px;
        box-sizing: border-box;
        cursor: pointer;
       }
    }
    .p-toop{
      font-size:16px;
      color:red;
    }
  }
  .inviter-bg2{
    width: 800px;
    height: 222px;
    margin: 30px auto;
    background: url(../../assets/imgs/small_bg-yqr2.png) no-repeat;
    .copeUrl2{
      width: 768px;
      height: 142px;
      line-height: 142px;
      .copyText{
        color:#FF353F46;
        font-size:20px;
      }
    }
    .copeButton2{
      margin: 0 auto;
       .cope-butt2{
        background: #fff;
        color: #000;
        font-size: 16px;
        border: 1px solid #fff;
        text-align: center;
        padding: 6px 28px;
        border-radius: 20px;
        height: 20px;
        line-height: 20px;
       }
    }
  }
  .table-ph{
    width: 900px;
    height: 360px;
    margin: 50px auto;
    background: url(../../assets/img/border3.png) no-repeat;
    background-size: 100% 100%; 
    .table-title{
      color:#fff;
      font-size:20px;
      background: url(../../assets/img/border4.png) no-repeat;
      background-size: 100% 100%; 
      padding: 20px;
      position: relative;
      top: -5px;
    }
    .tab-content{
      width: 810px;
      margin: 0 auto;
      margin-top: 20px;
      table td{
        color:#fff;
        line-height: 40px;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .invit-box{
    width: 100%;
    box-sizing: border-box;
    .inviter-bg{
      width: 100%;
      .copeUrl{
        width: 95%;
        padding: 10px;
        background: url(../../assets/img/border2.png) no-repeat;
        background-size: 100% 100%; 
        margin: 0 auto;
        box-sizing: border-box;
        .copyText1{
          color: #fff;
          font-size:12px;
        }
      }
      .copeButton{
        margin: 0 auto;
        width: 85%;
        padding: 30px 0px 0px;
        margin: 0 auto;
        box-sizing: border-box;
        height: 100%;
        .cope-butt{
          margin: 0 auto;
          width: 90px;
          display: block;
          background: #00E9E1;
          color: #181845;
          font-size: 14px;
          text-align: center;
          padding: 6px 27px;
          border-radius: 20px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          cursor: pointer;
        }
      }
      .p-toop{
        font-size:12px;
        color:red;
      }
    }
    .inviter-bg2{
      width: 100%;
      background: url(../../assets/imgs/small_bg-yqr2.png) no-repeat;
      background-size: 100% 100%;
      .copeUrl2{
        width: 100%;
        .copyText2{
          color:#FF353F46;
          font-size:13px;
        }
      }
    }
     .table-ph{
      width: 100%;
      //height: 360px;
      margin: 50px auto;
      background: url(../../assets/img/border3.png) no-repeat;
      background-size: 100% 100%; 
      .table-title{
        color:#fff;
        font-size:14px;
        background: url(../../assets/img/border4.png) no-repeat;
        background-size: 100% 100%; 
        padding: 10px;
        position: relative;
        top: -5px;
      }
      .tab-content{
        width: 92%;
        margin: 0 auto;
        margin-top: 20px;
        table td{
          color:#fff;
          line-height: 40px;
          font-size: 10px;
        }
      }
    }
  }
}
</style>
