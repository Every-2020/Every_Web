<template>
  <div class="login_left">
    <div class="login_left_header">
      <span class="login_left_title">What is Every?</span>
      <div class="login_left_under" />
    </div>
    <div class="login_left_content">
      <span>Every</span>는 당신을 위해 다양하고 편리한<br>
      기능을 제공하고 새로운 사람들과<br>
      소통을 할 수 있도록 도와줍니다.<br>
      이제 당신의 일상에 Every를 함께하세요!
    </div>
    <button class="login_left_btn" @click="onClick">
      회원가입
    </button>
    <img class="wave" src="~/assets/login/wave.png" alt="wave">
    <img class="bubble" src="~/assets/login/bubble.png" alt="bubble">
  </div>
</template>

<script>
export default {
  name: 'LoginLeft',
  methods: {
    onClick () {
      this.$router.push({ name: 'register' })
    }
  }
}
</script>

<style lang="scss">
.login_left {
  flex-grow: 1;
  flex-basis: 0;
  position: relative;
  padding-top: 85.4px;
  flex-direction: column;
  -ms-flex-direction: column;
  padding-bottom: calc(50% - 60px);
  padding-left: calc(20% - 20px);
  text-align: left;
  color: var(--text-color-white);
  display: none;
  background-color: var(--main-color-box-login);
  @media screen and (min-width: 768px) {
    padding-left: 40px;
    padding-bottom: 180px;
    display: block !important;
  }
  .wave {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  .bubble {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 8%;
  }
  &_title {
    font-size: 32px;
    font-weight: 800;
    @media screen and (max-width: 767px) {
      font-size: 28px;
    }
  }
  &_under {
    width: 108px;
    height: 4px;
    margin-top: 5px;
    border-radius: 10px;
    border-color: var(--under-white);
    @media screen and (max-width: 767px) {
      height: 3px;
    }
  }
  &_content {
    margin-top: 30px;
    font-size: 18px;
    line-height: 25px;
    font-weight: 700;
    span {
      font-size: 26px;
      font-weight: 800;
      @media screen and (max-width: 767px) {
        font-size: 18px;
      }
    }
    @media screen and (max-width: 767px) {
      font-size: 14px;
    }
  }
  &_btn {
    width: 144px;
    height: 56px;
    border-radius: 29px;
    padding: 0;
    color: var(--text-color-white);
    cursor: pointer;
    background: none;
    margin-top: 50px;
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: 600;
    box-sizing: border-box;
    border: 3px solid var(--text-color-white);
    text-align: center;
    @media screen and (max-width: 767px) {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
}
</style>
