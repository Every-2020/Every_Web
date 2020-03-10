<template>
  <div class="home">
    <img class="home_wave" src="../../../assets/student/home/wave.png" alt="wave">
    <div class="home_left">
      <div class="home_left_profile">
        <img class="home_left_profile_img" src="../../../assets/student/home/profile.png" alt="profile">
        <div class="home_left_profile_text">
          <span class="home_left_profile_text_title">환영합니다!</span>
          <span class="home_left_profile_text_name">{{ name }}</span>
        </div>
      </div>
      <div class="home_left_schedule">
        <span class="home_left_schedule_title">오늘의 일정</span>
        <div class="home_left_schedule_calendar">
          <img class="home_left_schedule_calendar_img" src="../../../assets/student/home/calendar.png" alt="calendar">
          <span>{{ today }}</span>
        </div>
        <span class="home_left_schedule_today" v-if="schedule === 0">오늘은 일정이 없습니다.</span>
        <span class="home_left_schedule_today" v-else>{{schedule}}개의 일정이 있습니다.</span>
      </div>
      <div class="home_left_bamboo">
        <span>오늘의 대나무숲 인기 게시글을<br><b>확인하세요!</b></span>
        <img class="home_left_bamboo_img" src="../../../assets/student/home/bamboo.png" alt="bamboo">
        <img class="home_left_bamboo_next" src="../../../assets/student/home/next.png" alt="next">
      </div>
    </div>
    <meals></meals>
  </div>
</template>

<script>
import server from '@/models/server'
import axios from 'axios'
export default {
  name: 'home',
  data() {
    return {
      url: server,
      name: '불러오는 중',
      schedules: {},
      schedule: 0,
      today: this.getDay(),
    }
  },
  components: {
    Meals: () => import('@/components/Student/Home/HomeMeals.vue')
  },
  computed: {
    idx: function () {
      return this.$store.getters.getIdx
    }
  },
  mounted() {
    document.getElementsByClassName('router_home')[0].classList.add('active_home')
    document.getElementsByClassName('router_bamboo')[0].classList.remove('active_bamboo')
    document.getElementsByClassName('router_schedule')[0].classList.remove('active_schedule')
    axios.get(`${this.url}/member/student/${this.idx}`)
    .then(response => {
      if (response.data.status === 200) {
        this.name = response.data.data.member.name + "님"
      }
    })
    
    axios.get(`${this.url}/schedule`)
    .then(response => {
      if (response.data.status === 200) {
        this.schedules = response.data.data.schedules
        this.schedules.forEach(schedule => {
          let day = new Date()
          let start = new Date(schedule.start_date + " 00:00:00.000")
          let end = new Date(schedule.end_date + " 00:00:00.000")
          
          day = day.getTime()
          start = start.getTime()
          end = end.getTime()
          if (day > start || day < end) {
            this.schedule += 1
          }
        });
      }
    })
  },
  methods: {
    getDay() {
      const day = new Date()
      let today = day.getFullYear().toString() + "년 " + (day.getMonth() + 1).toString() + "월 " + day.getDate().toString() + "일"
      return today
    },
  },
}
</script>

<style lang="scss">
.home {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  overflow: scroll;
  position: relative;
  padding: 30px;
  justify-content: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    -ms-flex-direction: column;
    justify-content: start;
  }
  @media screen and (max-width: 450px) {
    padding: 25px;
  }
  @media screen and (max-width: 350px) {
    padding: 20px;
  }
  &_wave {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  &_left {
    width: 40%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -ms-flex-direction: column;
    max-width: 450px;
    @media screen and (max-width: 768px) {
      max-width: 100%;
      width: 100%;
    }
    &_profile {
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
    &_schedule {
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
    &_bamboo {
      cursor: pointer;
      margin-top: 40px;
      position: relative;
      width: 100%;
      border-radius: 16px;
      height: 110px;
      box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
      background-color: #2D008A;
      padding: 20px;
      text-align: left;
      font-size: 18px;
      font-weight: 800;
      line-height: 25px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      color: white;
      @media screen and (max-width: 768px) {
        margin-top: 20px;
        height: 80px;
        font-size: 16px;
      }
      @media screen and (max-width: 450px) {
        font-size: 15px;
      }
      @media screen and (max-width: 350px) {
        margin-top: 10px;
      }
      b {
        font-weight: 800;
        font-size: 21px;
        @media screen and (max-width: 768px) {
          font-size: 19px;
        }
        @media screen and (max-width: 450px) {
          font-size: 17px;
        }
      }
      &_img {
        position: absolute;
        height: 100%;
        right: 60px;
        top: 0;
      }
      &_next {
        position: absolute;
        width: 30px;
        right: 20px;
        @media screen and (max-width: 768px) {
          width: 20px;
        }
      }
    }
  }
}
</style>