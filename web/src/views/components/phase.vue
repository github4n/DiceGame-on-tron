<template>
    <div class="phase-content">
        <el-row>
            <el-col :lg="8" :md="8" :sm="8" :xs="24">
                <div class="odin">
                    <!-- <a name="details"></a> -->
                    <!-- <img style="width:30px;height:auto;margin-right:10px;" src="@/assets/images/icon2.png" alt=""> -->
                    <span>{{$t('betting.Bettings')}} {{betTrxCount}} TRX {{$t('betting.YouCanGetItByBetting')}} {{(betTrxCount*mintRate/480000).toFixed(2)}} ODIN</span>
                </div>
            </el-col>

            <el-col :lg="8" :md="8" :sm="8" :xs="24">
                <div class="phase-live">
                    <el-progress :text-inside="true" :show-text='true' :stroke-width="18" :percentage="phaseRatio" style="width:350px;margin-bottom:10px;"></el-progress>
                    <div class='display"flex;'>
                        <span >{{$t('betting.Frist')}} {{level || 0}} {{$t('betting.level')}} {{overage}}</span>
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
            </el-col>

            <el-col :lg="8" :md="8" :sm="8" :xs="24">
                <div class="token">{{$t('betting.Equivalent')}}</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import utilsTron from '@/utilsTron';
export default {
    name: 'phase',

    computed:{
        //阶段
        'level':function(){
            return this.$store.getters.GET_MINT_LEVEL;
        },

        //剩余量
        'overage':function(){
            return this.$store.getters.GET_OVERAGE;
        },

        //比例值
        'mintRate':function(){
            return this.$store.getters.GET_MINT_RATE;
        },

        //下注值
        'betTrxCount':function(){
            return this.$store.getters.GET_BET_COUNT_TRX;
        },

        //进度百分比
        'phaseRatio':function(){
            return this.$store.getters.GET_PHASE_RATIO;
        },

        'tronwebObj': function() {
            return this.$store.getters.GET_RING_TRON_WEB;
        },
    },

    data() {
        return {
            inter: ''
        }
    },

    mounted() {
      this.setInter();
    },

    methods: {
        async initData() {
            if(this.tronwebObj){
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
    .phase-content{
        width: 100%;
        box-sizing: border-box;
        .odin {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            color: #fff;
        }

        .phase-live {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            color: #fff;
        }

        .token {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            color: #fff;
        }
    }

    @media screen and (max-width: 500px){
        .phase-content{
            padding: 0 20px;
            .odin {
                display: flex;
                flex-direction: row;
                align-items: center;
                text-align: center;
                color: #fff;
                font-size: 11px;
                padding: 6px 0px;
                img{
                    width: 25px;
                    height: 25px;
                }
            }

            .phase-live {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                color: #ccc;
                font-size: 12px;
            }

            .token {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                text-align: center;
                color: #fff;
                font-size: 11px;
                margin-top: 5px;
            }
        }
    }

    .el-progress-bar__inner{
        background: #00E9E1;
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
