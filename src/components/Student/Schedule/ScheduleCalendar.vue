<template>
  <div id="sweetCalendar">
    <div class="container calendar">
      <div class="header">
        <div
          class="left-arrow"
          @click="prevMonth"
        >
          <img src="../../../assets/student/schedule/arrow.png" alt="arrow">
        </div>
        <div class="month">{{ selectedMonthName }}, {{ selectedYear }}</div>
        <div
          class="right-arrow"
          @click="nextMonth"
        >
          <img src="../../../assets/student/schedule/arrow.png" alt="arrow">
        </div>
      </div>
      <div class="body">
        <div
          v-for="(day, index) in weekdays"
          :key="`day-name-${index + 1}`"
          class="day-name"
          :title="day"
        >
          {{ day[0] }}{{ day[1] }}
        </div>
        <div
          v-for="(day,index) in days"
          :key="index"
          class="day-container"
        >
          <div
            class="before"
            v-if="day"
            :style="generateBeforeStyle(day)"
          >&nbsp;</div>
          <div
            v-if="day"
            :class="[
            'day',
            `day-${day.getDate()},
            weekday-${day.getDay()}`,
            offDays.includes(day.getDay()) ? 'off-day' : null,
            day.toDateString() === today.toDateString() ? 'today' : null
            ]"
            :style="generateDayStyle(day)"
            @click="onClick(day.getDate())"
          >
            <span>{{ day.getDate() }}</span>
          </div>
          <div
            class="after"
            v-if="day"
            :style="generateAfterStyle(day)"
          >&nbsp;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import date from '@/models/date.js'
export default {
  name: 'Calendar',
  data () {
    return {
      today: new date(),
      date: null,
      weekdays: null
    }
  },
  computed: {
    days () {
      let emptyDays = Array((this.startWeekDayOfMonth - this.firstDayOfWeek + 7) % 7).fill(null)
      let days = Array(this.numberOfDays).fill().map((item, index) => new date(this.selectedYear, this.selectedMonth, index + 1))
      return emptyDays.concat(days)
    },
    startWeekDayOfMonth () {
      return this.date.getFirstWeekdayOfMonth()
    },
    numberOfDays () {
      return this.date.getNumberOfDaysInMonth()
    },
    selectedMonth () {
      return this.date.getMonth()
    },
    selectedMonthName () {
      return this.date.getMonthName()
    },
    selectedYear () {
      return this.date.getFullYear()
    }
  },
  methods: {
    prevMonth () {
      this.date = new date(this.selectedYear, this.selectedMonth - 1, 1)
    },
    nextMonth () {
      this.date = new date(this.selectedYear, this.selectedMonth + 1, 1)
    },
    generateWeekdayNames (firstDayOfWeek = 1) {
      let weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      for (let i = 2; i <= firstDayOfWeek; i++) {
        let first = weekdays.shift()
        weekdays.push(first)
      }
      return weekdays
    },
    generateDayStyle (date) {
      let style = {}
      for (let event of this.events) {
        if (date.isInRange(event.start, event.end, event.repeat)) {
          let category = this.eventCategories.find(item => item.id === event.categoryId) || {}
          Object.assign(style, {
            color: category.id ? category.textColor : null,
            backgroundColor: category.id ? category.backgroundColor : null,
          })
        }
      }
      return style
    },
    generateBeforeStyle (date) {
      let style = {}
      for (let event of this.events) {
        if (date.isInRange(event.start, event.end, event.repeat) && date.getPrevDay().isInRange(event.start, event.end, event.repeat)) {
          let category = this.eventCategories.find(item => item.id === event.categoryId) || {}
          Object.assign(style, {
            backgroundColor: category.backgroundColor
          })
        }
      }
      return style
    },
    generateAfterStyle (date) {
      let style = {}
      for (let event of this.events) {
        if (date.isInRange(event.start, event.end, event.repeat) && date.getNextDay().isInRange(event.start, event.end, event.repeat)) {
          let category = this.eventCategories.find(item => item.id === event.categoryId) || {}
          Object.assign(style, {
            backgroundColor: category.backgroundColor
          })
        }
      }
      return style
    },
    goToday () {
      this.date = this.today
    }
  },
  props: {
    initialDate: {
      type: String,
      default: null
    },
    firstDayOfWeek: {
      type: Number,
      default: 1 // 1: Sunday, 2: Monday, etc
    },
    eventCategories: {
      type: Array,
      default () {
        return []
      }
    },
    events: {
      type: Array,
      default () {
        return []
      }
    },
    offDays: {
      type: Array,
      default () {
        return []
      }
    },
    onClick(day) {
      const Day = new Date(this.selectedYear + this.selectedMonthName + day)
      console.log(Day)
      
    }
  },
  beforeMount () {
    this.date = Date.parse(this.initialDate) ? new date(this.initialDate) : new date()
    this.weekdays = this.generateWeekdayNames(this.firstDayOfWeek)
  }
}
</script>

<style lang="sass" scoped>

#sweetCalendar
  width: 100%
  .container
    display: grid
    grid-template-rows: 40px 1fr

    .header
      align-items: center
      display: grid
      grid-column-gap: 5px
      grid-template-columns: 50px 1fr 50px
      color: #2D008A

      .month
        justify-self: center
        font-size: 30px
        font-weight: 800

      .left-arrow
        justify-self: end

        img
          width: 30px
          cursor: pointer
          transform: rotate(180deg)
          -o-transform: rotate(180deg)
          -webkit-transform: rotate(180deg)
          -ms-transform: rotate(180deg)
          -moz-transform: rotate(180deg)

      .right-arrow
        justify-self: start

        img
          cursor: pointer
          width: 30px

    .body
      margin-top: 20px
      align-items: center
      display: grid
      grid-row-gap: 30px
      grid-template-columns: repeat(7, 1fr)
      grid-template-rows: repeat(7, 1fr)
      justify-items: center

      .day-name
        color: white
        font-weight: 800
        font-size: 21px

      .day-container
        display: grid
        grid-auto-columns: 1fr 1fr
        grid-auto-flow: column
        height: 40px
        position: relative
        width: 100%

        .day
          align-content: center
          border-radius: 14px
          box-sizing: content-box
          color: #2D008A
          display: grid
          height: 20px
          justify-content: center
          left: 50%
          padding: 10px
          position: absolute
          top: 50%
          transform: translate(-50%, -50%)
          width: 20px
          cursor: pointer
          font-weight: 800
          &:hover
            background-color: rgb(124, 85, 202) !important
            color: white !important
          &.today
            background-color: #BD9113 !important

          span
            font-size: 18px
            margin: 0
            padding: 0
            width: fit-content

  .calendar
    background-color: inherit

    .body
      .day-container
        .before
          height: 40px

        .after
          height: 40px

  .date-picker
    background-color: inherit

    .body
      .day-container
        .day
          &:hover
            // background-color: $selection-hover-color
            // border: 2px solid $selected-color
            cursor: pointer

          &.selected
            // border: 2px solid $selected-color
            // color: $selected-color

</style>