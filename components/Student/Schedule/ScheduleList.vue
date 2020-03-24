<template>
  <div class="schedule_list">
    <div class="schedule_list_area" @scroll.passive="scroll">
      <div class="schedule_list_add schedule_list_box" @click="addEvent">
        <img class="schedule_list_add_img" src="~/assets/student/schedule/add.png" alt="add">
        <span>일정 추가하기</span>
      </div>
      <div v-for="(event, index) in events" :key="index" class="schedule_list_box column" @click="view(event)">
        <img class="calendar_" src="~/assets/student/schedule/calendar_.png" alt="calendar_">
        <div class="schedule_list_title">
          <img src="~/assets/student/schedule/calendar.png" alt="calendar">
          <span>{{ getTitle(event.title) }}</span>
        </div>
        <div class="schedule_list_content">
          <span>{{ getDate(event.start_date, event.end_date) }}</span>
        </div>
      </div>
    </div>
    <div class="schedule_list_btn none" @click="addEvent">
      <img class="schedule_list_btn_img" src="~/assets/student/schedule/add.png" alt="add">
    </div>
    <div class="schedule_list_btn_2" @click="addEvent">
      <img class="schedule_list_btn_img" src="~/assets/student/schedule/add.png" alt="add">
    </div>
    <schedule-add
      v-if="add"
      :day="selectDay"
      @onAdd="refresh"
      @close="close"
    />
    <schedule-view
      v-if="show"
      :event="select"
      :date="selectDate"
      @onBack="back"
      @onRefresh="refresh"
    />
  </div>
</template>

<script>
import ScheduleView from '~/components/Student/Schedule/ScheduleView.vue'
import ScheduleAdd from '~/components/Student/Schedule/ScheduleAdd.vue'
export default {
  name: 'ScheduleList',
  components: {
    ScheduleAdd,
    ScheduleView
  },
  props: {
    events: {
      type: Array,
      required: true
    },
    selectDay: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      add: false,
      select: '',
      show: false,
      selectDate: ''
    }
  },
  methods: {
    view (event) {
      this.selectDate = this.getDate(event.start_date, event.end_date)
      this.select = event
      this.show = true
    },
    addEvent () {
      this.add = true
    },
    getTitle (title) {
      if (title.length < 10) {
        return title
      }
      return title.substr(0, 9) + '...'
    },
    getDate (start, end) {
      const string = start.substr(0, 4) + '년 ' + start.substr(5, 2) + '월 ' + start.substr(8, 2) + '일'

      if (start.substr(0, 4) === end.substr(0, 4)) {
        if (start.substr(5, 2) === end.substr(5, 2)) {
          if (start === end) {
            return string
          }
          return string + ' ~ ' + end.substr(8, 2) + '일'
        }
        return string + ' ~ ' + end.substr(5, 2) + '월 ' + end.substr(8, 2) + '일'
      }
      return string + ' ~ ' + end.substr(0, 4) + '년 ' + end.substr(5, 2) + '월 ' + end.substr(8, 2) + '일'
    },
    refresh () {
      this.close()
      this.$emit('Refresh')
    },
    close () {
      this.show = false
      this.add = false
    },
    scroll () {
      const el = document.getElementsByClassName('schedule_list_area')[0]
      if (el.scrollTop >= 100) {
        document.getElementsByClassName('schedule_list_btn')[0].classList.remove('none')
      } else {
        document.getElementsByClassName('schedule_list_btn')[0].classList.add('none')
      }
    },
    back () {
      this.show = false
    }
  }
}
</script>

<style lang="scss">
.none {
  display: none !important;
}
.column {
  flex-direction: column;
  -ms-flex-direction: column;
}
.calendar_ {
  position: absolute;
  width: 80px;
  bottom: 0;
  right: 40px;
  @media screen and (max-width: 450px) {
    width: 70px;
  }
}
.schedule_list {
  padding: 30px 20px 30px 20px;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 450px) {
    padding: 10px 20px;
  }
  @media screen and (max-width: 350px) {
    padding: 10px 15px;
  }
  &_area {
    width: 100%;
    height: 100%;
    -ms-overflow-style: none;
    scrollbar-width: none;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -ms-flex-direction: column;
    position: relative;
    align-items: center;
    @media screen and (min-width: 980px) {
      overflow-y: scroll;
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
   &_btn {
    cursor: pointer;
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
    position: absolute;
    right: 30px;
    bottom: 30px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 980px) {
      display: none !important;
    }
    img {
      width: 40px;
    }
  }
  &_btn_2 {
    cursor: pointer;
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
    display: none;
    @media screen and (max-width: 980px) {
      right: 150px;
      position: fixed;
      bottom: 70px;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
    }
    @media screen and (max-width: 767px) {
      right: 70px;
    }
    @media screen and (max-width: 450px) {
      right: 40px;
      bottom: 40px;
    }
    @media screen and (max-width: 350px) {
      right: 40px;
      bottom: 40px;
    }
    img {
      width: 40px;
    }
  }
  &_add {
    background-color: #fff !important;
    color: #2D008A;
    font-size: 20px;
    align-items: center;
    font-weight: 800;
    display: block;
    @media screen and (max-width: 980px) {
      display: none !important;
    }
    &_img {
      width: 28px;
    }
    span {
      margin-left: 10px;
    }
  }
  &_box {
    margin-top: 20px;
    cursor: pointer;
    border-radius: 22px;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
    background-color: #2D008A;
    height: 75px;
    width: 100%;
    max-width: 350px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    text-align: left;
    padding-left: 20px;
    position: relative;
    @media screen and (max-width: 980px) {
      max-width: 450px;
    }
    @media screen and (max-width: 450px) {
      width: 100%;
      max-width: 350px;
      height: 70px;
    }
  }
  &_title {
    display: flex;
    display: -webkit-flex;
    img {
      width: 24px;
      height: 24px;
      @media screen and (max-width: 450px) {
        width: 19px;
        height: 19px;
      }
      @media screen and (max-width: 350px) {
        width: 17px;
        height: 17px;
      }
    }
    span {
      font-size: 20px;
      color: white;
      font-weight: 800;
      margin-left: 5px;
      @media screen and (max-width: 450px) {
        font-size: 18px;
      }
      @media screen and (max-width: 350px) {
        font-size: 17px;
      }
    }
  }
  &_content {
    margin-top: 5px;
    color: white;
    font-size: 16px;
    @media screen and (max-width: 450px) {
      font-size: 13.5px;
    }
    @media screen and (max-width: 350px) {
      font-size: 12.8px;
    }
  }
}
</style>
