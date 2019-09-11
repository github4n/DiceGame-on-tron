<template>
  <div class='rules-box'>
    <div class='rules-title'>
      <div class='rules-msg'>
        <h2 class='title'>{{$t('betting.Rules')}}</h2>
        <!-- <p class='go-back' @click="goBack()">({{$t('betting.GoBack')}})</p> -->
      </div>
      <div class='rules-content'>
        <h4 class="rules">{{$t('rules.num1')}}</h4>
        <h4 class="rules">{{$t('rules.num2')}}</h4>
        <h4 class="rules">{{$t('rules.num3')}}</h4>
        <h4 class="rules">{{$t('rules.num4')}}</h4>
        <h4 class="rules">{{$t('rules.num5')}}</h4>
        <h4 class="rules">{{$t('rules.num6')}}</h4>
        <h3 class="rules">{{$t('rules.num7')}}</h3>
        <h4 class="rules">{{$t('rules.num8')}}</h4>
        <h4 class="rules">{{$t('rules.num9')}}</h4>
        <h3><a style='color:#fff;text-decoration: none;' href='https://link.medium.com/3ZE8xKBBEW'>{{$t('rules.Details')}}</a></h3>
        <div class='footer-title'>
          <hr class="hrSty"/>
          <font class="spanSty">{{$t('betting.Reserved')}}</font>
          <hr class="hrSty"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },

  methods:{
    goBack(){
      this.$router.go(-1);
    }
  }
}
</script>

<style lang='less' scoped>
  .rules-box{
    width: 100%;
    padding: 0px 20px;
    box-sizing: border-box;
    .rules-msg{
      display: flex;
      justify-content: center;
      align-items: center;
      .title{
        color: #055D4D;
      }
      .go-back{
        color: #2cb89c;
        cursor: pointer;
      }
    }
    .rules-content{
      .rules{
        text-align: left;
        color: #055D4D;
      }
      .footer-title{
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        .hrSty{
          float:left;
          width:10%;
          height: 1px; 
          border: none; 
          background-color: rgba(150, 141, 141, 0.65);
        }
        .spanSty{
          width: 80%;
          float:left;
          color: rgba(255, 255, 255, 0.43);
        }
      }
    }
  }
 
</style>
