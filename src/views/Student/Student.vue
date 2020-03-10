<template>
  <div class="main">
    <div class="main_header">
      <div class="main_header_nav">
        <div class="main_header_nav_container">
          <div @click="refresh" class="main_header_nav_container_logo">
            <img src="../../assets/logo.png" alt="logo">
          </div>
          <div class="main_header_nav_container_logo">
            <router-link to="/">
              <div class="router_home"></div>
            </router-link>
            <router-link to="bamboo">
              <div class="router_bamboo"></div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="main_container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'student',
  methods: {
    refresh () {
      history.go(0)
    }
  }
}
</script>

<style lang="scss">
.router {
  &_home {
    background: url('../../assets/student/home.png');
    background-size: cover;
    width: 30px;
    height: 30px;
    @media screen and (max-width: 450px) {
      width: 20px;
      height: 20px;
    }
  }
  &-link-exact-active &_home {
    background: url('../../assets/student/homeSelect.png');
    background-size: cover;
  }
  &_bamboo {
    background: url('../../assets/student/bamboo.png');
    background-size: cover;
    margin-left: 20px;
    width: 30px;
    height: 30px;
    @media screen and (max-width: 450px) {
      width: 20px;
      height: 20px;
    }
  }
  &-link-exact-active &_bamboo {
    background: url('../../assets/student/bambooSelect.png');
    background-size: cover;
  }
}
.main {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -ms-flex-direction: column;
  width: 100%;
  position: relative;
  &_header {
    position: relative;
    width: 100%;
    height: 60px;
    display: flex;
    display: -webkit-flex;
    z-index: 50;
    margin: 0 0;
    @media screen and (max-width: 767px) {
      height: 50px;
    }
    &_nav {
      position: fixed;
      width: 100%;
      flex-grow: 1;
      height: inherit;
      flex-shrink: 0;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
      background: white;
      border-bottom: #D6D6D6 solid 1px;
      &_container {
        flex-grow: 1;
        flex-shrink: 0;
        padding: 0 20px;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        max-width: 800px;
        color: white;
        &_logo {
          flex-grow: 1;
          font-weight: 800;
          font-size: 24px;
          letter-spacing: -1.5px;
          text-align: left;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          cursor: pointer;
          img {
            width: 55px;
            @media screen and (max-width: 450px) {
              width: 40px;
            }
          }
        }
      }
    }
  }
  &_container {
    display: flex;
    display: -webkit-flex;
    position: relative;
    flex-grow: 1;
    flex-shrink: 0;
  }
}
</style>