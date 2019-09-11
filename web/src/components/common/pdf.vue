<template>
  <div class='pdf'>
    <!-- <iframe id='iframebox' ref='pdfiframe' :src="src" width="100%" height="300"></iframe> -->
    <iframe id='iframebox' ref='pdfiframe' :src="src" width="100%"></iframe>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        src: '/static/pdf/brochure.pdf',
        pdf: ''
      }
    },

    mounted () {
      this.getParams();
      this.getPdfInfo()
      this.changeIframeBox()
    },

     methods: {
      getParams () {
        try {
          let pdf = this.$route.query.pdf;
          this.pdf = pdf;
        } catch (err) {}
      },

      changeIframeBox () {
        const iframebox = document.getElementById('iframebox')
        const deviceWidth = document.documentElement.clientWidth;
        const deviceHeight = document.documentElement.clientHeight;
        iframebox.style.width = (Number(deviceWidth)) + 'px';
        iframebox.style.height = (Number(deviceHeight)) + 'px';
      },

      getPdfInfo () {
        let name = this.pdf
        let src = '/ring/static/pdf/' + name + '.pdf';
        this.src = src;
      }
    }

  }
</script>
