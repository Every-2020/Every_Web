<template>
  <div class="home_profile">
    <img class="home_profile_img" src="~assets/student/home/profile.png" alt="profile">
    <div class="home_profile_text">
      <span class="home_profile_text_title">환영합니다!</span>
      <span class="home_profile_text_name">{{ name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeProfile',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.home_profile {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  height: 80px;
  @media screen and (max-width: 768px) {
    height: 50px;
  }
  &_img {
    width: 80px;
    height: 80px;
    @media screen and (max-width: 768px) {
      width: 50px;
      height: 50px;
    }
  }
  &_text {
    margin-left: 20px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -ms-flex-direction: column;
    justify-content: center;
    &_title {
      font-size: 25px;
      font-weight: 700;
      text-align: left;
      @media screen and (max-width: 768px) {
        font-size: 22px;
      }
    }
    &_name {
      text-align: left;
      font-size: 33px;
      font-weight: 800;
      @media screen and (max-width: 768px) {
        font-size: 28px;
      }
    }
  }
}
</style>
