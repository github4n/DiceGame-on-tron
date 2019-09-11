<template>
  <div class='my-rules'>
    <a name="buyTicket"></a>
   <div class="rule">
     <div style="padding: 0 19px;">
     <span v-if="langularType == 'en'" style="font-size:32px;color:#fff;">{{$t('betting.Tickets')}}</span>
     <span v-if="langularType == 'zh'"  style="font-size:58px;color:#fff;">{{$t('betting.Tickets')}}</span>
     </div>
   </div>
   <div class="line-rules" >
     <div style="height:100px;line-height: 100px;">
        <el-input @keyup.native="number" v-if="langularType == 'zh'" @input="changeInput()" class="rule-input" style="width:240px;margin-left:-330px"  placeholder="请输入想要购买的奖券数" v-model="search" clearable></el-input>&nbsp;
        <el-input @keyup.native="number" v-if="langularType == 'en'" @input="changeInput()" class="rule-input" style="width:240px;margin-left:-330px"  placeholder="Please enter the amount" v-model="search" clearable></el-input>&nbsp;
        <div style="width: 24px;height: 67px;margin-left: 390px;margin-top: -88px;">
          <span style="font-size:60px;color:#039074;">*</span>
        </div>
        <div style="width:162px;height: 50px;margin-left: 498px;margin-top: -81px;">
          <span v-if="changeValue=='TRX'" style="font-size:44px;color:#039074;margin-top: -28px;">{{num}}TRX</span>
        </div>
        <div style="width:162px;height: 50px;margin-left: 446px;margin-top: -50px;">
          <span v-if="changeValue=='ODIN'"  style="font-size:44px;color:#039074;margin-top: -28px;">{{odinNum}}ODIN</span>
        </div>
     </div>
    <img src="../../assets/imgs/line-rules.png" /><br/>

    <div style="width:650px; line-height: 40px;margin-right:20px;margin-left:10px;">
      <div style="float:left;margin-left:49px;">
        <el-select class="selectStyRing" v-model="changeValue" @change='changeIndex(changeValue)'>
          <el-option  v-for="(item,index) in changeList" :key="index" :value="item.name">{{item.name}}</el-option>
        </el-select>
      </div>
      <div style="float:right">
        <span style="font-size:18px;color:#038F73;">{{$t('betting.TheTotal')}}：{{total}}{{changeValue}}</span>
        <br/>
        <el-button style="margin-left: 42px;cursor: pointer;" @click="content()" type="primary" round>{{$t('betting.Confirm')}}</el-button>
      </div>
    </div>
    
   </div>
  </div>
</template>

<script>
import { getLotteryTicketInfo} from '@/service/api';
import utilsTron from '@/utilsTron';
export default {
  data(){ 
    return {
      changeValue:'TRX',
      changeList:[
        {name:'TRX',id: 1},
        {name:'ODIN',id: 2},
      ],
      search:'',
      num:0,
      odinNum:0,
      total:0,
    }
  },
  mounted(){
    this.getNum();
  },
  watch:{
    'search': function (curVal, oldVal) {
        if (!curVal) {
            this.pureNumber = '';
            return false
        }
        // 实时把非数字的输入过滤掉
        this.pureNumber = curVal.match(/\d/ig) ? curVal.match(/\d/ig).join('') : ''
    }
  },
  computed:{
    'langularType': function(){
      return this.$store.getters.GET_LANGUAR_TYPE;
    },
    'trxFreeBalance': function() {
        if(this.$store.getters.GET_TRX_FREE_BALANCE > 0){
        this.isDisabled = false;
        return this.$store.getters.GET_TRX_FREE_BALANCE.toFixed(0);
        }
    },
    /* 当前可质押ODIN余额 */
    'odinFreeBalance': function() {
      return this.$store.getters.GET_ODIN_FREE_BALANCE;
    },
  },
  methods:{
    changeIndex(type){
      let num = parseInt(this.search);
      if(type=='ODIN'){
        if(num !== num){
          this.total = 0;
        }else{
          this.total = num * this.odinNum 
        }
      }else if(type=='TRX'){
        if(num !== num){
          this.total = 0;
        }else{
          this.total = num * this.num 
        }
      }
    },
    number(){
      this.search=this.search.replace(/\D/g,'')
    },
    getNum(){ 
      /*getLotteryTicketInfo().then(res =>{
        this.num = parseInt(res.ticketPrice);
        this.odinNum = parseInt(res.ticketPriceODIN);
      });*/
    },
    changeInput(){
      let num = parseInt(this.search);
      if(this.changeValue=='ODIN'){
        if(num !== num){
          this.total = 0;
        }else{
          this.total = num * this.odinNum 
        }
      }else if(this.changeValue=='TRX'){
        if(num !== num){
          this.total = 0;
        }else{
          this.total = num * this.num 
        }
      }
    },
    content(){
      //debugger
      if(this.search>0){
        if(this.changeValue=='ODIN'){
          if(this.total <= this.odinFreeBalance){
            let t = this.total * Math.pow(10,6);
            utilsTron.approveBuyTicket(t).then(()=>
              utilsTron.buyTicketWithOCT(t) 
            )
          }else{
            this.$message({
              message: this.$t('betting.toopTitle'),
              type: 'error'
            });
          }
        }else if(this.changeValue=='TRX'){
          if(this.total <= this.trxFreeBalance){
            let t = this.total * Math.pow(10,6);
            utilsTron.buyTicket(t) 
          }else{
            this.$message({
              message: this.$t('betting.toopTitle'),
              type: 'error'
            });
          }
        }
      }else{
        this.$message({
          message: this.$t('betting.PleaseEnter'),
          type: 'error'
        });
      }
    }
  }
}
</script>

<style lang='less' >
.my-rules{
  background: url(../../assets/imgs/buy-rule.png) no-repeat;
  background-size: 100% 100%;
  height: 217px;
  width: 920px;
  margin: 20px auto;
  .rule{
    width:240px;
    float:left;
    margin-right:-6px;
    line-height: 210px;
  }
  .line-rules{
    float:left;
    width:680px;
    /* height: 217px; */
    vertical-align:middle; //垂直居中
    text-align:center; //水平居中
    img {
        width: 606px;
        height: 1px;
    }
  }
}
.rule-input .el-input__inner{
  height: 40px;
  background-color: rgb(39, 160, 136) !important;
  border: 1px solid rgb(39, 160, 136) !important;
  color:#ffffff;
}
 .el-button--primary {
  background-color: #039074 !important;
  border-color: #039074 !important;
}


  .selectStyRing{
    margin-top: 10px;
    width:240px;
  }
 .selectStyRing.el-select-dropdown.el-popper{
    border: none;
  }

  .selectStyRing .el-scrollbar__wrap{
    overflow: hidden !important;
    background: #229d85;
  }

  .selectStyRing.el-select-dropdown__item.selected{
    background: #229d85 !important;
    color: #fff !important;
  }

  .selectStyRing.el-select-dropdown__item:hover{
    background: #bec3ca7d !important;
    color: #fff !important;
  }

  .selectStyRing.el-select-dropdown__item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    color: #fff;
  }

  .selectStyRing .el-select-dropdown{
    border: 0px solid #229d85;
  }

  .selectStyRing.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background: #229d85;
    color: #fff;
  }
  .selectStyRing .el-input__inner {
    background-color: #27a088;
    border: 1px solid #27a088;
    color: #fff;
  }
  .selectStyRing.el-select .el-input .el-select__caret {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }
</style>
