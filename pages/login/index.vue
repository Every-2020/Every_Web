<template>
  <div class="login">
    <div class="login_box">
      <font-awesome-icon ref="i" :icon="['fas', 'exchange-alt']" @click="change" />
      <login-left />
      <login-right />
    </div>
  </div>
</template>

<script>
import LoginLeft from '@/components/Login/LoginLeft.vue'
import LoginRight from '@/components/Login/LoginRight.vue'
export default {
  name: 'Login',
  components: {
    LoginLeft,
    LoginRight
  },
  methods: {
    change () {
      this.$refs.i.classList.toggle('active')
      if (this.$refs.i.classList.contains('active')) {
        document.getElementsByTagName('svg')[0].style.color = 'var(--text-color-white)'
        document.getElementsByClassName('login_left')[0].style.display = 'flex'
        document.getElementsByClassName('login_right')[0].style.display = 'none'
      } else {
        document.getElementsByTagName('svg')[0].style.color = 'var(--main-color-box-login)'
        document.getElementsByClassName('login_left')[0].style.display = 'none'
        document.getElementsByClassName('login_right')[0].style.display = 'flex'
      }
    }
  },
  head () {
    return {
      title: 'Every'
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/style/color.scss";
.login {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 40px 40px;
  background-color: #F2F2F2;
  @media screen and (max-width: 350px) {
    padding: 0 5px;
  }
  svg {
    z-index: 1;
    position: absolute;
    right: 30px;
    top: 30px;
    cursor: pointer;
    display: none;
    color: #7E40FF;
    @media screen and (max-width: 767px) {
      display: block;
    }
  }
  &_box {
    display: flex;
    display: -webkit-flex;
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;
    height: auto;
    overflow: hidden;
    max-width: 1042px;
    box-shadow: 0px 0px 30px var(--box-shadow-login);
    @media screen and (max-width: 767px) {
      max-width: 400px;
      min-height: 500px;
      max-height: 500px;
    }
  }
}
</style>
