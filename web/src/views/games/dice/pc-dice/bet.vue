<template>
  <div class='bet-box'>
    <div class="bet">
      <div class="bet-left">
        <div class='betting'>{{$t('betting.bet')}} {{betPrice}} Trx {{$t('betting.betTokens')}} {{betPrice / MintRate }}  ODIN</div>
      </div>

      <div class="bet-contents">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="PhaseRatio"
          :show-text='isShowText' >
        </el-progress>
        <div style="margin: 4px 0; ">
          <span style="color: #fff;opacity: .9;font-size:12px;">{{$t('betting.remaining')}} {{MintLevel}}{{$t('betting.level')}} {{Overage | priceFormat}}</span>
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content" style='background:#181845;'>
              <div class="tooltip-header">{{$t('betting.odinToken')}}</div>
              <div class='tooltip-title'>{{$t('betting.odinTitle')}}</div>
              <div class="text-content">
                {{$t('betting.odinPublishCount')}}
              </div>
              <div class="text-content texts">
                {{$t('betting.odinPublishText')}}
              </div>
              <div class="tooltip-box">
                <div class="tooltip-item tooltip-item-th">
                  <div>{{$t('betting.stage')}}</div>
                  <div>1</div>
                  <div>2</div>
                  <div>...</div>
                  <div>48</div>
                </div>

                <div class="tooltip-item">
                  <div>{{$t('betting.Dice')}}</div>
                  <div>1000</div>
                  <div>1040</div>
                  <div>...</div>
                  <div>2880</div>
                </div>

                <div class="tooltip-item">
                  <div>{{$t('betting.RotaryTable')}}</div>
                  <div>480</div>
                  <div>499.2</div>
                  <div>...</div>
                  <div>1382.4</div>
                </div>
              </div> 
              <div class='tooltip-up'>{{$t('betting.priceBalance')}}</div>
              <p style="color: #d2d2d2;text-align: left;font-weight:500;max-width:450px;font-size:12px;padding:10px 20px 0px;margin:0;line-height:20px;">{{$t('betting.reduced')}}</p>
            </div>
            <i class="fa fa-question-circle icon" aria-hidden="true"></i>
          </el-tooltip>
        </div>
      </div>

      <div class="bet-left">
        <div>{{$t('betting.Equivalent')}} </div>
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
        if(this.tronwebObj){
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
        }
      },

      setInter() {
        this.inter = setInterval(this.initData, 10000);
      }
    }
  }
</script>

<style lang='less'>
  .bet-contents .el-progress {
    width: 400px;
  }

  .bet-contents .el-progress-bar__outer {
    height: 6px;
    border-radius: 100px;
    background: #434343;
    overflow: hidden;
    position: relative;
    vertical-align: middle;
  }

  .bet-contents .el-progress-bar__inner {
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

  .bet-contents .el-progress-bar__innerText{
    color: #fff  !important;
  }

  .bet-box{
    width: 100%;
    margin: 0 auto;
    .bet{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 10px 30px;
      margin-bottom: 30px;
      align-items: center;
      .bet-left{
        display: flex;
        flex-direction: row;
        height: 35px;
        line-height: 35px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color:rgba(254,254,254,1);
        img{
          width: 30px;
          margin-right: 10px;
        }
      }
      .bet-contents{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 10px;
        p{
          // color: #A78D65;
          margin: 0;
          padding-bottom: 0;
          padding-top: 5px;
          font-size: 12px;
          line-height: 25px;
          background-image: -webkit-gradient(linear, left 0, right 0, from(#A78D65), to(#f7e9b3));
          -webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
          -webkit-text-fill-color: transparent; /*text-fill-color会覆盖color所定义的字体颜色： */

        }
      }
    }
  }

  .el-tooltip__popper.is-dark{
    background: #181845;
  }

  .tooltip-header{
    text-align: center;
    height: 40px;
    line-height: 40px;
    //border-bottom: 1px solid #216266;
    color: #fff;
    font-weight: bold;
    font-size: 15px;
  }

  .tooltip-title{
    padding: 0px 20px;
    font-size: 13px;
    color: #00E9E1;
  }

  .text-content{
    padding: 10px 20px 0px;
    line-height: 25px;
    font-size: 12px;
    max-width: 450px;
  }

  .texts{
     padding: 0px 25px;
  }

  .tooltip-box{
    padding: 0 20px;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  }

  .tooltip-item{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 30px;
    line-height: 30px;
    border-left: 1px solid #00E9E1;
    border-right: 1px solid #00E9E1;
    // border-top: 1px solid #A78D65;
    border-bottom: 1px solid #00E9E1;
    color: #00E9E1;
    div{
      width: 100px;
      text-align: center;
    }
  }

  .tooltip-up{
    padding: 20px 20px 0px;
    font-size: 13px;
    color: #00E9E1;
  }

  .tooltip-item-th{
    border-top: 1px solid #00E9E1;
  }

  .tooltip-h{
    text-align: center;
    font-size: 16px;
    color: #fff;
  }

  .fa-question-circle:before{
    color: #fff;
    top: 0 !important; 
    margin-left: 6px;
    /* position: absolute;
    margin-left: 6px;
    margin-top: -14px; */
  }
</style>
