<template>
  <div class="home_right">
    <span class="home_right_title">한국인은 밥심.</span>
    <span class="home_right_h1">오늘의 급식을 한눈에.</span>
    <div class="home_right_meals">
      <div class="home_right_meals_1 home_right_meals_box">
        <div class="home_right_meals_box_title">
          <img src="../../../assets/student/home/sunrise.png" alt="sunrise">
          <span>아침</span>
        </div>
        <div class="home_right_meals_box_content" v-if="meals[0]" v-html="meals[0].meal_name"></div>
        <img class="home_right_meals_wave" src="../../../assets/student/home/meals-wave.png" alt="wave">
      </div>
      <div class="home_right_meals_2 home_right_meals_box">
        <div class="home_right_meals_box_title">
          <img src="../../../assets/student/home/sun.png" alt="sunrise">
          <span>점심</span>
        </div>
        <div class="home_right_meals_box_content" v-if="meals[1]" v-html="meals[1].meal_name"></div>
        <img class="home_right_meals_wave" src="../../../assets/student/home/meals-wave2.png" alt="wave">
      </div>
      <div class="home_right_meals_3 home_right_meals_box">
        <div class="home_right_meals_box_title">
          <img src="../../../assets/student/home/moon.png" alt="sunrise">
          <span>저녁</span>
        </div>
        <div class="home_right_meals_box_content" v-if="meals[2]" v-html="meals[2].meal_name"></div>
        <img class="home_right_meals_wave" src="../../../assets/student/home/meals-wave2.png" alt="wave">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import server from '@/models/server'
export default {
  name: 'meals',
  data() {
    return {
      url: server,
      meals: [],
      noMeals: true
    }
  },
  mounted() {
    axios.get(`${this.url}/school/meal`)
    .then(response => {
      if (response.data.status === 200) {
        this.meals = response.data.data.meals
        this.noMeals = false
      }
    })
    .catch(() => {
      this.noMeals = true
    })
  },
}
</script>

<style lang="scss">
.home_right {
  margin-top: 100px;
  margin-left: 40px;
  border-radius: 16px;
  width: 60%;
  height: 400px;
  background-color: #fff;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
  max-width: 850px;
  padding: 40px;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -ms-flex-direction: column;
  text-align: left;
  &_h1 {
    font-size: 31px;
    font-weight: 800;
  }
  &_title {
    font-size: 29px;
    font-weight: 800;
  }
  &_meals {
    flex-grow: 1;
    margin-top: 40px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    &_box {
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.116);
      width: 32%;
      border-radius: 20px;
      overflow: hidden;
      height: 210px;
      position: relative;
      padding: 13px;
      &_title {
        color: white;
        font-weight: 800;
        font-size: 18px;
        img {
          width: 22px;
        }
      }
      &_content {
        color: white;
        font-size: 14px;
        text-align: center;
        font-weight: 400;
        line-height: 25px;
        height: 140px;
        overflow-y: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
    &_1 {
      background-color: #611CEE;
    }
    &_2 {
      background-color: #4904D8;
    }
    &_3 {
      background-color: #3A00B4;
    }
    &_wave {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
    }
  }
}
</style>