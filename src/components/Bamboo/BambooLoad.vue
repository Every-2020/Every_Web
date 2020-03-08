<template>
  <div class="post_load">
    <div class="post_load_header">
      <div class="post_load_header_profile loading"></div>
      <div class="post_load_header_text">
        <div class="post_load_header_title loading"></div>
        <div class="post_load_header_time loading"></div>
      </div>
    </div>
    <div class="post_load_content">
      <div class="post_load_content_first loading"></div>
      <div class="post_load_content_second loading"></div>
      <div class="post_load_content_third loading"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BambooLoad'
}
</script>

<style lang="scss">
@import "@/assets/style/animation.scss";

.loading {
  animation: loading 2s infinite ease-in-out;
  -webkit-animation: loading 2s infinite ease-in-out;
  -o-animation: loading 2s infinite ease-in-out;
  -moz-animation: loading 2s infinite ease-in-out;
}
.post_load {
  background-color: rgb(252, 252, 252);
  width: 100%;
  margin-top: 20px;
  position: relative;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -ms-flex-direction: column;
  padding: 20px;
  padding-bottom: 250px;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
  &_header {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    -ms-flex-direction: row;
    flex-grow: 1;
    &_profile {
      border-radius: 50%;
      width: 35px;
      height: 35px;
      background: rgba(165, 165, 165, .3);
    }
    &_text {
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      -ms-flex-direction: column;
      justify-content: center;
      margin-left: 10px;
    }
    &_title {
      background: rgba(165, 165, 165, .3);
      border-radius: 10px;
      width: 90px;
      height: 8px;
    }
    &_time {
      margin-top: 8px;
      background: rgba(165, 165, 165, .3);
      border-radius: 10px;
      width: 60px;
      height: 8px;
    }
  }
  &_content {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -ms-flex-direction: column;
    flex-grow: 1;
    margin-top: 20px;
    &_first {
      height: 8px;
      width: 40%;
      border-radius: 10px;
      background: rgba(165, 165, 165, .3);
    }
    &_second {
      margin-top: 10px;
      height: 8px;
      width: 70%;
      border-radius: 10px;
      background: rgba(165, 165, 165, .3);
    }
    &_third {
      margin-top: 10px;
      height: 8px;
      width: 60%;
      border-radius: 10px;
      background: rgba(165, 165, 165, .3);
    }
  }
}
</style>