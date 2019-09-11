<template>
  <div class="footer-box">
      <div class="footer-icon">
        <div>
          <img @click="checkOscar()" src="../../assets/img/header.png" class="logo">
        </div>

        <div>

          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">
              <span>oscar-official@outlook.com</span>
            </div>
            <img src="../../assets/images/outlook.jpg" class="outlook">
          </el-tooltip>

          <a style='inline-block;margin-right:10px;' target="_blank" href="https://twitter.com/Oscar">
            <img style="width:30px;" src="../../assets/images/tw.jpg">
          </a>

          <a style='inline-block;margin-right:10px;' target="_blank" href="https://t.me/Oscar_Official">
            <img style="width:30px;" src="../../assets/images/telegra.png">
          </a>

          <a style='inline-block;margin-right:10px;' target="_blank" href="https://discord.gg/APKBQAN">
            <img style="width:30px;" src="../../assets/images/discord.jpg">
          </a>

          <a style='inline-block;margin-right:10px;' target="_blank" href="https://medium.com/@Oscar">
            <img style="width:30px;" src="../../assets/images/medium.jpg">
          </a>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'appFooter',

    data(){
      return {
      }
    },

    methods: {
      checkOscar() {
        let pdfName = '';
        if(localStorage.getItem('langType') == 'zh'){
          pdfName = 'TRONOSCAR-Whitepaper-CN';
        }else if(localStorage.getItem('langType') == 'en'){
          pdfName = 'TRONOSCAR-Whitepaper-EN';
        }
        const {href} = this.$router.resolve({
          path: '/pdf',
          query: {
            pdf: pdfName
          }
        })
        //window.open('https://www.oscar.pro/pdf?pdf='+pdfName,'_blank');
        window.open('https://www.tronoscar.pro/pdf?pdf='+pdfName,'_blank');
      }
    }
  }
</script>

<style lang="less" scoped>
  .footer-box{
      width: 100%;
      padding: 10px 0;
      background:#181845;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
    .footer-icon{
      width: 1400px;
      margin: 0 auto;
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .logo {
        position: absolute;
        left: 0;
        width: 100px;
        top: 2px;
      }
      .outlook {
        margin-right: 10px;
        width: 30px;
      }
      .weixin {
        right: 40px;
        width: 30px;
        //margin-left: 20px;
      }
      .twitter {
        right: 0px;
        width: 30px;
      }
      a{
        text-decoration: none;
        cursor: pointer;
        color: #d5c69b;
      }
      a:hover{
        opacity: .7;
      }
    }
  }
</style>
