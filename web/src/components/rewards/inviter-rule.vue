<template>
  <div class='rules-box'>
    <div class='rules-title'>
      <p style="font-size: 20px;">{{$t('rules.title')}}</p>
      <div class='rules-content'>
      <h4 class="rules">{{$t('inviterPage.rule1')}}</h4>
      <h4 class="rules">{{$t('inviterPage.rule2')}}</h4>
      <h3 class="rules">{{$t('inviterPage.rule3')}}</h3>
      

      <div class="payout-list-table">
        <div class="table-header">
          <div class="timer1">
            {{$t('inviterPage.userRanking')}}
          </div>
          <div class="timer2">
            {{$t('inviterPage.rewardPrice')}}
          </div>
          <div class="timer3">
            {{$t('inviterPage.rewardUserWeek')}}
          </div>
        </div>
        <div v-for="(item, index) in rewardData" class="item" :class="{'active': index % 2 == 0 }" :key='index'>
          <div class="timer1">{{item.index}}</div>
          <div class="timer2">{{item.price}}</div>
          <div class="timer3">{{item.number}}</div>
        </div>
      </div>
      <div v-if="!isPcDeviceType" class='detail-style'>
        <hr class="hrSty"/>
        <font class="spanSty">{{$t('inviterPage.Details')}}</font>
        <hr class="hrSty"/>
        <p>&nbsp;</p> 
      </div>
      

      <!-- <p>{{$t('inviterPage.Details')}}</p> -->
<!--       <h4 class="rules">{{$t('rules.num4')}}</h4>
      <h3 class="rules">{{$t('rules.num5')}}</h3> 
      <h4 class="rules">{{$t('rules.num6')}}</h4>
      <h3 class="rules">{{$t('rules.num7')}}</h3>
      <h4 class="rules">{{$t('rules.num8')}}</h4>
      <h4 class="rules">{{$t('rules.num9')}}</h4> -->
      <!-- <h3 ><a href="https://link.medium.com/3ZE8xKBBEW" >{{$t('rules.Details')}}</a></h3> -->
      <!-- <hr class="hrSty"/>
      <font class="spanSty">{{$t('betting.Reserved')}}</font>
      <hr class="hrSty"/>
      <p>&nbsp;</p>  -->
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      rewardData: [
        {index: 1, price: 60 ,number: 40},
        {index: 2, price: 57 ,number: 38},
        {index: 3, price: 54 ,number: 36},
        {index: 4, price: 51 ,number: 34},
        {index: 5, price: 48 ,number: 32},
        {index: 6, price: 45 ,number: 30},
        {index: 7, price: 42 ,number: 28},
        {index: 8, price: 39 ,number: 26},
        {index: 9, price: 36 ,number: 24},
        {index: 10, price: 33 ,number: 22},
      ],

      isPcDeviceType: this.$isPcDeviceType
    }
  },
   computed:{
    'langularType': function(){
      return this.$store.getters.GET_LANGUAR_TYPE;
    }
  }
}
</script>

<style lang='less' scoped>
  p{
    margin: 0;
  }
  .rules-box{
    width: 900px;
    margin: 0 auto;
    color: #FFFFFF;
    padding: 20px 0px;
    box-sizing: border-box;
    .payout-list-table{
      display: flex;
      flex-direction: column;
      .table-header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 30px;
        border: 1px solid #00E9E1;
        font-size: 13px;
        .timer1{
          flex: 1;
          color: #00E9E1;
          text-align: left;
          font-size: 16px;
        }
        .timer2{
          flex: 1;
          color: #00E9E1;
          text-align: center;
          font-size: 16px;
        }
        .timer3{
          flex: 1;
          color: #00E9E1;
          text-align: right;
          font-size: 16px;
        }
      }
      .item{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 30px;
        border: 1px solid #00E9E1;
        border-top: 0px solid #00E9E1;
        font-size: 13px;
        .timer1{
          flex: 1;
          color: #00E9E1;
          text-align: left;
          margin-left: 20px;
        }
        .timer2{
          flex: 1;
          color: #00E9E1;
          text-align: center;
          margin-left: 20px;
        }
        .timer3{
          flex: 1;
          color: #00E9E1;
          text-align: right;
          margin-right: 50px;
        }
      }
    }

    .detail-style{
      display: flex;
      padding: 20px 10px 0px;
      box-sizing: border-box;
      .hrSty{
        float:left;
        width:240px;
        height: 1px; 
        border: none; 
        background-color: rgba(150, 141, 141, 0.65);
      }
      .spanSty{
        width: 330px;
        float:left;
        color: rgba(255, 255, 255, 0.43);
      }
    }
  }
  .rules{
    text-align: left;
  }

  @media screen and (max-width: 500px) {
    .rules-box{
      width: 100%;
      margin: 0 auto;
      color: #FFFFFF;
      padding: 20px 10px;
      box-sizing: border-box;
      .payout-list-table{
        display: flex;
        flex-direction: column;
        .table-header{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 10px 30px;
          border: 1px solid #00E9E1;
          font-size: 13px;
          .timer1{
            flex: 1;
            color: #00E9E1;
            text-align: left;
            font-size: 12px;
          }
          .timer2{
            flex: 1;
            color: #00E9E1;
            text-align: center;
            font-size: 12px;
          }
          .timer3{
            flex: 1;
            color: #00E9E1;
            text-align: right;
            font-size: 12px;
          }
        }
        .item{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 10px 30px;
          border: 1px solid #00E9E1;
          border-top: 0px solid #00E9E1;
          font-size: 13px;
          .timer1{
            flex: 1;
            color: #00E9E1;
            text-align: left;
            margin-left: 20px;
          }
          .timer2{
            flex: 1;
            color: #00E9E1;
            text-align: center;
            margin-left: 20px;
          }
          .timer3{
            flex: 1;
            color: #00E9E1;
            text-align: right;
            margin-right: 50px;
          }
        }
      }

      .detail-style{
        display: flex;
        padding: 20px 10px 0px;
        box-sizing: border-box;
        .hrSty{
          float:left;
          width:15%;
          height: 1px; 
          border: none; 
          background-color: rgba(150, 141, 141, 0.65);
        }
        .spanSty{
          width: 70%;
          float:left;
          color: rgba(255, 255, 255, 0.43);
          font-size: 12px;
        }
      }

      .rules{
        text-align: left;
        font-size: 10px;
      }
    }
  }
 

 
  a { 
    color:#fff; 
    transition:0.5s;
    color:#fff;
    cursor:pointer;
    text-decoration:none;
  }
  a:hover {
    color:#2cb89c; 
    text-decoration:none;
  }
</style>
