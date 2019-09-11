<template>
  <div class="app-footer-box">
      <div class="footer-icon">
        <div class="left">
          <img @click="checkOscar()" src="../../assets/img/header.png" class="logo">
        </div>

        <div class="right">
           <a style='inline-block;' href="https://t.me/tronoscar">
            <img style="width:30px;margin-right: 10px;" src="../../assets/img/icon1.png">
          </a>

          <a style='inline-block;'  href="https://twitter.com/TronOscar1">
            <img style="width:30px;margin-right: 10px;" src="../../assets/img/icon2.png">
          </a>

          <a style='inline-block;'  href="https://medium.com/@TronOscar1">
            <img style="width:30px;margin-right: 10px;" src="../../assets/img/icon3.png">
          </a>

          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">
              <span>TronOscar.Official@gmail.com</span>
            </div>
            <img @click='copyNum' style='width:30px;margin-right: 10px;' src="../../assets/img/icon4.png" class="outlook">
          </el-tooltip>

          <!-- <a style='inline-block;' href="https://medium.com/@Oscar">
            <img style="width:30px;" src="../../assets/img/icon5.png">
          </a> -->
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'appFooter',

    data(){
      return {}
    },

    methods: {
      copyNum() {
        var oInput = document.createElement("input");
        oInput.value = "TronOscar.Official@gmail.com";
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令

        const h = this.$createElement;
        this.$message({
          message: h('p', { style: 'color: #181945' }, this.$t("betting.mailCopy")),
          //type: "info"
          duration: 1000,
        });
      },

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
        window.open(href, '_blank')
      }
    }
  }
</script>

<style lang="less" scoped>
  .app-footer-box{
      width: 100%;
      background: #181845;
      padding-top: 10px;
      padding-left: 15px;
      padding-right: 15px;
      box-sizing: border-box;
    .footer-icon{
      margin: 0 auto; 
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .left{
        .logo {
          position: absolute;
          height: 30px;
          top: -2px;
        }
      }
      .right{
        .pciture{
          display: inline-block;
        }
        .outlook {
          margin-right: 10px;
          width: 25px;
        }
        .weixin {
          width: 25px;
        }
        .twitter {
          right: 0px;
          width: 25px;
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
  }
</style>
