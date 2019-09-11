<template>
    <div class="bet-content-home">
        <el-row>
            <div class="bet-content-main">
                <el-col :lg="3" :md="3" :sm="3" :xs="24" v-if="isPcDevice">
                    <div class=""></div>
                </el-col>

                <el-col :lg="20" :md="20" :sm="20" :xs="24">
                    <div class="bet-t">
                        <el-row>
                            <div  class="bet-withdraw">
                                <el-col :lg="4" :md="4" :sm="4" :xs="9" style="text-align: left;">
                                    <input class="inp" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" type="text" placeholder="投注数量" v-model="betCount" @blur="betCountNum">
                                </el-col>

                                <el-col :lg="4" :md="4" :sm="4" :xs="4">
                                    <span  class="span-but" style="color: #039074" @click="betCare(2)">1/2</span>
                                </el-col>

                                <el-col :lg="4" :md="4" :sm="4" :xs="4">
                                    <span class="span-but" style="color: #039074" @click="betCare(1)">2X</span>
                                </el-col>

                                <el-col :lg="4" :md="4" :sm="4" :xs="4">
                                    <span class="span-but" style="color: #039074" @click="betCare(3)">MAX</span>
                                </el-col>

                                <el-col :lg="4" :md="4" :sm="4" :xs="4">
                                    <span class="span-but" style="color: #039074" @click="betCare(4)">MIN</span>
                                </el-col>

                                <!--el-col :lg="4" :md="4" :sm="4" :xs="8" style="text-align: right;">
                                    <el-button class="with-but" :disabled='betDisbled' @click="betting()">{{$t('betting.bet')}}</el-button>
                                </el-col-->
                            </div>
                        </el-row>

                        <el-row :gutter="20">
                            <div class="bet-banner">
                                <el-col :lg="6" :md="6" :sm="6" :xs="12">
                                    <div class="banner">
                                        <img src="@/assets/images/trx-branner.png" alt="">
                                        <span style="margin-left: 10px;color:#039074">{{$t('betting.balance')}}：{{trxFreeBalance || 0}}</span>
                                    </div>
                                </el-col>

                                <el-col :lg="8" :md="6" :sm="6" :xs="12">
                                    <div class="banner pledge">
                                        <img src="@/assets/images/lunpan.png" alt="">
                                        <span style="margin-left: 10px;color:#039074">{{$t('header.toPledge')}}ODIN：{{odinFreeBalance}}</span>
                                    </div>
                                </el-col>

                                <el-col :lg="4" :md="4" :sm="4" :xs="24" style="text-align: right;">
                                    <div class="banner bet-auto">
                                        <span style="color: #039074;margin-right:10px;font-size: 12px;">{{$t('betting.automaticBet')}}</span>
                                        <el-switch v-model="autoBet" active-color="#13ce66" inactive-color="#666" @change='changeAuto'></el-switch>
                                    </div>
                                </el-col>
                            </div>
                        </el-row>
                    </div>
                </el-col>

                <el-col :lg="3" :md="3" :sm="3" :xs="24" v-if="isPcDevice"></el-col>
            </div>
        </el-row>
    </div>
</template>

<script>
    import utilsTron from '@/utilsTron';
    export default {
        name: 'betBox',

        computed: {
            'careType': function() {
                return this.$store.getters.GET_SEL_CARE;
            },

            'tranwebToken': function() {
                return this.$store.getters.GET_RING_TRON_WEB_TOKEN;
            },

            'tronwebObj': function() {
                return this.$store.getters.GET_RING_TRON_WEB;
            },

            'maxBetCount': function() {
                return this.$store.getters.GET_TREE_MAX_WAGER_PRICE 
            },

            'trxFreeBalance': function() {
                if(this.$store.getters.GET_TRX_FREE_BALANCE > 0){
                this.isDisabled = false;
                return this.$store.getters.GET_TRX_FREE_BALANCE.toFixed(0);
                }
            },

            'odinFreeBalance': function() {
                return this.$store.getters.GET_ODIN_FREE_BALANCE;
            },

            'isAutoBetTrx': function() {
                return this.$store.getters.GET_AUTO_BET;
            },

            'changeStatus': function() {
                return this.$store.getters.GET_CHANGE_STATUS;
            },

            'max2X': function() {
                return this.$store.getters.GET_2X_MAX;
            },

            'max3X': function() {
                return this.$store.getters.GET_3X_MAX;
            },

            'max5X': function() {
                return this.$store.getters.GET_5X_MAX;
            },

            'max30X': function() {
                return this.$store.getters.GET_30X_MAX;
            },
        },

        data() {
            return {
                'betDisbled': false,
                'betCount': 50,
                'autoBet': false,
                'minBetCount': 50,
                Freebalance: 0,
                TokenBalance: 0,
                isPcDevice: this.$isPcDeviceType
            }
        },

        watch: {
            betCount(newVal, oldVal) {
                this.$store.commit('SET_BET_COUNT_TRX', this.betCount);
            }
        },

        methods: {
            betting() {
                if(this.betDisbled) {
                    this.$message({message:this.$t('betting.calculating'),type:'error'});
                }else {
                    if(this.tronwebObj) {
                        this.startBet();
                    } else {
                        this.$message({message:this.$t('betting.PleaseTronLink'),type:'error'});
                    }
                     this.startBet();
                }
            },

            betCountNum() {
                if(this.betCount < this.minBetCount) {
                    //this.$message.error(`投注金额必须大于${this.minBetCount}`);
                    this.$message({message:this.$t('betting.maxBetCount'),type:'error'});
                    this.betCount = this.minBetCount;
                }else {
                    this.betCount = parseInt(this.betCount);
                }
            },

            startBet() {
                this.$parent.$parent.start_bet();
            },

            async startBetBack(strength){
                if(this.betCount == '' || this.betCount == 0) {
                    this.$message({message:this.$t('betting.wagerAmount'),type:'error'});
                }else if(null == this.tranwebToken || this.tranwebToken == '') {
                    this.$message({message:this.$t('betting.PleaseTronLink'),type:'error'});
                }
                /*let betResult =  await utilsTron.towerBet(strength, this.betCount * 1000000, this.tranwebToken);
                if (betResult.length > 0){
                    this.$message({message:betResult,type:'error'});
                    this.$parent.$parent.cancel_bet(event);
                }*/
                let _inviterPAddr = this.$route.query.from || '';
                await utilsTron.towerBet(strength, this.betCount * 1000000, _inviterPAddr).then(ret =>{
                    /*if (!ret){
                        //this.$parent.$parent.cancel_bet(event);
                        return;
                    }
                    var betResult = JSON.stringify(ret);
                    if (betResult.length > 2){
                        //this.$message({message:betResult,type:'error'});
                        this.$parent.$parent.cancel_bet(event);
                    }*/
                });
            },

            changeAuto(event) {
                this.$store.commit('SET_CHANGE_STATUS', true);
                this.$store.commit('SET_AUTO_BET', event);
                this.$parent.$parent.set_autobet(event);
            },

            getFreeBalanceOf(baseName) {
                utilsTron.getFreeBalanceOf(baseName).then(res => {
                    this.Freebalance = res
                })
            },

            getBalanceOf(baseName) {
                utilsTron.getBalanceOf(baseName).then(res => {
                    // console.log(res,123)
                    this.TokenBalance = res;
                })
            },

            betCare(type) {
                if(type == 1) {
                    if(this.betCount) {
                        if(this.betCount > (this.$store.getters.GET_TREE_MAX_WAGER_PRICE / 2)){
                            this.betCount = this.$store.getters.GET_TREE_MAX_WAGER_PRICE;
                        }else{
                            this.betCount = (this.betCount * 2);
                        }
                        this.$store.commit('SET_BET_COUNT_TRX', this.betCount);
                    }
                }else if(type == 2) {
                    if(this.betCount) {
                        let betP = Math.ceil(this.betCount / 2);//parseInt(this.betCount / 2)+1;
                        if(betP < this.minBetCount){
                            this.betCount = this.minBetCount;
                        }else{
                            this.betCount = betP;
                        }
                        this.$store.commit('SET_BET_COUNT_TRX', this.betCount);
                    }
                }else if(type == 3){
                    this.betCount = this.$store.getters.GET_TREE_MAX_WAGER_PRICE;
                    this.$store.commit('SET_BET_COUNT_TRX', this.betCount);
                }else if(type == 4){
                    this.betCount = this.minBetCount;
                    this.$store.commit('SET_BET_COUNT_TRX', this.betCount);
                }
            }
        },
    }
</script>

<style lang="less">
    .bet-content-home {
        width: 100%;
        .bet-content-main {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .bet-t {
                .bet-top {
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;

                    .bet-time {color: #fff;font-size:12px;text-align: left;}

                    .bet-count {color: #fff;font-size:15px;font-weight: bold}

                    .bet-detail-content{
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-end;
                        align-items: center;

                        .bet-detail {color: #fff;font-size:12px;background: #039074;border-radius: 2px;padding: 3px 10px;cursor: pointer;margin-right: 5px; text-decoration: none;}

                        .bet-detail:hover {opacity: .6;}
                    }
                }
                
                .bet-withdraw {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    height: 30px;
                    margin-top: 20px;
                    border: 1px solid #039074;
                    border-radius: 3px;
                    padding: 10px 10px;
                    display: flex;
                    
                    .inp {
                        outline: none;
                        border: none;
                        background: #2a576c;
                        color: #fff;
                        font-size: 14px;
                        border-radius: 3px;
                        width: 100px;
                        text-align: center;
                        line-height: 26px;
                    }
                
                    .span-but {
                        color: #2D5876;
                        cursor: pointer;
                        font-weight: bold;
                        font-size: 15px;
                    }

                    .span-but:hover {
                        opacity: .6;  
                    }

                    .with-but {
                        cursor: pointer;
                        color: #fff;
                        font-size: 15px;
                        padding: 5px 25px;
                        border-radius: 3px;
                        background: #0B4543;
                        border: none;

                    }

                    .with-but:hover {
                        opacity: .6;
                    }
                }

                .bet-banner {
                    margin-top: 20px;
                    padding: 10px 30px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;


                    .banner{
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-start;
                        align-items: center;
                        img {
                            height: 30px;
                            width: auto;
                        }
                    }

                    .pledge{
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-end;
                        align-items: center;
                        img {
                            height: 30px;
                            width: auto;
                        }
                    }
                }
            }   
        }
    }

    @media screen and (max-width: 500px){
        .bet-content-home {
            width: 100%;
            .bet-content-main {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .bet-t {
                    .bet-banner {
                        padding: 10px;
                        font-size: 12px;
                        display: flex;
                        flex-wrap: wrap;
                        .banner{
                            width: 170px;
                        }
                        .bet-auto{
                            margin: 10px auto 0px;
                            display: flex;
                            justify-content: space-between;
                            width: 100px;
                        }

                        img{
                            height: 25px;
                            width: auto;
                        }
                    }
                    .bet-count {color: #fff;font-size:13px;font-weight: bold}
                }
            }
        }
    }

    .el-switch__core{
        border: 1px solid #039074;
        background: #999;
    }

    .el-switch__core:after{
        background: #fff;
    }

    .el-switch.is-checked .el-switch__core{
        background: #039074;
    }
</style>