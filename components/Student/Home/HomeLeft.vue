<template>
  <div class="home_left">
    <home-profile :name="name" />
    <home-schedule :today="today" :count="schedule" />
    <home-bamboo />
  </div>
</template>

<script>
import axios from 'axios'
import HomeProfile from '~/components/Student/Home/HomeProfile'
import HomeSchedule from '~/components/Student/Home/HomeSchedule'
import HomeBamboo from '~/components/Student/Home/HomeBamboo'
export default {
  name: 'HomeLeft',
  components: {
    HomeProfile,
    HomeSchedule,
    HomeBamboo
  },
  data () {
    return {
      name: '불러오는 중',
      schedules: {},
      schedule: -1,
      today: this.getDay()
    }
  },
  mounted () {
    document.getElementsByClassName('router_home')[0].classList.add('active_home')
    document.getElementsByClassName('router_bamboo')[0].classList.remove('active_bamboo')
    document.getElementsByClassName('router_more')[0].classList.remove('active_more')
    document.getElementsByClassName('router_schedule')[0].classList.remove('active_schedule')

    axios.get(`${this.$store.state.url}/member/student/${this.$store.state.idx}`)
      .then((res) => {
        if (res.data.status === 200) {
          this.name = res.data.data.member.name + '님'
        }
      })
      .catch(() => {
        this.$swal('오류', '로그인 시간이 만료되었습니다.', 'error')
        this.$router.push({ name: 'login' })
      })

    axios.get(`${this.$store.state.url}/schedule`)
      .then((res) => {
        if (res.data.status === 200) {
          this.schedule = 0
          this.schedules = res.data.data.schedules
          this.schedules.forEach((schedule) => {
            const day = new Date()
            const start = new Date(schedule.start_date + ' 00:00:00.000')
            const end = new Date(schedule.end_date + ' 23:59:59.000')

            if (day >= start && day <= end) {
              this.schedule += 1
            }
          })
        }
      })
      .catch(() => {
        this.$swal('오류', '로그인 시간이 만료되었습니다.', 'error')
        this.$router.push({ name: 'login' })
      })
  },
  methods: {
    getDay () {
      const day = new Date()
      const today = day.getFullYear().toString() + '년 ' + (day.getMonth() + 1).toString() + '월 ' + day.getDate().toString() + '일'
      return today
    }
  }
}
</script>

<style lang="scss">
.home_left {
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
}
</style>
