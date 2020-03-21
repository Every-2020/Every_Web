<template>
  <div class="screen">
    <nuxt />
  </div>
</template>

<style lang="scss">
@import url('~/assets/style/common.scss');
#__layout {
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
