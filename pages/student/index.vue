<template>
  <div class="home">
    <img class="home_wave" src="~assets/student/home/wave.png" alt="wave">
    <home-left />
    <home-right />
  </div>
</template>

<script>
import HomeLeft from '~/components/Student/Home/HomeLeft'
import HomeRight from '~/components/Student/Home/HomeRight'
export default {
  name: 'Home',
  components: {
    HomeLeft,
    HomeRight
  },
  mounted () {
    document.getElementsByClassName('router_home')[0].classList.add('active_home')
    document.getElementsByClassName('router_bamboo')[0].classList.remove('active_bamboo')
    document.getElementsByClassName('router_more')[0].classList.remove('active_more')
    document.getElementsByClassName('router_schedule')[0].classList.remove('active_schedule')
  },
  head () {
    return {
      title: 'Every'
    }
  }
}
</script>

<style lang="scss">
.home {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  position: relative;
  padding: 30px;
  justify-content: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    -ms-flex-direction: column;
    justify-content: start;
  }
  @media screen and (max-width: 450px) {
    padding: 25px;
  }
  @media screen and (max-width: 350px) {
    padding: 20px;
  }
  &_wave {
    position: fixed;
    width: 100%;
    z-index: -1;
    bottom: 0;
    left: 0;
  }
}
</style>
