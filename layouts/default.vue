<template>
  <div class="screen">
    <nuxt />
  </div>
</template>

<script>
// import FontFaceObserver from 'fontfaceobserver/fontfaceobserver'
export default {
  mounted () {
    const agent = navigator.userAgent.toLowerCase()
    if ((navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1) || (agent.search('msie') !== -1)) {
      alert('본 페이지는 Internet Explor를 지원하지 않습니다. Chrome을 설치해주세요.')
      self.close()
    }
    // font load FOUT 최소화
    // document.documentElement.classList.add('blocking-time')
    // setTimeout(() => {
    //   document.documentElement.classList.remove('blocking-time')
    // }, 400)
    // const font = new FontFaceObserver('NanumSquare')
    // font.load(null, 3000).then(() => {
    //   document.documentElement.classList.add('fonts-loaded')
    // })
  },
  destroyed () {
    this.$cookie.delete('bamboo')
  }
}
</script>

<style lang="scss">
@import url('~/assets/style/common.scss');

body {
  font-family: 'NanumSquare', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  text-align: center;
  color: black;
}
html, body {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
img, .not_select {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.screen {
  max-width: 100%;
  min-height: 100vh;
  background-color: var(--bg-screen);
  display: flex;
  display: -webkit-flex;
  position: relative;
}
</style>
