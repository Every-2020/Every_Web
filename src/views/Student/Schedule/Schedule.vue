<template>
  <div class="schedule">
  </div>
</template>

<script>
export default {
  name: 'schedule',
  mounted () {
    document.getElementsByClassName('router_home')[0].classList.remove('active_home')
    document.getElementsByClassName('router_bamboo')[0].classList.remove('active_bamboo')
    document.getElementsByClassName('router_schedule')[0].classList.add('active_schedule')
  },
}
</script>

<style>

</style>