<template>
  <div class="schedule_edit">
    <div @click="close" class="schedule_edit_area"></div>
    <div class="schedule_edit_box">
      <div class="schedule_edit_title">
        <span>일정 제목</span>
      </div>
      <input class="schedule_edit_title_input" type="text" v-model="title" placeholder="일정 제목을 입력해주세요." maxlength="20">
      <div class="schedule_edit_title">
        <span>일정 내용</span>
      </div>
      <input class="schedule_edit_title_input" type="text" v-model="content" placeholder="일정에 관한 세부적인 내용을 입력해주세요." maxlength="150">
      <div class="schedule_edit_title">
        <span>일정 시작 날짜</span>
      </div>
      <datepicker :format="format" v-model="start"></datepicker>
      <div class="schedule_edit_title">
        <span>일정 종료 날짜</span>
      </div>
      <datepicker :format="format" v-model="end"></datepicker>
      <div class="schedule_btn">
        <div @click="edit" class="schedule_btn_com">수정</div>
        <div @click="close" class="schedule_btn_can">취소</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import server from '@/models/server'
import Datepicker from 'vuejs-datepicker'
export default {
  props: ['event'],
  data() {
    return {
      format: 'yyyy-MM-dd',
      url: server,
      start: new Date(this.event.start_date),
      end: new Date(this.event.end_date),
      title: this.event.title,
      content: this.event.content,
      idx: this.event.idx
    }
  },
  components: { Datepicker },
  methods: {
    edit() {
      if (this.title && this.content && this.start <= this.end) {
        axios.put(`${this.url}/schedule/${this.idx}`, {
          title: this.title,
          content: this.content,
          start_date: this.getDate(this.start),
          end_date: this.getDate(this.end)
        })
        .then((response) => {
          if (response.data.status === 200) {
            this.$emit('onEdit')
          }
        })
        .catch(() => {
          this.$swal('오류','로그인 시간이 만료되었습니다.','error')
          this.$router.push({name: 'login'})
        })
      } else if (!this.title || !this.content) {
        this.$swal('오류','내용을 입력해주세요.','error')
      } else {
        this.$swal('오류','올바른 날짜가 아닙니다.','error')
      }
    },
    getDate(day) {
      let month = day.getMonth() + 1
      let date = day.getDate()
      if (month < 10) {
        month = "0" + month
      }
      if (date < 10) {
        date = "0" + date
      }
      return day.getFullYear() + "-" + month + "-" + date
    },
    close () {
      this.$emit('close')
    }
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
  left: 0px;
  top: -290px;
  @media screen and (max-width: 450px) {
    left: 0px;
    top: -275px;
  }
  @media screen and (max-width: 350px) {
    width: 250px !important;
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
    font-weight: 700;
    box-sizing: border-box;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
  }
}
.schedule_edit {
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
  z-index: 103;
  padding: 15px;
  &_area {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 104;
  }
  &_box {
    width: 100%;
    height: 570px;
    max-width: 400px;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
    z-index: 105;
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
    @media screen and (max-width: 450px) {
      font-size: 19px;
    }
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