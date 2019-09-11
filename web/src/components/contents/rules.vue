<template>
  <div class='rules-box'>
    <div class='rules-title'>
      <p style="font-size: 20px;">{{$t('rules.title')}}</p>
      <div class='rules-content'>
      <h4 class="rules">{{$t('rules.num1')}}</h4>
      <h4 class="rules">{{$t('rules.num2')}}</h4>
      <h3 class="rules">{{$t('rules.num3')}}</h3>
      <h4 class="rules">{{$t('rules.num4')}}</h4>
      <h3 class="rules">{{$t('rules.num5')}}</h3> 
      <h4 class="rules">{{$t('rules.num6')}}</h4>
      <h3 class="rules">{{$t('rules.num7')}}</h3>
      <h4 class="rules">{{$t('rules.num8')}}</h4>
      <h4 class="rules">{{$t('rules.num9')}}</h4>
      <h3><a href="https://link.medium.com/3ZE8xKBBEW" >{{$t('rules.Details')}}</a></h3>
      <hr class="hrSty"/>
      <font class="spanSty">{{$t('betting.Reserved')}}</font>
      <hr class="hrSty"/>
      <p>&nbsp;</p> 
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
   computed:{
    'langularType': function(){
      return this.$store.getters.GET_LANGUAR_TYPE;
    }
  }
}
</script>

<style lang='less' scoped>
  .rules-box{
    width: 920px;
    margin: 0 auto;
    color: #055D4D;
  }
  .rules{
    text-align: left;
  }
  .hrSty{
    float:left;
    width:295px;
    height: 1px; 
    border: none; 
    background-color: rgba(150, 141, 141, 0.65);
  }
  .spanSty{
    width: 330px;
    float:left;
    color: rgba(255, 255, 255, 0.43);
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
