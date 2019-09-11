<template>
    <div class="bet-group">
        <el-row :gutter="20">
            <el-col :lg="6" :md="6" :sm="6" :xs="12">
                <div class="bet-group-item">
                    <el-row>
                        <div class="header1">
                            <div class='times times-item'>2X</div>
                            <div class='times'>
                                <div class='max'>Max</div>
                                <div class='trx'>{{max2X}}TRX</div>
                            </div>
                        </div>
                    </el-row>
                    <el-row>
                        <el-col :lg="12" :md="12" :sm="12" :xs="12">
                            <div class="item-header" style='padding-left:10px; box-sizing: border-box;'>
                                <div class="left">
                                    <img src="@/assets/img/user1.png" alt="">
                                </div>
                                <div class="right">{{obj2X.detail.length}}</div>
                            </div>
                        </el-col>
                        <el-col :lg="12" :md="12" :sm="12" :xs="12">
                            <div class="item-header1" style='padding-right:10px; box-sizing: border-box;'>
                                <div class="left">{{obj2X.totalBetAmt}}</div>
                                <div class="right">TRX</div>
                            </div>
                        </el-col>
                    </el-row>
 
                    <el-row>
                        <div class="item-record-tab1" v-for="(item, index) in obj2X.detail" :key='index' style='padding:0px 10px; box-sizing: border-box;'>
                            <div>{{item.pAddr | dddressatFormat}}</div>
                            <div>{{item.betVal}}</div>
                        </div>
                    </el-row>
                 </div>
            </el-col>

            <el-col :lg="6" :md="6" :sm="6" :xs="12">
                <div class="bet-group-item  group-item2">
                    <el-row>
                        <div class="header2">
                            <div class='times times-item'>3X</div>
                            <div class='times'>
                                <div class='max'>Max</div>
                                <div class='trx'>{{max3X}}TRX</div>
                            </div>
                        </div>
                    </el-row>
                    <el-row>
                        <el-col :lg="12" :md="12" :sm="12" :xs="12">
                            <div class="item-header" style='border-bottom: 1px solid #827EF1;padding-left:10px; box-sizing: border-box;'>
                                <div class="left"><img src="@/assets/img/user2.png" alt=""></div>
                                <div class="right" style='color:#827EF1;'>{{obj3X.detail.length}}</div>
                            </div>
                        </el-col>
                        <el-col :lg="12" :md="12" :sm="12" :xs="12">
                            <div class="item-header1" style='border-bottom: 1px solid #827EF1;padding-right:10px; box-sizing: border-box;'>
                                <div class="left" style='color:#827EF1;'>{{obj3X.totalBetAmt}}</div>
                                <div class="right" style='color:#827EF1;'>TRX</div>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row>
                        <div class="item-record-tab2" v-for="(item, index) in obj3X.detail" :key='index' style='padding:0px 10px; box-sizing: border-box;'>
                            <div>{{item.pAddr | dddressatFormat}}</div>
                            <div>{{item.betVal}}</div>
                        </div>
                    </el-row>
                </div>
            </el-col>

            <el-col :lg="6" :md="6" :sm="6" :xs="12">
                <div class="bet-group-item group-item3">
                    <el-row>
                        <div class="header3">
                            <div class='times times-item'>5X</div>
                            <div class='times'>
                                <div class='max'>Max</div>
                                <div class='trx'>{{max5X}}TRX</div>
                            </div>
                        </div>
                    </el-row>
                    <el-row>
                        <el-col :lg="12" :md="12" :sm="12" :xs="12">
                            <div class="item-header" style='border-bottom: 1px solid #fff;padding-left:10px; box-sizing: border-box;'>
                                <div class="left"><img src="@/assets/img/user3.png" alt=""></div>
                                <div class="right" style='color:#fff'>{{obj5X.detail.length}}</div>
                            </div>
                        </el-col>
                        <el-col :lg="12" :md="12" :sm="12" :xs="12">
                            <div class="item-header1" style='border-bottom: 1px solid #fff;padding-right:10px; box-sizing: border-box;'>
                                <div class="left" style='color:#fff'>{{obj5X.totalBetAmt}}</div>
                                <div class="right" style='color:#fff'>TRX</div>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row>
                        <div class="item-record-tab3" v-for="(item, index) in obj5X.detail" :key='index' style='padding:0px 10px; box-sizing: border-box;'>
                            <div>{{item.pAddr | dddressatFormat}}</div>
                            <div>{{item.betVal}}</div>
                        </div>
                    </el-row>
                </div>
            </el-col>

            <el-col :lg="6" :md="6" :sm="6" :xs="12">
                <div class="bet-group-item group-item4">
                    <el-row>
                       <div class="header4">
                            <div class='times times-item'>30X</div>
                            <div class='times'>
                                <div class='max'>Max</div>
                                <div class='trx'>{{max30X}}TRX</div>
                            </div>
                        </div>
                    </el-row>
                    <el-row>
                        <el-col :lg="12" :md="12" :sm="12" :xs="12">    
                            <div class="item-header" style='border-bottom: 1px solid #FFC559;padding-left:10px; box-sizing: border-box;'>
                                <div class="left"><img src="@/assets/img/user4.png" alt=""></div>
                                <div class="right" style='color:#FFC559;'>{{obj30X.detail.length}}</div>
                            </div>
                        </el-col>
                        <el-col :lg="12" :md="12" :sm="12" :xs="12">
                            <div class="item-header1" style='border-bottom: 1px solid #FFC559;padding-right:10px; box-sizing: border-box;'>
                                <div class="left" style='color:#FFC559;'>{{obj30X.totalBetAmt}}</div>
                                <div class="right" style='color:#FFC559;'>TRX</div>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row>
                        <div class="item-record-tab4" v-for="(item, index) in obj30X.detail" :key='index' style='padding:0px 10px; box-sizing: border-box;'>
                            <div>{{item.pAddr | dddressatFormat}}</div>
                            <div>{{item.betVal}}</div>
                        </div>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getBetting } from '@/service/api';
import utilsTron from '@/utilsTron';
export default {
    name: 'betGroup',

    data() {
        return {
            'betPersonCount': 'dsd',
            'obj2X': {
                'totalBetAmt': '',
                'betNum': '',
                'detail': []
            },
            'obj3X': {
                'totalBetAmt': '',
                'betNum': '',
                'detail': []
            },
            'obj5X': {
                'totalBetAmt': '',
                'betNum': '',
                'detail': []
            },
            'obj30X': {
                'totalBetAmt': '',
                'betNum': '',
                'detail': []
            },
            maxOne: 0,
            maxTwo: 0,
            maxThree: 0,
            maxFour: 0,
        }
    },

    computed: {
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
        }

    },

    mounted() {
        this.getBetting();
        this.initData();  
    },

    methods: {
        initData(){
            this.interval = setInterval(this.getBetting, 1000);
        },

        getBetting() {
            getBetting().then(res => {
                this.obj2X = res[0];
                this.obj3X = res[1];
                this.obj5X = res[2];
                this.obj30X = res[3];
            })
        }
    },

    filters:{
        priceFormat(vaule) {
            if (vaule == undefined) {
            return "";
            }
            return parseInt(vaule / Math.pow(10, 6));
        },

        dddressatFormat(addr) {
            if (addr == undefined) {
            return "";
            }
            let addStr = addr.substring(0,4) + '...' + addr.substring(addr.length-4, addr.length);
            return addStr;
        }
    }
}
</script>

<style lang='less' scoped>
    .bet-group {
        margin-top: 20px;
        margin-bottom: 20px;
        @media screen and (max-width: 1440px) and (min-width: 992px) {
            .bet-group-item{
                width:220px;
                text-align:center;
                margin: 0 auto;
                border: 1px solid #00E9E1;
                border-radius: 10px; 
                padding-bottom: 15px;
                box-sizing: border-box;
                .header1 {
                    display: flex;
                    padding: 3px 6px;
                    color: #181845;
                    background: #00E9E1;
                    border-top-left-radius: 9px;
                    border-top-right-radius: 9px;
                    .times{
                        flex: 1;
                    }
                    .times-item{
                        font-size: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    p {
                        padding: 0px;
                        margin: 0px;
                    }    
                }

                .item-header{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    height: 30px;
                    line-height: 30px;
                    border-bottom: 1px solid #039074;
                    margin-top: 10px;
                    padding: 0px 10px; 
                    .right{
                        margin-left: 5px;
                        color: #039074;
                    }
                    .left{
                        color: #039074;
                    }
                }

                .item-header1{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    height: 30px;
                    line-height: 30px;
                    border-bottom: 1px solid #039074;
                    margin-top: 10px;
                    padding: 0px 10px; 
                    .right{
                        margin-left: 5px;
                        color: #039074;
                    }
                    .left{
                        color: #039074;
                    }
                }
            
                .header2 {
                    display: flex;
                    padding: 3px 6px;
                    color: #181845;
                    background: #827EF1;
                    border-top-left-radius: 9px;
                    border-top-right-radius: 9px;
                    .times{
                        flex: 1;
                    }
                    .times-item{
                        font-size: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    p {
                        padding: 0px;
                        margin: 0px;
                    }

                    .item-header{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        height: 30px;
                        line-height: 30px;
                        border-bottom: 1px solid #827EF1;
                        .right{
                            margin-left: 5px;
                            color: #827EF1;
                        }
                    }
                }

                .header3 {
                     display: flex;
                    padding: 3px 6px;
                    color: #181845;
                    background: #fff;
                    border-top-left-radius: 9px;
                    border-top-right-radius: 9px;
                    .times{
                        flex: 1;
                    }
                    .times-item{
                        font-size: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    p {
                        padding: 0px;
                        margin: 0px;
                    }

                    .item-header{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        height: 30px;
                        line-height: 30px;
                        border-bottom: 1px solid #fff;
                        .right{
                            margin-left: 5px;
                            color: #fff;
                        }
                    }
                }

                .header4 {
                    display: flex;
                    padding: 3px 6px;
                    color: #181845;
                    background: #FFC559;
                    border-top-left-radius: 9px;
                    border-top-right-radius: 9px;
                    .times{
                        flex: 1;
                    }
                    .times-item{
                        font-size: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    p {
                        padding: 0px;
                        margin: 0px;
                    }

                    .item-header{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        height: 30px;
                        line-height: 30px;
                        border-bottom: 1px solid #FFC559;
                        .right{
                            margin-left: 5px;
                            color: #FFC559;
                        }
                    }
                }
                .item-record-tab1{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    height: 40px;
                    line-height: 40px;
                    color: #00E9E1;
                }
                .item-record-tab2{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    height: 40px;
                    line-height: 40px;
                    color: #827EF1;
                }
                .item-record-tab3{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    height: 40px;
                    line-height: 40px;
                    color: #fff;
                }
                .item-record-tab4{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    height: 40px;
                    line-height: 40px;
                    color: #FFC559;
                }
            }
            .group-item2{
                border: 1px solid #827EF1;
            }
            
            .group-item3{
                border: 1px solid #fff;
            }

            .group-item4{
                border: 1px solid #FFC559;
            }
        }
        @media screen and (max-width: 3000px) and (min-width: 1440px) {
            .bet-group-item{
                width:260px;
                text-align:center;
                margin: 0 auto;
                border: 1px solid #00E9E1;
                box-sizing: border-box;
                border-radius: 10px;
                padding-bottom: 15px;
                box-sizing: border-box;
                .header1 {
                    display: flex;
                    padding: 3px 6px;
                    color: #181845;
                    background: #00E9E1;
                    border-top-left-radius: 9px;
                    border-top-right-radius: 9px;
                    .times{
                        flex: 1;
                    }
                    .times-item{
                        font-size: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    p {
                        padding: 0px;
                        margin: 0px;
                    }    
                }

                .item-header{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    height: 30px;
                    line-height: 30px;
                    border-bottom: 1px solid #039074;
                    margin-top: 10px;
                    .right{
                        margin-left: 5px;
                        color: #039074;
                    }
                    .left{
                        color: #039074;
                    }
                }

                .item-header1{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    height: 30px;
                    line-height: 30px;
                    border-bottom: 1px solid #039074;
                    margin-top: 10px;
                    .right{
                        margin-left: 5px;
                        color: #039074;
                    }
                    .left{
                        color: #039074;
                    }
                }
            
                .header2 {
                    display: flex;
                    padding: 3px 6px;
                    color: #181845;
                    background: #827EF1;
                    border-top-left-radius: 9px;
                    border-top-right-radius: 9px;
                    .times{
                        flex: 1;
                    }
                    .times-item{
                        font-size: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    p {
                        padding: 0px;
                        margin: 0px;
                    }

                    .item-header{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        height: 30px;
                        line-height: 30px;
                        border-bottom: 1px solid #827EF1;
                        .right{
                            margin-left: 5px;
                            color: #827EF1;
                        }
                        .left{
                            color: #827EF1;
                        }
                    }
                }

                .header3 {
                    display: flex;
                    padding: 3px 6px;
                    color: #181845;
                    background: #fff;
                    border-top-left-radius: 9px;
                    border-top-right-radius: 9px;
                    .times{
                        flex: 1;
                    }
                    .times-item{
                        font-size: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    p {
                        padding: 0px;
                        margin: 0px;
                    }

                    .item-header{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        height: 30px;
                        line-height: 30px;
                        border-bottom: 1px solid #fff;
                        .right{
                            margin-left: 5px;
                            color: #fff;
                        }
                    }
                }

                .header4 {
                    display: flex;
                    padding: 3px 6px;
                    color: #181845;
                    background: #FFC559;
                    border-top-left-radius: 9px;
                    border-top-right-radius: 9px;
                    .times{
                        flex: 1;
                    }
                    .times-item{
                        font-size: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    p {
                        padding: 0px;
                        margin: 0px;
                    }

                    .item-header{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        height: 30px;
                        line-height: 30px;
                        border-bottom: 1px solid #FFC559;
                        .right{
                            margin-left: 5px;
                            color: #FFC559;
                        }
                    }
                }
                .item-record-tab1{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    height: 40px;
                    line-height: 40px;
                    color: #00E9E1;
                }
                .item-record-tab2{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    height: 40px;
                    line-height: 40px;
                    color: #827EF1;
                }
                .item-record-tab3{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    height: 40px;
                    line-height: 40px;
                    color: #fff;
                }
                .item-record-tab4{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    height: 40px;
                    line-height: 40px;
                    color: #FFC559;
                }
            }
            .group-item2{
                border: 1px solid #827EF1;
            }
            
            .group-item3{
                border: 1px solid #fff;
            }

            .group-item4{
                border: 1px solid #FFC559;
            }
        }
    } 

    @media screen and (max-width: 500px) {
        .bet-group {
            margin-top: 20px;
            .bet-group-item{
                width:155px;
                text-align:center;
                margin: 0 auto;
                border: 1px solid #00E9E1;
                box-sizing: border-box;
                border-radius: 10px;
                padding-bottom: 15px;
                box-sizing: border-box;
                .header1 {
                    display: flex;
                    padding: 3px 6px;
                    color: #181845;
                    background: #00E9E1;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    .times{
                        flex: 1;
                    }
                    .times-item{
                        font-size: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    p {
                        padding: 0px;
                        margin: 0px;
                    }    
                }

                .item-header{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    height: 30px;
                    line-height: 30px;
                    border-bottom: 1px solid #00E9E1;
                    margin-top: 10px;
                    .right{
                        margin-left: 5px;
                        color: #00E9E1;
                    }
                    .left{
                        color: #00E9E1;
                    }
                }

                .item-header1{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    height: 30px;
                    line-height: 30px;
                    border-bottom: 1px solid #00E9E1;
                    margin-top: 10px;
                    .right{
                        margin-left: 5px;
                        color: #00E9E1;
                    }
                    .left{
                        color: #00E9E1;
                    }
                }
            
                .header2 {
                    display: flex;
                    padding: 3px 6px;
                    color: #181845;
                    background: #827EF1;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    .times{
                        flex: 1;
                    }
                    .times-item{
                        font-size: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    p {
                        padding: 0px;
                        margin: 0px;
                    }

                    .item-header{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        height: 30px;
                        line-height: 30px;
                        border-bottom: 1px solid #827EF1;
                        .right{
                            margin-left: 5px;
                            color: #827EF1;
                        }
                        .left{
                            color: #827EF1;
                        }
                    }
                }

                .header3 {
                    display: flex;
                    padding: 3px 6px;
                    color: #181845;
                    background: #fff;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    .times{
                        flex: 1;
                    }
                    .times-item{
                        font-size: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    p {
                        padding: 0px;
                        margin: 0px;
                    }

                    .item-header{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        height: 30px;
                        line-height: 30px;
                        border-bottom: 1px solid #fff;
                        .right{
                            margin-left: 5px;
                            color: #fff;
                        }
                        .left{
                            color: #fff;
                        }
                    }
                }

                .header4 {
                    display: flex;
                    padding: 3px 6px;
                    color: #181845;
                    background: #FFC559;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    .times{
                        flex: 1;
                    }
                    .times-item{
                        font-size: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    p {
                        padding: 0px;
                        margin: 0px;
                    }

                    .item-header{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        height: 30px;
                        line-height: 30px;
                        border-bottom: 1px solid #FFC559;
                        .right{
                            margin-left: 5px;
                            color: #FFC559;
                        }
                        .left{
                            color: #FFC559;
                        }
                    }
                }
                .item-record-tab1{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    height: 40px;
                    line-height: 40px;
                    color: #00E9E1;
                }
                .item-record-tab2{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    height: 40px;
                    line-height: 40px;
                    color: #827EF1;
                }
                .item-record-tab3{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    height: 40px;
                    line-height: 40px;
                    color: #fff;
                }
                .item-record-tab4{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    height: 40px;
                    line-height: 40px;
                    color: #FFC559;
                }
            }

            .group-item2{
                border: 1px solid #827EF1;
            }
            
            .group-item3{
                border: 1px solid #fff;
                margin-top: 20px;
            }

            .group-item4{
                border: 1px solid #FFC559;
                margin-top: 20px;
            }
        }
    }
</style>