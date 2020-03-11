<template>
  <div class="schedule_add">
    <div class="schedule_add_box">
      <div class="schedule_add_title">
        <span>일정 제목</span>
      </div>
      <input class="schedule_add_title_input" type="text" v-model="title" placeholder="일정 제목을 입력해주세요." maxlength="20">
      <div class="schedule_add_title">
        <span>일정 내용</span>
      </div>
      <input class="schedule_add_title_input" type="text" v-model="content" placeholder="일정에 관한 세부적인 내용을 입력해주세요." maxlength="150">
      <div class="schedule_add_title">
        <span>일정 시작 날짜</span>
      </div>
      <datepicker :format="format" v-model="start"></datepicker>
      <div class="schedule_add_title">
        <span>일정 종료 날짜</span>
      </div>
      <datepicker :format="format" v-model="end"></datepicker>
      <div class="schedule_btn">
        <div class="schedule_btn_com">추가</div>
        <div class="schedule_btn_can">취소</div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
  props: ['day'],
  data() {
    return {
      start: '',
      end: '',
      title: '',
      content: '',
      format: 'yyyy-MM-dd'
    }
  },
  components: { Datepicker },
  mounted() {
    document.getElementsByTagName('body')[0].classList.add('not_scroll')
    this.start = this.day
    this.end = this.day
  },
  destroyed() {
    document.getElementsByTagName('body')[0].classList.remove('not_scroll')
  },
}
</script>

<style lang="scss">
.not_scroll{
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%
}
.vdp-datepicker__calendar {
  @media screen and (max-width: 450px) {
    left: 0px;
    top: -275px;
  }
  @media screen and (max-width: 350px) {
    left: -50px;
  }
}
.vdp-datepicker {
  div {
    input {
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.123);
      border-radius: 15px;
      width: 70%;
      height: 40px;
      color: #2D008A;
      font-weight: 800;
      text-align: center;
      font-size: 15px;
      margin-top: 10px;
      border: none;
      margin-bottom: 30px;
      &:focus {
        outline: none;
      }
    }
  }
}
.schedule_btn {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  height: 74px;
  position: relative;
  &_com {
    flex-grow: 1;
    height: 40px;
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.123);
    background-color: #2D008A;
    border-radius: 13px;
    cursor: pointer;
    color: white;
    font-weight: 700;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
  &_can {
    cursor: pointer;
    height: 40px;
    flex-grow: 1;
    margin-left: 30px;
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.123);
    border-radius: 13px;
    box-sizing: border-box;
    border: 1px solid rgb(197, 197, 197);
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
  }
}
.schedule_add {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  z-index: 101;
  padding: 15px;
  &_box {
    width: 100%;
    height: 570px;
    max-width: 400px;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
    background: white;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -ms-flex-direction: column;
    padding: 40px;
    text-align: left;
    @media screen and (max-width: 350px) {
      height: 500px;
      padding: 20px;
    }
  }
  &_title {
    color: #2D008A;
    font-size: 21px;
    font-weight: 800;
    &_input {
      margin-top: 10px;
      margin-bottom: 30px;
      background-color: #E8E8E8;
      border: none;
      padding: 15px;
      width: 100%;
      font-size: 15px;
      height: 40px;
      &::placeholder {
        color: rgb(184, 184, 184);
        font-weight: 700;
      }
      &:focus {
        outline: none;
      }
    }
  }
  &_date {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.123);
    border-radius: 15px;
    width: 70%;
    height: 40px;
    color: #2D008A;
    font-weight: 800;
    text-align: center;
    font-size: 15px;
    margin-top: 10px;
    border: none;
    margin-bottom: 30px;
    &:focus {
      outline: none;
    }
  }
}
</style>