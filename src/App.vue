<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$store.state.login === false) {
      this.$router.push({ name: 'login' })
    }
  },
}
</script>

<style lang="scss">
@font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: normal;
  src: url('./fonts/noto-sans-kr-v12-latin-regular.eot');
  src: local('Noto Sans KR Regular'), local('NotoSansKR-Regulat'),
       url('./fonts/noto-sans-kr-v12-latin-regular.woff2') format('woff2'),
       url('./fonts/noto-sans-kr-v12-latin-regular.woff') format('woff'),
       url('./fonts/NotoSansCJKkr-Black.otf') format('otf'),
       url('./fonts/noto-sans-kr-v12-latin-regular.svg') format('svg');
}
#app {
  font-family: 'Noto Sans KR';
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
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
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
