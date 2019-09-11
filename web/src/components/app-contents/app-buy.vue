<template>
  <div class='buy-box'>
    <a name="buy"></a>
    <div class='buy-title'>{{$t('betting.Buy')}}</div>
    <div class='buy-coupons'>
      <div class='conpons'>{{$t('betting.Tickets')}}</div>
      <div class='buy-msg'>
        <div class='msg1'>
          <el-input class='msg1-inp' @input='changeNum()' type='number' v-model.number="inputVuale" :placeholder="placeholder"></el-input>
          <div class='num'><span class='cheng' style='font-size:30px;height:34px;line-height:46px;margin-right:6px;'>*</span>
          <span v-if="changeValue=='TRX'" class='number-trx'>{{ticketPrice}}TRX</span>
          <span v-if="changeValue=='ODIN'" class='number-trx'>{{ticketPriceODIN}}ODIN</span>
          </div>
        </div>
        <img class='xuxian' src="../../assets/imgs/xuxian.png" alt="">
        <div class='msg2'>
          <div class='msg2-info'>
            <div class="info1">
              <el-select class="AppselectSty" v-model="changeValue" @change='changeIndex(changeValue)'>
                <el-option  v-for="(item,index) in changeList" :key="index" :value="item.name">{{item.name}}</el-option>
              </el-select>
            </div>
            <div class="info2">
              {{$t('betting.TheTotal')}}：{{totalTicketPrice}}{{changeValue}}<br/>
              <button class='btn' @click='ConfirmBuy()'>{{$t('betting.Confirm')}}</button>
            </div>
          </div>
          <!-- <div class='msg2-btn'>
          </div> -->
        </div>
      </div>
    </div>
    <p style='color:yellow;' v-show='isShow'>{{$t('betting.toopTitle')}}</p>
    <p style='color:yellow;' v-show='isShow1'>{{$t('betting.PleaseEnter')}}</p>
  </div>
</template>

<script>
import { getLotteryTicketInfo} from '@/service/api';
import utilsTron from '@/utilsTron';

export default {
  data(){
    return {
      inputVuale: '',
      placeholder: this.$t('betting.PleaseEnter'),
      benefitAddr: '',
      ticketPrice: 0,
      totalTicketPrice: 0,
      ticketPriceODIN:0,
      isShow: false,
      isShow1: false,
      changeValue:'TRX',
      changeList:[
        {name:'TRX',id: 1},
        {name:'ODIN',id: 2},
      ],
    }
  },

  computed:{
    'trxFreeBalance': function() {
        if(this.$store.getters.GET_TRX_FREE_BALANCE > 0){
        this.isDisabled = false;
        return this.$store.getters.GET_TRX_FREE_BALANCE.toFixed(0);
        }
    },
     /* 当前可质押odin余额 */
    'odinFreeBalance': function() {
      return this.$store.getters.GET_ODIN_FREE_BALANCE;
    },
  },

  mounted(){
    this.isShow = false;
    this.getLotteryTicketInfo();
  },

  methods:{
     changeIndex(type){
       //debugger
      let num = parseInt(this.inputVuale);
      if(type=='ODIN'){
        if(num !== num){
          this.totalTicketPrice = 0;
        }else{
          this.totalTicketPrice = num * this.ticketPriceODIN 
        }
      }else if(type=='TRX'){
        if(num !== num){
          this.totalTicketPrice = 0;
        }else{
          this.totalTicketPrice = num * this.ticketPrice 
        }
      }
    },
    getLotteryTicketInfo(){ 
      getLotteryTicketInfo().then(res =>{
        this.benefitAddr = res.benefitAddr;
        this.ticketPrice = parseInt(res.ticketPrice);
        this.ticketPriceODIN = parseInt(res.ticketPriceODIN);
      });
    },

    changeNum(){
      this.isShow1 = false;
      if(this.changeValue=='ODIN'){
        this.totalTicketPrice = (this.inputVuale)*this.ticketPriceODIN;
      }else if(this.changeValue=='TRX'){
        this.totalTicketPrice = (this.inputVuale)*this.ticketPrice;
      }
      
    },

    ConfirmBuy(){
      if(this.inputVuale == "" || this.inputVuale == null){
        this.isShow1 = true;
      }else{
        if(this.changeValue=='ODIN'){
           if(this.odinFreeBalance >= this.inputVuale*this.ticketPriceODIN){
            this.isShow = false;
            let ticketPriceNum = parseInt(this.inputVuale*this.ticketPriceODIN*Math.pow(10,6));
            utilsTron.approveBuyTicket(ticketPriceNum).then(()=>
              utilsTron.buyTicketWithOCT(ticketPriceNum) 
            )

            this.inputVuale = '';
          }else{
             this.isShow = true;
          }
        }else if(this.changeValue=='TRX'){
          if(this.trxFreeBalance >= this.inputVuale*this.ticketPrice){
            this.isShow = false;
            let ticketPriceNumTrx = parseInt(this.inputVuale*this.ticketPrice*Math.pow(10,6));
            utilsTron.buyTicket(ticketPriceNumTrx)
            
            this.inputVuale = '';
          }else{
           this.isShow = true;
          }
        }
       /*  if(this.trxFreeBalance >= this.inputVuale*this.ticketPrice){
          this.isShow = false;
          let ticketPriceNUm = parseInt(this.inputVuale*this.ticketPrice*Math.pow(10,6));
          utilsTron.buyTicket(ticketPriceNUm)
          
          this.inputVuale = '';
        }else{
          this.isShow = true;
        } */
      }
    }
  }
}
</script>

<style lang='less'>
  .el-input__inner{
    background: #039074;
    height: 26px;
    border: 0px;
    font-size: 12px;
    padding: 0px 2px;
    color: #fff;
  }

  .buy-box{
    width: 100%;
    padding: 0px 20px;
    box-sizing: border-box;
    .buy-title{
      text-align: center;
      font-size: 16px;
      color: #038F73;
      padding: 6px;
      box-sizing: border-box;
    }
    .buy-coupons{
      width: 100%;
      background: url(../../assets/imgs/buy-back.png) no-repeat;
      background-size: 100% 100%;
      height: 100px;
      box-sizing: border-box;
      display: flex;
      .conpons{
        width: 27%;
        height: 100px;
        line-height: 100px;
        color: #fff;
        font-weight: 700;
        font-size: 20px;
        opacity:0.72;
      }
      .buy-msg{
        width: 73%;
        height: 100px;
        box-sizing: border-box;
        .msg1{
          height: 50%;
          display: flex;
          padding: 0px 10px;
          box-sizing: border-box;
          align-items: center;
          justify-content: space-between;
          .msg1-inp{
            height: 20px;
            width: 65%;
            border-radius: 4px;
            background: #039074;
            border: none;
            color: #fff !important;
            font-size: 12px;
          }
          .num{
            width: 35%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left:4px;
            box-sizing: border-box;
            color: #038F73;
          }
        }
        .msg2{
          height: 50%;
          .msg2-info{
            width:92%;
            font-size: 12px ;
            color: #039074;
            padding: 3px 10px;
            text-align: right;
            .info1{
              float:left;
            }
            .info2{
              float:right;
            }
            .btn{
              height: 24px;
              line-height: 24px;
              font-size: 12px;
              color: #fff;
              background: #039074;
              border-radius:  20px;
              border:0px;
              width: 80px;
              cursor: pointer;
            }
          }
        /*   .msg2-btn{
            display: flex;
            float: right;
            padding: 0px 10px;
            .btn{
              height: 24px;
              line-height: 24px;
              font-size: 12px;
              color: #fff;
              background: #039074;
              border-radius:  20px;
              border:0px;
              width: 80px;
              cursor: pointer;
            }
            
          } */
        }
        .xuxian{
          width: 100%;
          height: 1px;
          display: block;
          opacity: 0.6;
        }
      }
    }
  }
  .AppselectSty{
    width:60px;
  }
 .AppselectSty.el-select-dropdown.el-popper{
    border: none;
  }

  .el-select .el-input .el-select__caret{
    margin-top: 15px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }

  .AppselectSty .el-scrollbar__wrap{
    overflow: hidden !important;
    background: #229d85;
  }

  .AppselectSty.el-select-dropdown__item.selected{
    background: #229d85 !important;
    color: #fff !important;
  }

  .AppselectSty.el-select-dropdown__item:hover{
    background: #bec3ca7d !important;
    color: #fff !important;
  }

  .AppselectSty.el-select-dropdown__item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    color: #fff;
  }

  .AppselectSty .el-select-dropdown{
    border: 0px solid #229d85;
  }

  .AppselectSty.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background: #229d85;
    color: #fff;
  }
  .AppselectSty .el-input__inner {
    height: 26px;
    background-color: #27a088;
    border: 1px solid #27a088;
    color: #fff;
  }
  .AppselectSty.el-select:hover .el-input__inner{
    border-color: transparent; /* inherit */
  }
  .AppselectSty .el-popper{
    margin-top: 0px !important;
  }
</style>

