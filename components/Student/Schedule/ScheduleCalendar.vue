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
        <div class="month">
          {{ selectedMonthName }}, {{ selectedYear }}
        </div>
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
            v-if="day"
            class="before"
            :style="generateBeforeStyle(day)"
          >
            &nbsp;
          </div>
          <div
            v-if="day"
            :class="[
              'day',
              `day-${day.getDate()},
              weekday-${day.getDay()}`,
              offDays.includes(day.getDay()) ? 'off-day' : null,
              day.toDateString() === today.toDateString() ? 'today' : null,
              day.toDateString() === select.toDateString() ? 'selected' : null
            ]"
            :style="generateDayStyle(day)"
            @click="onClick(day.getDate())"
          >
            <span>{{ day.getDate() }}</span>
          </div>
          <div
            v-if="day"
            class="after"
            :style="generateAfterStyle(day)"
          >
            &nbsp;
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewDate from '~/models/date.js'
export default {
  name: 'Calendar',
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
    }
  },
  data () {
    return {
      today: new NewDate(),
      select: new NewDate(),
      date: null,
      weekdays: null
    }
  },
  computed: {
    days () {
      const emptyDays = Array((this.startWeekDayOfMonth - this.firstDayOfWeek + 7) % 7).fill(null)
      const days = Array(this.numberOfDays).fill().map((item, index) => new NewDate(this.selectedYear, this.selectedMonth, index + 1))
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
  beforeMount () {
    this.date = Date.parse(this.initialDate) ? new NewDate(this.initialDate) : new NewDate()
    this.weekdays = this.generateWeekdayNames(this.firstDayOfWeek)
  },
  methods: {
    prevMonth () {
      this.date = new NewDate(this.selectedYear, this.selectedMonth - 1, 1)
    },
    nextMonth () {
      this.date = new NewDate(this.selectedYear, this.selectedMonth + 1, 1)
    },
    generateWeekdayNames (firstDayOfWeek = 1) {
      const weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      for (let i = 2; i <= firstDayOfWeek; i++) {
        const first = weekdays.shift()
        weekdays.push(first)
      }
      return weekdays
    },
    generateDayStyle (date) {
      const style = {}
      for (const event of this.events) {
        if (date.isInRange(event.start, event.end, event.repeat)) {
          const category = this.eventCategories.find(item => item.id === event.categoryId) || {}
          Object.assign(style, {
            color: category.id ? category.textColor : null,
            backgroundColor: category.id ? category.backgroundColor : null
          })
        }
      }
      return style
    },
    generateBeforeStyle (date) {
      const style = {}
      for (const event of this.events) {
        if (date.isInRange(event.start, event.end, event.repeat) && date.getPrevDay().isInRange(event.start, event.end, event.repeat)) {
          const category = this.eventCategories.find(item => item.id === event.categoryId) || {}
          Object.assign(style, {
            backgroundColor: category.backgroundColor,
            border: '1px solid ' + category.backgroundColor
          })
        }
      }
      return style
    },
    generateAfterStyle (date) {
      const style = {}
      for (const event of this.events) {
        if (date.isInRange(event.start, event.end, event.repeat) && date.getNextDay().isInRange(event.start, event.end, event.repeat)) {
          const category = this.eventCategories.find(item => item.id === event.categoryId) || {}
          Object.assign(style, {
            border: '1px solid ' + category.backgroundColor,
            backgroundColor: category.backgroundColor
          })
        }
      }
      return style
    },
    goToday () {
      this.date = this.today
    },
    onClick (day) {
      let month = this.selectedMonth
      if (this.selectedMonth < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      const Day = new Date(this.selectedYear + '-' + month + '-' + day)
      this.$emit('onClick', Day)
      this.today = Day
    }
  }
}
</script>

<style lang="scss">

#sweetCalendar {
  width: 100%;
  .container {
    display: grid;
    grid-template-rows: 40px 1fr;
    @media screen and (max-width: 450px) {
      grid-template-rows: 20px 1fr;
    }
    .header {
      align-items: center;
      display: grid;
      column-gap: 5px;
      -webkit-column-gap: 5px;
      -moz-column-gap: 5px;
      grid-template-columns: 50px 1fr 50px;
      color: #2D008A;
      .month {
        justify-self: center;
        font-size: 30px;
        font-weight: 800;
        @media screen and (max-width: 450px) {
          font-size: 25px;
        }
        @media screen and (max-width: 350px) {
          font-size: 21px;
        }
      }
      .left-arrow {
        justify-self: end;
        img {
          width: 30px;
          cursor: pointer;
          transform: rotate(180deg);
          -o-transform: rotate(180deg);
          -webkit-transform: rotate(180deg);
          -ms-transform: rotate(180deg);
          -moz-transform: rotate(180deg);
          @media screen and (max-width: 450px) {
            width: 25px;
          }
          @media screen and (max-width: 450px) {
            width: 21px;
          }
        }
      }
      .right-arrow {
        justify-self: start;
        img {
          cursor: pointer;
          width: 30px;
          @media screen and (max-width: 450px) {
            width: 25px;
          }
          @media screen and (max-width: 450px) {
            width: 21px;
          }
        }
      }
    }
    .body {
      margin-top: 20px;
      align-items: center;
      display: grid;
      row-gap: 30px;
      grid-template-columns: repeat(7, 1fr);
      grid-template-rows: repeat(7, 1fr);
      justify-items: center;
      @media screen and (max-width: 450px) {
        row-gap: 15px;
      }
      @media screen and (max-width: 350px) {
        row-gap: 10px;
      }
      .day-name {
        color: #2D008A;
        font-weight: 800;
        font-size: 21px;
        @media screen and (max-width: 450px) {
          font-size: 19px;
        }
        @media screen and (max-width: 350px) {
          font-size: 17px;
        }
      }
      .day-container {
        display: grid;
        grid-auto-columns: 1fr 1fr;
        grid-auto-flow: column;
        height: 40px;
        position: relative;
        width: 100%;
        @media screen and (max-width: 350px) {
          height: 30px;
        }
        .day {
          align-content: center;
          border-radius: 15px;
          box-sizing: content-box;
          color: #2D008A;
          display: grid;
          height: 100%;
          justify-content: center;
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          cursor: pointer;
          font-weight: 800;
          @media screen and (max-width: 350px) {
            width: 30px;
            border-radius: 10px;
          }
          &:hover {
            background-color: #7240D6 !important;
            color: white !important;
          }
          &.today {
            color: white !important;
            background-color: #7240D6 !important;
          }
          span {
            font-size: 18px;
            margin: 0;
            padding: 0;
            width: fit-content;
            @media screen and (max-width: 450px) {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
.selected {
  background-color: rgb(214, 64, 64) !important;
  color: white !important;
}
.calendar {
  background-color: inherit;
  .body {
    .day-container {
      .before {
        height: 40px;
        @media screen and (max-width: 350px) {
          height: 30px;
        }
      }
      .after {
        height: 40px;
        @media screen and (max-width: 350px) {
          height: 30px;
        }
      }
    }
  }
}
.date-picker {
  background-color: inherit;
  .body {
    .day-container {
      .day {
        &:hover {
          // background-color: $selection-hover-color
          // border: 2px solid $selected-color
          cursor: pointer
        }
        &.selected {
          // border: 2px solid $selected-color
          // color: $selected-color
        }
      }
    }
  }
}
</style>
