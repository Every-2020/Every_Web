<template>
  <div class="bamboo">
    <nuxt-child />
  </div>
</template>

<script>
export default {
  name: 'Bamboo',
  mounted () {
    document.getElementsByClassName('router_home')[0].classList.remove('active_home')
    document.getElementsByClassName('router_bamboo')[0].classList.add('active_bamboo')
    document.getElementsByClassName('router_schedule')[0].classList.remove('active_schedule')
    document.getElementsByClassName('router_more')[0].classList.remove('active_more')
  },
  destroyed () {
    this.$cookie.delete('bamboo')
  }
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
