<template>
    <div class='tc-box'>
        <div class="tc">
            <img @click="closeDialog()"  class="del-icon" src="../../assets/img/delete.png" alt="">
            <div class='content-box'>
                <pc-banner></pc-banner>
                <pc-activity></pc-activity>
                <pc-countDown></pc-countDown>
                <pc-winning></pc-winning>
                <pc-tables></pc-tables>
                <pc-previous-period-result></pc-previous-period-result>
                <pc-buy-rules></pc-buy-rules>
                <pc-coupons></pc-coupons>
                <pc-rules></pc-rules>
            </div>
        </div>
    </div> 
    
</template>
<script>
import pcBanner from '../contents/banner' 
import pcCountDown from '../contents/countDown' 
import pcTables from '../contents/table-list' // 用户奖券排行榜
import pcPreviousPeriodResult from '../contents/previousPeriodResult' // 上期结果
import pcRules from '../contents/rules' // 规则详情
import pcCoupons from '../contents/coupons' // 我的奖券
import pcWinning from '../contents/winning' //中奖号码buyRules
import pcBuyRules from '../contents/buyRules' //购买奖券
import pcActivity from '../contents/activity' //活动
export default {
components: { pcBanner , pcCountDown , pcTables , pcPreviousPeriodResult , pcRules , pcCoupons , pcWinning , pcBuyRules , pcActivity},
    data() {
        return {
        };
    },
    mounted() {
        //console.log("store:=====>",store);
    },
    methods:{
      closeDialog() {
        this.$emit('closeContent');
      },

    }
};
</script>

<style lang='less' scoped>
.tc-box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.87);
    overflow-y: auto;
    z-index: 999;
    .tc{
        z-index: 9999;
        //background: url(../../assets/imgs/background.png) no-repeat;
        width:1100px;
        margin: 0 auto;
        position: relative;
        margin-top: 18px;
        border-radius: 5px;
        .del-icon{
            position: absolute;
            top: -18px;
            right: -35px;
            width: 25px;
            cursor: pointer;
        }
        .content-box{
            background: url(../../assets/imgs/background.png) no-repeat;
            border-radius: 5px;
            //order: 1px solid #0a6552;//565656
            background-size: 100% 100%;
            overflow-y:auto;
            width: 1100px;
            //height:660px;
        }
    }
}




</style>
