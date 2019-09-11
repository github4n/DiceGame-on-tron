<template>
  <div class='reward-box'>
    <img v-if="langularType == 'zh'" class='text-imgs' src="../../assets/imgs/text-yqr.png" alt="">
    <img v-if="langularType == 'en'" class='text-imgs' src="../../assets/imgs/text-yqr-en1.png" alt="">
    <div class='reward-msg'>
        <div class="con-box">
            <span class="spanSty">{{$t('inviterPage.CumulativeAwards')}}</span><br/>
            <span v-show='bonusPrice > 1' class='spanNub'>{{bonusPrice.replace( /\B(?=(\d{3})+$)/g, ',' )}}</span>
            <span v-show='bonusPrice < 1' class='spanNub'>0</span>
            <!-- <span class="spanSty" style="font-size:40px;">{{$t('inviterPage.share')}}</span><br/>
            <span class="spanSty" style="font-size:24px;">//&nbsp;&nbsp;&nbsp;{{$t('inviterPage.invitationPool')}}&nbsp;&nbsp;&nbsp;//</span><br/>
            <span style="font-size:44px;font-weight:500;color:#FEEB67;">１,000,000{{$t('inviterPage.million')}}</span> -->
        </div>
        <div class="djsStyle">
            <div class="bjk">
                <div v-if="langularType == 'zh'">
                    <span class="timeSty">{{maseratiDay}}：</span>  
                    <span class="timeSty">{{maseratiTime}}：</span>  
                    <span class="timeSty">{{maseratiFen}}：</span>  
                    <span class="timeSty">{{maseratiMiao}}</span>  
                    <!-- <span class="timeSty">18：</span>  
                    <span class="timeSty">20</span> -->
                </div>
                <div v-if="langularType == 'en'">
                    <span  class="timeSty">{{maseratiDay}}：</span> 
                    <span class="timeSty">{{maseratiTime}}：</span> 
                    <span class="timeSty">{{maseratiFen}}：</span>
                    <span class="timeSty">{{maseratiMiao}}</span>  
                </div>
                <!-- <a class="mini-button">{{$t('inviterPage.hours')}}</a>&nbsp;&nbsp;
                <a class="mini-button">{{$t('inviterPage.minutes')}}</a>&nbsp;&nbsp;
                <a class="mini-button">{{$t('inviterPage.seconds')}}</a> -->
            </div>
            <div class="button-box">
            <!-- <a class="level-butt">
                <img class="img-icon1" src="../../assets/imgs/icon1-yqr.png" alt="">
                {{$t('inviterPage.myGrades')}}</a>&nbsp;&nbsp; -->
            <!-- <a class="invite-butt">
                <img class="img-icon2" src="../../assets/imgs/icon2-yqr.png" alt="">
                {{$t('inviterPage.myInvitation')}}
                </a>&nbsp;&nbsp; -->
                <a class="invite-butt" href="#myInvitation">
                <img class="img-icon2" src="../../assets/img/icon46.png" alt="">
                {{$t('inviterPage.myInvitation')}}
                </a>
            </div>
        </div> 
    </div>
    
    <div class="invitSty"> 
        <!-- <span class="invitSpan">//&nbsp;&nbsp;&nbsp;{{$t('inviterPage.link')}}&nbsp;&nbsp;&nbsp;//</span><br/> -->
        <span class="invitSpan">&nbsp;&nbsp;&nbsp;{{$t('inviterPage.link')}}&nbsp;&nbsp;&nbsp;</span><br/>
        <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">
                {{$t('betting.linkTitle')}}
            </div>
            <i class="fa fa-question-circle icon" aria-hidden="true"></i>
        </el-tooltip>
    </div>
  </div>
</template> 
<script>
import { getInviteTopInfo , getShareAmtTotal } from '@/service/api';
import utils from '../../utils';

export default {
    data(){
        return {
            totalPrize:0,
            maseratiEndTime:'',
            maseratiRemainingTime:'',
            maseratiDay:'',
            maseratiTime:'',
            maseratiFen:'',
            maseratiMiao:'',
            maseratiTimer:'',

            prizePot1: 0,
            buybackPrice: 0,
            bonusPrice: 0,
            timer1: '',
            timer2: '',

            myPrizes: 0,
        }
    },
    watch: {
        maseratiRemainingTime(newVal, oldVal){
            this.maseratiDay = utils.translateTimeDate1(this.maseratiRemainingTime);
            this.maseratiTime = utils.translateTimeDate2(this.maseratiRemainingTime);
            this.maseratiFen = utils.translateTimeDate3(this.maseratiRemainingTime);
            this.maseratiMiao = utils.translateTimeDate4(this.maseratiRemainingTime); 
        
            if(this.maseratiRemainingTime == 0){
                clearTimeout(this.maseratiTimer);
                this.maseratiTimer = '';
                return;
            }
            this.maseratiTimer = setTimeout(() => {
                this.maseratiRemainingTime--;
            },1000);
        }
    },
    computed:{
        'langularType': function(){
            return this.$store.getters.GET_LANGUAR_TYPE;
        },
    },
    methods:{
        getPrizePotRandom(){
            let that = this;
            this.timer1 = setInterval(function(){
                that.bonusPrice = parseFloat((that.$store.getters.GET_PRIZEPOT_ANIMATE + that.shareAmtTotal)/10).toFixed(0);
            },250);
        },

         /* 获取总分红 */ 
        getShareAmtTotal(){
            let that = this;
            setInterval(function(){
                getShareAmtTotal().then(res =>{
                that.shareAmtTotal = (parseInt(res)/1000000);
                })
            },3000);
        }, 




        getInviteTopInfo(){
            getInviteTopInfo().then(res =>{
                this.totalPrize = res.totalPrize
                // let localSecon = parseInt(res.endTime);
                    this.maseratiEndTime = res.endTime;
                    if(this.maseratiEndTime > 0){
                        if(null != this.maseratiTimer && this.maseratiTimer != ""){

                        }else {
                            this.initMaseratiCountDown();
                        }
                    }
            });
        },
        /* 对获取倒计时时间的处理 */
        initMaseratiCountDown(){
            let localSecon = parseInt(this.timest());
            let serviceSecon = this.maseratiEndTime / 1000;
            if(localSecon < serviceSecon) {
                this.maseratiRemainingTime = serviceSecon - localSecon; // 还剩余多长时间
                this.maseratiRemainingTime--;
            }else{
                this.maseratiRemainingTime = 0;
            }
        },
        //从1970年开始的毫秒数然后截取10位变成 从1970年开始的秒数 获取本地的秒数
        timest() {
            var tmp = Date.parse( new Date() ).toString();
            tmp = tmp.substr(0,10);
            return tmp;
        },
    },
    mounted(){
        this.getInviteTopInfo();
        this.getPrizePotRandom();
        this.getShareAmtTotal();
    },
}
</script>

<style lang='less' scoped>
.reward-box{
    width:100%;
    .text-imgs{
        margin: 100px 0px;
    }
    .reward-msg{
        width: 60%;
        padding: 30px;
        background: url(../../assets/img/border.png) no-repeat;
        background-size: 100% 100%; 
        box-sizing: border-box;
        margin: 0 auto;
        .con-box{
            .spanSty{
                color:#fff;
                font-size: 20px;
                padding: 6px; 
                display: block;
            }
            .spanNub{
                font-size: 40px;
                color: #00E9E1;
                padding:0px 6px 6px; 
                display: block;
            }
        }
        .djsStyle{
            margin: 0 auto;
            padding: 6px;
            .bjk{
                //width: 384px;
                margin: 0 auto;
                //height:90px;
                //background: url(../../assets/imgs/border-yqr.png) no-repeat;
                .timeSty{
                    color:#fff;
                    font-size: 26px;
                }
                .mini-button{
                    background: #fff;
                    color: #000;
                    font-size: 16px;
                    border: 1px solid #fff;
                    text-align: center;
                    padding: 3px 20px;
                    border-radius: 20px;
                    height: 20px;
                    line-height: 20px;
                }
            }
            .button-box{
                width: 384px;
                margin: 0 auto;
                line-height: 50px;
                padding: 16px;
                .level-butt{
                    background: transparent;
                    color: #209c84;
                    font-size: 16px;
                    border: 1px solid #25ad92;
                    text-align: center;
                    padding: 6px 28px;
                    border-radius: 20px;
                    height: 20px;
                    line-height: 20px;
                    .img-icon1{
                        vertical-align: middle;
                    }
                }
                .invite-butt{
                    text-decoration:none;
                    //background: #25ad92;
                    color: #00E9E1;
                    font-size: 16px;
                    border: 1px solid #00E9E1;
                    text-align: center;
                    padding: 6px 20px;
                    border-radius: 20px;
                    height: 24px;
                    line-height: 24px;
                    display: block;
                    width: 130px;
                    margin: 0 auto;
                    cursor: pointer;
                    .img-icon2{
                        vertical-align: middle;
                    }
                }
            }
        }
    }
    
    .invitSty{
        display: flex;
        justify-content: center;
        align-items: center;
        margin:40px 0 ;
        .invitSpan{
            font-size:24px;
            color:#fff;
        }
    }
}

@media screen and (max-width: 500px) {
    .reward-box{
        width: 100%;
        .reward-msg{
            width: 90%;
            padding: 30px;
            background: url(../../assets/img/border.png) no-repeat;
            background-size: 100% 100%; 
            box-sizing: border-box;
            margin: 0 auto;
            .con-box{
                .spanSty{
                    color:#fff;
                    font-size: 14px;
                    padding: 0px; 
                    display: block;
                }
                .spanNub{
                    font-size: 26px;
                    color: #00E9E1;
                    padding:6px; 
                    display: block;
                }
            }
            .djsStyle{
                margin: 0 auto;
                padding: 6px;
                .bjk{
                    margin: 0 auto;
                    .timeSty{
                        color:#fff;
                        font-size: 18px;
                    }
                    .mini-button{
                        background: #fff;
                        color: #000;
                        font-size: 16px;
                        border: 1px solid #fff;
                        text-align: center;
                        padding: 3px 20px;
                        border-radius: 20px;
                        height: 20px;
                        line-height: 20px;
                    }
                }
                .button-box{
                    width: 100%;
                    margin: 0 auto;
                    line-height: 50px;
                    box-sizing: border-box;
                    .level-butt{
                        background: transparent;
                        color: #209c84;
                        font-size: 16px;
                        border: 1px solid #25ad92;
                        text-align: center;
                        padding: 6px 28px;
                        border-radius: 20px;
                        height: 20px;
                        line-height: 20px;
                        .img-icon1{
                            vertical-align: middle;
                        }
                    }
                    .invite-butt{
                        text-decoration:none;
                        //background: #25ad92;
                        color: #00E9E1;
                        font-size: 16px;
                        border: 1px solid #00E9E1;
                        text-align: center;
                        padding: 6px 20px;
                        border-radius: 20px;
                        height: 24px;
                        line-height: 24px;
                        display: block;
                        width: 130px;
                        margin: 0 auto;
                        cursor: pointer;
                        .img-icon2{
                            vertical-align: middle;
                        }
                    }
                }
            }
        }

        .invitSty{
            margin:20px 0 ;
            .invitSpan{
                font-size:20px;
                color:#fff;
            }
        }

        .text-imgs{
            //max-height: 68px;
            width: 80%;
            margin: 50px 0px;
        }
        .con-box{
            width: 100%;
        }
        .djsStyle{
            width: 100%;
            padding: 0px 20px;
            box-sizing: border-box;
            .bjk{
                width: 100%;
                //background: url(../../assets/imgs/border-yqr.png) no-repeat;
                //background-size: 100% 100%;
            }
            .button-box{
                width: 100%;
            }
            .invitSty{
                width: 100%;
                margin: 20px 0px;
            }
        }
    }
}

.fa-question-circle:before{
    color: #fff;
    top: 0 !important; 
    margin-left: 6px;
}
</style>
