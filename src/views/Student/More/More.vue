<template>
  <div class="home">
    <img class="home_wave" src="../../../assets/student/home/wave.png" alt="wave">
    <div class="home_left">
      <div class="home_left_profile">
        <img class="home_left_profile_img" src="../../../assets/student/home/profile.png" alt="profile">
        <div class="home_left_profile_text">
          <span class="home_left_profile_text_name">{{ name }}</span>
          <span class="home_left_profile_text_title">{{ email }}</span>
        </div>
      </div>
      <div class="home_left_update">
        <span class="home_left_update_title">Every의 새로워진 기능들을<br/><b>확인하세요!</b></span>
        <img class="home_left_update_logo" src="../../../assets/logo.png" alt="logo">
      </div>
      <div class="home_left_not">
        <span>추후에 공개될<br/>예정입니다.</span>
        <img src="../../../assets/student/more/more_img.png" alt="working">
      </div>
    </div>
    <div class="home_right"></div>
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
      email: '불러오는 중'
    }
  },
  computed: {
    idx: function () {
      return parseInt(this.$cookie.get('idx'))
    }
  },
  mounted() {
    document.getElementsByClassName('router_home')[0].classList.remove('active_home')
    document.getElementsByClassName('router_bamboo')[0].classList.remove('active_bamboo')
    document.getElementsByClassName('router_schedule')[0].classList.remove('active_schedule')
    document.getElementsByClassName('router_more')[0].classList.add('active_more')
    axios.get(`${this.url}/member/student/${this.idx}`)
    .then(response => {
      if (response.data.status === 200) {
        this.name = response.data.data.member.name + "님"
        this.email = response.data.data.member.email
      }
    })
    .catch(() => {
      this.$swal('오류','로그인 시간이 만료되었습니다.','error')
      this.$router.push({name: 'login'})
    })
    
    axios.get(`${this.url}/schedule`)
    .then(response => {
      if (response.data.status === 200) {
        this.schedules = response.data.data.schedules
        this.schedules.forEach(schedule => {
          let day = new Date()
          let start = new Date(schedule.start_date + " 00:00:00.000")
          let end = new Date(schedule.end_date + " 23:59:59.000")
          
          if (day >= start && day <= end) {
            this.schedule += 1
          }
        });
      }
    })
    .catch(() => {
      this.$swal('오류','로그인 시간이 만료되었습니다.','error')
      this.$router.push({name: 'login'})
    })
  },
  methods: {
    getDay() {
      const day = new Date()
      let today = day.getFullYear().toString() + "년 " + (day.getMonth() + 1).toString() + "월 " + day.getDate().toString() + "일"
      return today
    },
    toSchedule () {
      this.$router.push({name: 'schedule'})
    },
    hitPost () {
      this.$router.push({path: `/bamboo/hit`})
    }
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
    width: 50%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -ms-flex-direction: column;
    max-width: 500px;
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
          font-size: 20px;
          font-weight: 700;
          text-align: left;
          word-break: break-all;
          @media screen and (max-width: 450px) {
            font-size: 16px; 
          }
          @media screen and (max-width: 350px) {
            font-size: 14px; 
          }
        }
        &_name {
          text-align: left;
          font-size: 32px;
          font-weight: 800;
          @media screen and (max-width: 768px) {
            font-size: 28px;
          }
          @media screen and (max-width: 450px) {
            font-size: 20px;
          }
        }
      }
    }
    &_update {
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
      justify-content: center;
      position: relative;
      @media screen and (max-width: 768px) {
        margin-top: 20px;
        height: 90px;
      }
      @media screen and (max-width: 350px) {
        margin-top: 10px;
      }
      &_logo {
        position: absolute;
        width: 70px;
        height: 70px;
        right: 30px;
        @media screen and (max-width: 850px) {
          right: 20px;
        }
        @media screen and (max-width: 450px) {
          width: 50px;
          height: 50px;
          right: 10px;
        }
      }
      &_title {
        color: #2D008A;
        font-weight: 800;
        font-size: 23px;
        @media screen and (max-width: 768px) {
          font-size: 19px;
        }
        @media screen and (max-width: 350px) {
          font-size: 17px;
        }
        b {
          font-size: 25px;
          font-weight: 800;
          @media screen and (max-width: 768px) {
            font-size: 20px;
          }
        }
      }
    }
    &_not {
      margin-top: 40px;
      position: relative;
      width: 100%;
      border-radius: 16px;
      height: 150px;
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
        height: 120px;
        font-size: 16px;
      }
      @media screen and (max-width: 450px) {
        font-size: 15px;
      }
      @media screen and (max-width: 350px) {
        margin-top: 10px;
      }
      span {
        display: block;
        width: 50%;
        font-weight: 800;
        font-size: 21px;
        @media screen and (max-width: 768px) {
          font-size: 19px;
        }
        @media screen and (max-width: 450px) {
          font-size: 17px;
        }
      }
      img {
        position: absolute;
        height: 70%;
        right: 40px;
        @media screen and (max-width: 450px) {
          right: 50px;
        }
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