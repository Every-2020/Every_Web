<template>
  <div class="schedule">
    <div class="schedule_box">
      <div class="schedule_box_left">
        <schedule-calendar
          :eventCategories="eventCategories"
          :events="events"
          @onClick="dayPick"
        />
      </div>
      <div class="schedule_box_right">
        <schedule-list
          :events="filteredEvent"
          :selectDay="selectedDay"
          @Refresh="refresh"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import server from '@/models/server'
import ScheduleCalendar from '@/components/Student/Schedule/ScheduleCalendar.vue'
import ScheduleList from '@/components/Student/Schedule/ScheduleList.vue'
export default {
  name: 'schedule',
  data() {
    return {
      url: server,
      events: [],
      eventList: [],
      selected: '',
      selectedDay: '',
      filteredEvent: [],
      eventCategories: [
        {
          id: 1,
          title: 'Personal',
          textColor: 'white',
          backgroundColor: '#2D008A'
        }
      ]
    }
  },
  watch: {
    selected: function () {
      this.filteredEvent = []
      this.eventList.forEach(event => {
        let select = this.selected.getTime()
        let start = new Date(event.start_date + " 00:00:00.000")
        let end = new Date(event.end_date + " 23:59:59.000")

        start = start.getTime()
        end = end.getTime()
        if (select >= start && select < end) {
          this.filteredEvent.push(event)
        }
      });
    }
  },
  mounted () {
    document.getElementsByClassName('router_home')[0].classList.remove('active_home')
    document.getElementsByClassName('router_bamboo')[0].classList.remove('active_bamboo')
    document.getElementsByClassName('router_schedule')[0].classList.add('active_schedule')
    axios.get(`${this.url}/schedule`)
    .then(response => {
      if (response.data.status === 200) {
        this.eventList = response.data.data.schedules
        for(let event of this.eventList) {
          this.events.push({
            categoryId: 1,
            start: event.start_date,
            end: event.end_date,
            title: event.title
          })
        }
        this.dayPick(new Date())
      }
    })
    .catch(() => {
      this.$swal('오류','로그인 시간이 만료되었습니다.','error')
      this.$router.push({name: 'login'})
    })
  },
  components: {
    ScheduleCalendar,
    ScheduleList
  },
  methods: {
    dayPick (day) {
      this.selected = day
      let month = day.getMonth() + 1
      let date = day.getDate()
      if (month < 10) {
        month = "0" + month
      }
      if (date < 10) {
        date = "0" + date
      }
      this.selectedDay = day.getFullYear() + "-" + month + "-" + date
    },
    refresh () {
      history.go(0)
    }
  },
}
</script>

<style lang="scss">
.schedule {
  display: flex;
  display: -webkit-flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px;
  @media screen and (max-width: 980px) {
    padding-left: 100px;
    padding-right: 100px;
  }
  @media screen and (max-width: 767px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media screen and (max-width: 450px) {
    padding: 10px;
  }
  &_box {
    position: relative;
    width: 100%;
    max-width: 1100px;
    height: 595px;
    background: white;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
    display: flex;
    display: -webkit-flex;
    @media screen and (max-width: 980px) {
      flex-direction: column;
      -ms-flex-direction: column;
      height: 1000px;
    }
    @media screen and (max-width: 450px) {
      height: 900px;
    }
    @media screen and (max-width: 350px) {
      height: 800px;
    }
    &_left {
      position: relative;
      width: 50%;
      height: 100%;
      box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
      padding: 30px;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
      @media screen and (max-width: 980px) {
        width: 100%;
        height: auto;
      }
      @media screen and (max-width: 450px) {
        padding: 20px;
      }
    }
    &_right {
      position: relative;
      width: 50%;
      height: 100%;
      @media screen and (max-width: 980px) {
        width: 100%;
      }
    }
  }
}
</style>