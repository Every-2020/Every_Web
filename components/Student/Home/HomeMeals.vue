<template>
  <div class="home_meals">
    <img class="home_meals_left" src="~/assets/student/home/meal_next.png" alt="prev" @click="prev">
    <div class="home_meals_1 home_meals_box">
      <div class="home_meals_box_title">
        <img src="~/assets/student/home/sunrise.png" alt="sunrise">
        <span>아침</span>
      </div>
      <div v-if="meal1" class="home_meals_box_content" v-html="getMeal(meal1.meal_name)" />
      <div v-else class="home_meals_box_content">
        급식이 없습니다.
      </div>
      <img class="home_meals_wave" src="~/assets/student/home/meals-wave1.png" alt="wave">
    </div>
    <div class="home_meals_2 home_meals_box">
      <div class="home_meals_box_title">
        <img src="~/assets/student/home/sun.png" alt="sunrise">
        <span>점심</span>
      </div>
      <div v-if="meal2" class="home_meals_box_content" v-html="getMeal(meal2.meal_name)" />
      <div v-else class="home_meals_box_content">
        급식이 없습니다.
      </div>
      <img class="home_meals_wave" src="~/assets/student/home/meals-wave2.png" alt="wave">
    </div>
    <div class="home_meals_3 home_meals_box">
      <div class="home_meals_box_title">
        <img src="~/assets/student/home/moon.png" alt="sunrise">
        <span>저녁</span>
      </div>
      <div v-if="meal3" class="home_meals_box_content" v-html="getMeal(meal3.meal_name)" />
      <div v-else class="home_meals_box_content">
        급식이 없습니다.
      </div>
      <img class="home_meals_wave" src="~/assets/student/home/meals-wave3.png" alt="wave">
      <img class="moon_star" src="~/assets/student/home/star.png" alt="star">
    </div>
    <img class="home_meals_right" src="~/assets/student/home/meal_next.png" alt="next" @click="next">
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Meals',
  data () {
    return {
      meals: [],
      noMeals: true,
      now: 2,
      meal1: '',
      meal2: '',
      meal3: ''
    }
  },
  mounted () {
    axios.get(`${this.$store.state.url}/school/meal`)
      .then((res) => {
        if (res.data.status === 200) {
          this.meals = res.data.data.meals
          this.meals.forEach((meal) => {
            if (meal.meal_code === 1) {
              this.meal1 = meal
            } else if (meal.meal_code === 2) {
              this.meal2 = meal
            } else if (meal.meal_code === 3) {
              this.meal3 = meal
            }
          })
          this.noMeals = false
        }
      })
      .catch(() => {
        this.noMeals = true
      })
  },
  methods: {
    prev () {
      if (this.now > 1) {
        if (this.now === 3) {
          document.getElementsByClassName('home_meals_right')[0].classList.remove('ob')
        }
        document.getElementsByClassName(`home_meals_${this.now}`)[0].style.display = 'none'
        this.now -= 1
        document.getElementsByClassName(`home_meals_${this.now}`)[0].style.display = 'block'
        if (this.now === 1) {
          document.getElementsByClassName('home_meals_left')[0].classList.add('ob')
        }
      }
    },
    next () {
      if (this.now < 3) {
        if (this.now === 1) {
          document.getElementsByClassName('home_meals_left')[0].classList.remove('ob')
        }
        document.getElementsByClassName(`home_meals_${this.now}`)[0].style.display = 'none'
        this.now += 1
        document.getElementsByClassName(`home_meals_${this.now}`)[0].style.display = 'block'
        if (this.now === 3) {
          document.getElementsByClassName('home_meals_right')[0].classList.add('ob')
        }
      }
    },
    getMeal (meal) {
      return meal
    }
  }
}
</script>

<style lang="scss">
.ob {
  opacity: 0.3;
  filter: alpha(opacity=30);
}
.home_meals {
  flex-grow: 1;
  margin-top: 40px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  text-align: center;
  @media screen and (max-width: 768px) {
    justify-content: center;
    align-items: center;
    margin-top: 0px;
  }
  &_left {
    width: 20px;
    height: 20px;
    transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    cursor: pointer;
    margin-right: 10px;
    @media screen and (min-width: 769px) {
      display: none;
    }
  }
  &_right {
    cursor: pointer;
    height: 20px;
    width: 20px;
    margin-left: 10px;
    @media screen and (min-width: 769px) {
      display: none;
    }
  }
  &_box {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.116);
    width: 32%;
    border-radius: 20px;
    overflow: hidden;
    height: 210px;
    position: relative;
    padding: 13px;
    @media screen and (max-width: 768px) {
      width: 70%;
      max-width: 250px;
    }
    &_title {
      color: white;
      font-weight: 800;
      font-size: 18px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      span {
        margin-left: 5px;
      }
      img {
        width: 22px;
      }
    }
    &_content {
      color: white;
      font-size: 14px;
      font-weight: 600;
      line-height: 25px;
      height: calc(100% - 30px);
      overflow: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      width: 100%;
      word-break: break-all;
      @media screen and (min-width: 769px) {
        font-size: 15px;
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  &_1 {
    background-color: #611CEE;
    display: none;
    @media screen and (min-width: 769px) {
      display: block !important;
    }
  }
  &_2 {
    background-color: #4904D8;
    display: block;
    @media screen and (min-width: 769px) {
      display: block !important;
    }
  }
  &_3 {
    background-color: #3A00B4;
    display: none;
    @media screen and (min-width: 769px) {
      display: block !important;
    }
  }
  &_wave {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
  }
}
.moon_star {
  position: absolute;
  top: 10px;
  left: 20px;
  width: 80%;
}
</style>
