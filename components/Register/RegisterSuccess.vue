<template>
  <div class="register_success">
    <div class="register_success_title">
      회원가입 완료!
    </div>
    <div class="register_success_content">
      정상적으로 회원가입이 완료되었습니다!
    </div>
    <button class="register_success_btn" @click="onClick">
      로그인 하기
    </button>
    <img class="wave" src="../../assets/register/wave_success.png" alt="wave">
    <img class="wave_768" src="../../assets/register/wave_success@768.png" alt="wave">
  </div>
</template>

<script>
export default {
  methods: {
    onClick () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang='scss'>
.register_success {
  display: flex;
  display: -webkit-flex;
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 40px 30px 40px 30px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  -ms-flex-direction: column;
  min-height: 578px;
  max-height: 578px;
  @media screen and (max-width: 450px) {
    padding: 40px 20px 40px 20px;
  }
  @media screen and (max-width: 350px) {
    min-height: 560px;
    max-height: 560px;
  }
  &_title {
    font-weight: 800;
    font-size: 50px;
    color: #2D008A;
    @media screen and (max-width: 767px) {
      font-size: 28px;
    }
  }
  &_content {
    margin-top: 5px;
    color: #2D008A;
    font-size: 30px;
    @media screen and (max-width: 767px) {
      font-size: 14px;
    }
  }
  &_btn {
    border: none;
    color: white;
    font-weight: bold;
    font-size: 18px;
    margin-top: 25px;
    width: 189px;
    height: 38px;
    cursor: pointer;
    background-color: #8A51FF;
    @media screen and (max-width: 767px) {
      font-size: 15px;
      width: 166px;
      height: 33px;
    }
  }
  .wave {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    @media screen and (max-width: 767px) {
      display: none;
    }
    &_768 {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      display: none;
      @media screen and (max-width: 767px) {
        display: block;
      }
    }
  }
}
</style>
