<template>
  <div class="post_header">
    <div class="post_header_img">
      <img src="../../assets/bamboo/profile.png" alt="profile">
    </div>
    <div class="post_header_content">
      <div class="post_header_content_title">
        <span>#{{ idx }}번째 이야기</span>
      </div>
      <div class="post_header_content_time">
        <span :title="created.substring(0, 19)">{{ time }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    idx: Number,
    time: String,
    created: String
  },
}
</script>

<style lang="scss">
.post_header {
  width: 100%;
  height: 45px;
  display: flex;
  display: -webkit-flex;
  &_img {
    img {
      width: 50px;
    }
  }
  &_content {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -ms-flex-direction: column;
    margin-left: 14px;
    justify-content: center;
    text-align: left;
    &_title {
      font-weight: 800;
      font-size: 18px;
    }
    &_time {
      color: gray;
      font-size: 16px;
      span {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  
}
</style>