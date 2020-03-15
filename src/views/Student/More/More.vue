<template>
  <router-view/>
</template>

<script>
export default {
  mounted() {
    document.getElementsByClassName('router_home')[0].classList.remove('active_home')
    document.getElementsByClassName('router_bamboo')[0].classList.remove('active_bamboo')
    document.getElementsByClassName('router_schedule')[0].classList.remove('active_schedule')
    document.getElementsByClassName('router_more')[0].classList.add('active_more')
  },
}
</script>

<style>

</style>