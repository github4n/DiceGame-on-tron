<template>
  <div class='level-box'>
    <div class="level-content"> 
      <span class="levelSpan">//&nbsp;&nbsp;&nbsp;{{$t('inviterPage.myGrades')}}&nbsp;&nbsp;&nbsp;//</span><br/>
      <img src="../../assets/imgs/icon3-yqr.png" alt='' /><br/>
      <span class="levelSpan">{{$t('inviterPage.myGrades')}}：5</span>
    </div>
    <div class="level-progress">
      <el-progress class="progress" :text-inside="true" :stroke-width="25" :percentage="43" color="#34a58f"></el-progress><!-- #34a58f  #343e45e0-->
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
     
    }
  }
}
</script>

<style lang='less' scoped>
.level-box{
  width: 100%;
  .level-content{
    .levelSpan{
      font-size:24px;
      color:#fff;
    }
  }
  .level-progress{
    width:892px;
    margin: 50px auto;
    .progress.el-progress-bar__outer{
      background-color: red !important;
    }
    .progress .el-progress.is-success .el-progress-bar__inner{
      background-color: #34a58f !important;

    }
  }
}

@media screen and (max-width: 500px) {
  .level-box{
    width: 100%;
    box-sizing: border-box;
    .level-content{
      .levelSpan{
        font-size:24px;
        color:#fff;
      }
    }
    .level-progress{
      width:80%;
      margin: 20px auto;
      .progress.el-progress-bar__outer{
        background-color: red !important;
      }
      .progress .el-progress.is-success .el-progress-bar__inner{
        background-color: #34a58f !important;

      }
    }
  }
}


</style>
