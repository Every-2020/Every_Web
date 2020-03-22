<template>
  <div class="home_schedule" @click="toSchedule">
    <span class="home_schedule_title">오늘의 일정</span>
    <div class="home_schedule_calendar">
      <img class="home_schedule_calendar_img" src="~assets/student/home/calendar.png" alt="calendar">
      <span>{{ today }}</span>
    </div>
    <span v-if="count === -1" class="home_schedule_today">일정을 불러오고 있습니다.</span>
    <span v-else-if="count === 0" class="home_schedule_today">오늘은 일정이 없습니다.</span>
    <span v-else class="home_schedule_today">{{ count }}개의 일정이 있습니다.</span>
  </div>
</template>

<script>
export default {
  name: 'HomeSchedule',
  props: {
    count: {
      type: Number,
      required: true
    },
    today: {
      type: String,
      required: true
    }
  },
  methods: {
    toSchedule () {
      this.$router.push({ name: 'student-schedule' })
    }
  }
}
</script>

<style lang="scss">
.home_schedule {
  margin-top: 80px;
  width: 100%;
  border-radius: 16px;
  height: 140px;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
  background-color: #fff;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -ms-flex-direction: column;
  padding: 20px;
  text-align: left;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    margin-top: 20px;
    height: 110px;
  }
  @media screen and (max-width: 350px) {
    margin-top: 10px;
  }
  &_title {
    color: black;
    font-weight: 800;
    font-size: 18px;
    @media screen and (max-width: 768px) {
      font-size: 16px;
    }
  }
  &_calendar {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    margin-top: 15px;
    @media screen and (max-width: 768px) {
      margin-top: 10px;
    }
    &_img {
      width: 28px;
      @media screen and (max-width: 768px) {
        width: 20px;
      }
    }
    span {
      margin-left: 5px;
      color: #2D008A;
      font-size: 22px;
      font-weight: 800;
      @media screen and (max-width: 768px) {
        font-size: 19px;
      }
    }
  }
  &_today {
    margin-top: 5px;
    font-size: 18px;
    color: #2D008A;
    font-weight: 400;
    @media screen and (max-width: 768px) {
      font-size: 16px;
    }
  }
}
</style>
