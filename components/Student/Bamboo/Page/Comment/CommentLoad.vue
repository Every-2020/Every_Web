<template>
  <div class="comment_area">
    <div class="comment_area_content">
      <div class="comment_profile comment_load_profile loading" />
      <div class="comment_area_box comment_load_box">
        <div class="comment_area_box_content">
          <div class="comment_load_title loading" />
          <div class="comment_load_first loading" />
          <div class="comment_load_second loading" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageCommentLoad'
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
.comment_load {
  &_box {
    width: 100% !important;
  }
  &_title {
    width: 50px;
    background: rgb(216, 216, 216);
    border-radius: 10px;
    height: 13px;
  }
  &_first {
    margin-top: 10px;
    width: 80%;
    background: rgb(223, 223, 223);
    border-radius: 10px;
    height: 13px;
  }
  &_second {
    margin-top: 10px;
    width: 60%;
    background: rgb(223, 223, 223);
    border-radius: 10px;
    height: 13px;
    margin-bottom: 40px;
  }
  &_profile {
    border-radius: 50%;
  }
}
</style>
