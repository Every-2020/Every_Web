<template>
  <div class="bamboo">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'bamboo',
  mounted () {
    document.getElementsByClassName('router_home')[0].classList.remove('active_home')
    document.getElementsByClassName('router_bamboo')[0].classList.add('active_bamboo')
    document.getElementsByClassName('router_schedule')[0].classList.remove('active_schedule')
    document.getElementsByClassName('screen')[0].style.backgroundColor = "#FCFCFC"
  },
  destroyed() {
    document.getElementsByClassName('screen')[0].style.backgroundColor = "#F2F2F2"
  },
  methods: {
    onPageView (idx) {
      this.index = idx
      this.show = true
    },
    close () {
      this.show = false
    }
  },
}
</script>

<style lang="scss">
.bamboo {
  text-align: center;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  position: relative;
  * {
    box-sizing: border-box;
  }
}
</style>