<template>
  <div id="nuxt_load">
    <div id="nuxt_load_text">
      Loading...
    </div>
    <i class="fas fa-spinner fa-pulse" />
  </div>
</template>

<script>
export default {
  name: 'NuxtLoad'
}
</script>

<style lang="scss">
#nuxt_load {
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  -ms-flex-direction: column;
  &_text {
    font-size: 38px;
    font-weight: 700;
  }
  i {
    display: block;
    font-size: 30px;
    color: gray;
    margin-top: 30px;
  }
}
</style>
