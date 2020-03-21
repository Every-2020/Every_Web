<template>
  <div class="select">
    <div class="select_header">
      <img class="select_back" src="../../assets/register/back.png" @click="$router.push({ name: 'login' })">
      <div>
        <span class="select_header_title">회원가입에 앞서</span>
        <span class="select_header_content">본인의 신분을 선택해주세요!</span>
      </div>
    </div>
    <div class="select_content">
      <div class="select_content_view">
        <div class="select_content_student" @click="onSelect('student')">
          <span class="select_content_title">학생</span>
          <span class="select_content_text">만 7세 ~ 18세</span>
        </div>
        <div class="select_content_between" />
        <div class="select_content_worker" @click="onSelect('worker')">
          <span class="select_content_title">대학생 or 직장인</span>
          <span class="select_content_text">만 19세 이상</span>
        </div>
      </div>
    </div>
    <img class="wave" src="../../assets/register/wave.png" alt="wave">
    <img class="wave_768" src="../../assets/register/wave@768px.png" alt="wave">
  </div>
</template>

<script>
export default {
  methods: {
    onSelect (position) {
      if (position === 'worker') {
        this.$swal('안내', '현재 개발 중입니다.', 'warning')
      } else {
        this.$emit('onSelect', position)
      }
    }
  }
}
</script>

<style lang="scss">
.select {
  display: flex;
  display: -webkit-flex;
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 40px 30px 200px 30px;
  flex-direction: column;
  box-shadow: 0px 0px 30px rgba(128, 128, 128, 0.507);
  -ms-flex-direction: column;
  min-height: 578px;
  @media screen and (max-width: 767px) {
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 80px;
  }
  @media screen and (max-width: 450px) {
    padding: 40px 20px 40px 20px;
  }
  @media screen and (max-width: 350px) {
    min-height: 560px;
    max-height: 560px;
  }
  &_header {
    text-align: left;
    margin-bottom: 40px;
    div {
      display: inline-block;
    }
    &_title {
      font-size: 46px;
      color: #2D008A;
      font-weight: 800;
      @media screen and (max-width: 767px) {
        font-size: 30px;
      }
      @media screen and (max-width: 450px) {
        font-size: 25px;
      }
    }
    &_content {
      display: block;
      margin-top: 5px;
      font-size: 20px;
      font-weight: 700;
      color: #260074;
      @media screen and (max-width: 767px) {
        font-size: 18px;
      }
      @media screen and (max-width: 450px) {
        font-size: 15px;
      }
    }
  }
  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: block;
    &_768 {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      display: none;
      @media screen and (max-width: 767px) {
        display: block;
      }
    }
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
  &_content {
    display: flex;
    display: -webkit-flex;
    flex-grow: 1;
    padding-left: 45px;
    padding-right: 45px;
    height: 198px;
    color: white;
    @media screen and (max-width: 767px) {
      height: 350px;
      padding-left: 30px;
      padding-right: 30px;
    }
    @media screen and (max-width: 450px) {
      padding-left: 5px;
      padding-right: 5px;
    }
    &_title {
      font-weight: 800;
      font-size: 38px;
      @media screen and (max-width: 978px) {
        font-size: 28px;
      }
      @media screen and (max-width: 450px) {
        font-size: 23px;
      }
    }
    &_text {
      font-size: 18px;
      margin-top: 5px;
      display: block;
    }
    &_between {
      flex-grow: 1;
      display: block;
      @media screen and (max-width: 767px) {
        display: none;
      }
    }
    &_student {
      background: url('../../assets/register/student.png');
      max-width: 378px;
      flex-basis: 0;
      flex-grow: 4;
      padding: 35px;
      text-align: left;
      box-shadow: 0px 0px 30px rgba(85, 0, 255, 0.4);
      cursor: pointer;
      @media screen and (max-width: 978px) {
        padding: 28px;
      }
      @media screen and (max-width: 767px) {
        flex-grow: 1;
        max-height: 150px;
        padding: 25px;
      }
    }
    &_worker {
      background: url('../../assets/register/worker.png');
      max-width: 378px;
      flex-basis: 0;
      flex-grow: 4;
      padding: 35px;
      box-shadow: 0px 0px 30px rgba(85, 0, 255, 0.4);
      text-align: left;
      cursor: pointer;
      @media screen and (max-width: 978px) {
        padding: 28px;
      }
      @media screen and (max-width: 767px) {
        flex-grow: 1;
        padding: 25px;
        max-height: 150px;
      }
    }
    &_view {
      display: flex;
      display: -webkit-flex;
      position: relative;
      flex-grow: 1;
      height: 100%;
      color: white;
      @media screen and (max-width: 767px) {
        justify-content: space-between;
        flex-direction: column;
      }
    }
  }
  &_back {
    margin-right: 20px;
    margin-bottom: 20px;
    display: inline-block;
    cursor: pointer;
    @media screen and (max-width: 767px) {
      width: 40px;
      margin-right: 0;
    }
    @media screen and (max-width: 480px) {
      margin-bottom: 10px;
      margin-right: 10px;
      width: 30px;
    }
  }
}
</style>
