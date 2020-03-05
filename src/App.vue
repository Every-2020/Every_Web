<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <div class="screen">
      <router-view/>
    </div>
  </div>
</template>

<script>
import server from '@/models/server'
import axios from 'axios'
export default {
  data() {
    return {
      url: server
    }
  },
  mounted() {
    // if (this.$cookie.get('access')) {
    //   console.log(this.$cookie.get('access'));
      axios.defaults.headers.common['token'] = this.$cookie.get('access')
    //   this.$router.push({ name: 'bamboo' })
    // } else {
      // this.$router.push({ name: 'login' })
    // }
    //Scroll Cookie Delete
    this.$cookie.delete('bamboo')
    //IE Check
    const agent = navigator.userAgent.toLowerCase()
    if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
      alert("본 페이지는 Internet Explor를 지원하지 않습니다. Chrome을 설치해주세요.");
      self.close()
    }
  },
  methods: {
    schoolSubmit (obj) {
      obj.style.background = "rgba(216, 216, 216, 0.442)"
    },
  }
}
</script>

<style lang="scss">
@import "@/assets/style/common.scss";
.slide-enter-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: ease-in;
   -webkit-transition-timing-function: ease-in;
   -o-transition-timing-function: ease-in;
   transition-timing-function: ease-in;
}
.slide-leave-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
.slide-enter-to, .slide-leave {
  max-height: 100px;
  overflow: hidden;
}
.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}
#app {
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
  background-color: #F2F2F2;
  display: flex;
  display: -webkit-flex;
  overflow: hidden;
}
.slide-leave-active,
.slide-enter-active {
  transition: 1s;
  position: absolute;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
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
.swal2-confirm {
  background-color: #7E40FF !important;
}
</style>
