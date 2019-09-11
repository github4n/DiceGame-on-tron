<template>
  <div class='links'>
    <div class='links-content'>
      <div class='content'>
        <div class='content-top'>
          <div class='picture-link'>
            <router-link :to="{ path: '/dice',query:{from:fromAdd} }" style='text-decoration: none;'>
              <div class='picture'>
                <img class='picture-img' src="@/assets/img/icon21.png" alt="">
              </div>
              <p class='picture-explain'>{{$t('betting.Dice')}}</p>
            </router-link>
          </div>
        </div>

        <div class='content-top'>
          <div class='picture-link'>
            <router-link :to="{ path: '/ring' ,query:{from:fromAdd}}" style='text-decoration: none;'>
              <div class='picture' style='padding: 15px 0px;'>
                <img class='picture-img' style='width:30px;' src="@/assets/img/icon22.png" alt="">
              </div>
              <p class='picture-explain'>{{$t('betting.RotaryTable')}}</p>
            </router-link>
          </div>
        </div>

        <div class='content-top'>
          <div class='picture-link'>
            <div class='picture' style='padding: 0px 0px;'>
              <el-tooltip class="item" effect="dark"  placement="top-start">
                <div slot="content" style='width: 268px;'>{{$t('betting.tooltip')}}</div>
                <div style='padding:15px 0px;width:100%;'>
                  <img class='picture-img' style='width:30px;' src="@/assets/img/icon23.png" alt="">
                </div>
              </el-tooltip>
            </div>
            <p class='picture-explain'>COMING SOON</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      baseStepUrl: 'https://www.tronoscar.pro/dice/',
      diceLink: 'https://www.tronoscar.pro/dice/', // dice游戏地址
      ringLink: 'https://www.tronoscar.pro/ring/', // 轮盘游戏地址
      treeLink: 'https://www.tronoscar.pro/tree/', // 铁塔游戏地址

      contents: this.$t('betting.tooltip'),
      fromAdd:'',
    }
  },

  mounted() {
    this.initStepUrl();
  },

  methods: {
    initStepUrl() {
      this.fromAdd = this.$route.query.from;
      if(this.fromAdd) {
        this.diceLink = this.diceLink + '?from=' + this.fromAdd;
        this.ringLink = this.ringLink + '?from=' + this.fromAdd;
        this.treeLink = this.treeLink + '?from=' + this.fromAdd;
      }
    }
  }
}
</script>

<style lang='less' scoped>

  .links{
    width: 100%;
    padding: 0px 10px 10px 10px;
    box-sizing: border-box;
    .links-content{
      .content{
        box-sizing: border-box;
        padding: 10px 0px;
        .content-top{
          box-sizing: border-box;
          .picture-link{
            box-sizing: border-box;
            .picture{
              width: 80%;
              border: 1px solid #00E9E1;
              border-radius: 10px; 
              padding: 10px 0px; 
              margin: 0 auto;
              .picture-img{
               width: 40px;
               margin: auto;
               display: block;
              }
            }
            .picture-explain{
              font-size: 14px;
              padding: 8px;
              margin: 0;
              color: #00E9E1;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
