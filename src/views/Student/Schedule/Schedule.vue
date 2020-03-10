<template>
  <div class="schedule">
    <div class="schedule_box">
      <div class="schedule_box_left">
        <schedule-calendar
          :eventCategories="eventCategories"
          :events="events"
        />
      </div>
      <div class="schedule_box_right">

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import server from '@/models/server'
import ScheduleCalendar from '@/components/Student/Schedule/ScheduleCalendar.vue'
export default {
  name: 'schedule',
  data() {
    return {
      url: server,
      events: [],
      eventList: [],
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
      }
    })
  },
  components: {
    ScheduleCalendar
  }
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
    padding: 100px;
  }
  &_box {
    position: relative;
    z-index: 50;
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
      height: 800px;
    }
    &_left {
      position: relative;
      width: 50%;
      height: 100%;
      padding: 30px;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
    }
    &_right {
      position: relative;
      width: 50%;
      height: 100%;
    }
  }
}
</style>