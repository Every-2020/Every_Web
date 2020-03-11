<template>
  <div class="schedule_list">
    <div class="schedule_list_area">
      <div @click="addEvent" class="schedule_list_add schedule_list_box">
        <img class="schedule_list_add_img" src="../../../assets/student/schedule/add.png" alt="add">
        <span>일정 추가하기</span>
      </div>
      <div class="schedule_list_box column" v-for="(event, index) in events" :key="index">
        <div class="schedule_list_title">
          <img src="../../../assets/student/schedule/calendar.png" alt="calendar">
          <span>{{getTitle(event.title)}}</span>
        </div>
        <div class="schedule_list_content">
          <span>{{getDate(event.start_date, event.end_date)}}</span>
        </div>
      </div>
    </div>
    <schedule-add
      v-if="add"
      :day="selectDay"
    />
  </div>
</template>

<script>
import ScheduleAdd from '@/components/Student/Schedule/ScheduleAdd.vue'
export default {
  data() {
    return {
      add: false
    }
  },
  name: 'ScheduleList',
  props: ['events', 'selectDay'],
  components: { ScheduleAdd },
  methods: {
    addEvent() {
      this.add = true
    },
    getTitle(title) {
      if (title.length < 10) {
        return title
      }
      return title.substr(0, 9) + "..."
    },
    getDate(start, end) {
      let string = start.substr(0,4) + "년 " + start.substr(5, 2) + "월 " + start.substr(8, 2) + "일"

      if (start.substr(0,4) === end.substr(0,4)) {
        if (start.substr(5,2) === end.substr(5, 2)) {
          if (start === end) {
            return string
          }
          return string + " ~ " + end.substr(8, 2) + "일"
        }
        return string + " ~ " + end.substr(5, 2) + "월 " + end.substr(8, 2) + "일"
      }
      return string + " ~ " + end.substr(0,4) + "년 " + end.substr(5, 2) + "월 " + end.substr(8, 2) + "일"
    }
  },
}
</script>

<style lang="scss">
.column {
  flex-direction: column;
  -ms-flex-direction: column;
}
.schedule_list {
  width: 100%;
  height: 100%;
  &_area {
    width: 100%;
    height: 100%;
    padding: 30px 20px 30px 20px;
    overflow-y: scroll;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -ms-flex-direction: column;
    align-items: center;
  }
  &_add {
    background-color: #fff !important;
    color: #2D008A;
    font-size: 20px;
    align-items: center;
    font-weight: 800;
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
    padding: 20px;
  }
  &_title {
    display: flex;
    display: -webkit-flex;
    img {
      width: 24px;
      height: 24px;
    }
    span {
      font-size: 20px;
      color: white;
      font-weight: 800;
      margin-left: 5px;
    }
  }
  &_content {
    margin-top: 5px;
    color: white;
    font-size: 16px;
  }
}
</style>