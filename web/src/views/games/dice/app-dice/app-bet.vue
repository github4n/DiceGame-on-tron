<template>
  <div class='app-bet-box'>
    <div class="bet">
      <div class="bet-left">
        <!-- <img src="../../assets/images/oct.png" alt=""> -->
        <div class='betting'>{{$t('betting.bet')}} {{betPrice}} Trx {{$t('betting.betTokens')}} {{betPrice / MintRate }}  ODIN</div>
      </div>

      <div class="app-bet-content">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="PhaseRatio"
          :show-text='isShowText' >
        </el-progress>
        <div class="tooltip">
          <span style="color: #fff;opacity: .7;margin-right:10px;font-size:10px;padding-top:6px;">{{$t('betting.remaining')}} {{MintLevel}}{{$t('betting.level')}} {{Overage | priceFormat}}</span>
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">
              <div class="app-tooltip-header">{{$t('betting.odinToken')}}</div>
              <div class='app-tooltip-title'>{{$t('betting.odinTitle')}}</div>
              <div class="app-text-content">
                {{$t('betting.odinPublishCount')}}
              </div>
              <div class="app-text-content app-texts">
                {{$t('betting.odinPublishText')}}
              </div>
              <div class="app-tooltip-box">
                <div class="app-tooltip-item app-tooltip-item-th">
                  <div>{{$t('betting.stage')}}</div>
                  <div>1</div>
                  <div>2</div>
                  <div>...</div>
                  <div>48</div>
                </div>

                <div class="app-tooltip-item">
                  <div>{{$t('betting.Dice')}}</div>
                  <div>1000</div>
                  <div>1040</div>
                  <div>...</div>
                  <div>2880</div>
                </div>

                <div class="app-tooltip-item">
                  <div>{{$t('betting.RotaryTable')}}</div>
                  <div>480</div>
                  <div>499.2</div>
                  <div>...</div>
                  <div>1382.4</div>
                </div>
              </div>
              <div class='app-tooltip-up'>{{$t('betting.priceBalance')}}</div>
              <p style="color: #00E9E1;text-align: left;font-weight:500;max-width:320px;font-size:10px;padding:0px 10px;margin:0;line-height:20px;">{{$t('betting.reduced')}}</p>
            </div>
            <i class="fa fa-question-circle icon" aria-hidden="true"></i>
          </el-tooltip>
        </div>
      </div>

      <div class="bet-left down-item">
        <div class='warning'>{{$t('betting.Equivalent')}} </div>
      </div>
    </div>
  </div>
</template>

<script>
  import utilsTron from '@/utilsTron';

  export default {
    name: 'BET',

    computed: {
      'isLogin': function() {
         return this.$store.getters.IS_USER_LOGIN;
      },

      'MintRate': function() {
        return this.$store.getters.GET_MINT_RATE;
      },

      'Overage': function() {
        return this.$store.getters.GET_OVERAGE;
      },

      'MintLevel': function() {
        return this.$store.getters.GET_MINT_LEVEL;
      },

      'PhaseRatio': function() {
        return this.$store.getters.GET_PHASE_RATIO;
      },

      'tronwebObj': function() {
        return this.$store.getters.GET_RING_TRON_WEB;
      },
    },

    props: ['betPrice'],

    data() {
      return {
        isShowText: true,
        odinNum: 0,
        phaseNum: 0,
        txt: '第一阶段剩余：',
        inter: ''
      }
    },

    mounted() {
      this.setInter();
    },
    filters: {
      priceFormat(vaule) {
        if(vaule>0 &&(vaule + '').length>3){
          return ("" +vaule).replace( /\B(?=(\d{3})+$)/g, ',' );
        }else{
          return vaule;
        }
      },
    },
    methods: {
      async initData() {
        // console.log('getMintLevelAndOverage挖矿阶段和当前阶段挖矿剩余量');
        let mintLevelAndOverage = await utilsTron.getMintLevelAndOverage(); //挖矿阶段和当前阶段挖矿剩余量
        this.$store.commit('SET_MINT_RATE', mintLevelAndOverage.mintRate);
        this.$store.commit('SET_OVERAGE', mintLevelAndOverage.overage);
        this.$store.commit('SET_MINT_LEVEL', mintLevelAndOverage.mintLevel);
        let amount = mintLevelAndOverage.amount;
        if(mintLevelAndOverage.overage && amount){
          let overage = (mintLevelAndOverage.overage / amount);
          let phaseRatio = (overage * 100).toString().substring(0, 2);
          let num = parseInt(phaseRatio);
          this.$store.commit('SET_PHASE_RATIO', num);
        }
      },

      setInter() {
        this.inter = setInterval(this.initData, 10000);
      }
    }
  }
</script>

<style lang='less'>
  .app-bet-content .el-progress {
    width: 283px;
  }

  .app-bet-content .el-progress-bar__outer {
    height: 6px;
    border-radius: 100px;
    background: #434343;
    overflow: hidden;
    position: relative;
    vertical-align: middle;
  }

  .app-bet-content .el-progress-bar__inner {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: #00E9E1 !important;
    text-align: right;
    border-radius: 100px;
    line-height: 1;
    white-space: nowrap;

  }

  .app-bet-content .el-progress-bar__innerText{
    color: #fff !important;
  }

  .app-bet-box{
    margin: 0 auto;
    padding: 0px 10px;
    .bet{
      margin-bottom: 10px;
      padding: 10px 30px;
      border-radius:2px;
      //border: 1px solid #039074;
      .bet-left{
        display: flex;
        flex-direction: row;
        .betting{
          font-size: 10px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color:rgba(254,254,254,1);
          text-align: center;
          width: 100%;
        }
      }

      .down-item{
        .warning{
          color: #fff;
          font-size: 12px;
          width: 100%;
          text-align: center;
          padding: 6px;
        }
      }

      .app-bet-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 5px;
        .content-msg{
          color: #fff;
          opacity: .7;
          text-align: right;
          margin: 0;
          padding-bottom: 0;
          padding-top: 5px;
          font-size: 12px;
          line-height: 25px;
        }

        .tooltip{
          display: flex;
          flex-direction: row;
          justify-content: center;
          box-sizing: border-box;
        }
      }
    }
  }

  .el-tooltip__popper.is-dark{
    background: #181845;
    border: 1px solid #00E9E1;
  }

  .app-tooltip-header{
    text-align: center;
    height: 30px;
    line-height: 30px;
    //border-bottom: 1px solid #216266;
    color: #fff;
    font-weight: bold;
    font-size: 15px;
  }

  .app-text-content{
    padding: 10px 10px 0px;
    line-height: 20px;
    font-size: 12px;
    max-width: 320px;
  }

  
  .app-texts{
     padding: 0px 10px;
  }


  .app-tooltip-title{
    padding: 0px 10px;
    color: #00E9E1;
    font-size: 12px;

  }

  .app-tooltip-box{
    padding: 0 5px;
    border-radius: 4px;
    max-width: 320px;
  }

  .app-tooltip-item{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 30px;
    line-height: 30px;
    border-left: 1px solid #00E9E1;
    border-right: 1px solid #00E9E1;
    border-bottom: 1px solid #00E9E1;
    color: #00E9E1;
    div{
      width: 100px;
      text-align: center;
    }
  }

  .app-tooltip-item-th{
    border-top: 1px solid #00E9E1;
    color: #00E9E1;
  }

  .app-tooltip-up{
    padding: 10px;
    font-size: 13px;
    color: #00E9E1;
  }

  .app-tooltip-h{
    text-align: center;
    font-size: 16px;
    color: #fff;
  }

  .fa-question-circle:before{
    color: #fff;
    position: relative;
    top: 3px;
  }
</style>
