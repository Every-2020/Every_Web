<template>
  <div class="home_right">
    <span class="home_right_title">한국인은 밥심.</span>
    <span class="home_right_h1">오늘의 급식을 한눈에.</span>
    <div class="home_right_meals">
      <img @click="prev" class="home_right_meals_left" src="../../../assets/student/home/meal_next.png" alt="prev">
      <div class="home_right_meals_1 home_right_meals_box">
        <div class="home_right_meals_box_title">
          <img src="../../../assets/student/home/sunrise.png" alt="sunrise">
          <span>아침</span>
        </div>
        <div class="home_right_meals_box_content" v-if="meals[0]" v-html="meals[0].meal_name"></div>
        <div class="home_right_meals_box_content" v-else>급식이 없습니다.</div>
        <img class="home_right_meals_wave" src="../../../assets/student/home/meals-wave.png" alt="wave">
      </div>
      <div class="home_right_meals_2 home_right_meals_box">
        <div class="home_right_meals_box_title">
          <img src="../../../assets/student/home/sun.png" alt="sunrise">
          <span>점심</span>
        </div>
        <div class="home_right_meals_box_content" v-if="meals[1]" v-html="meals[1].meal_name"></div>
        <div class="home_right_meals_box_content" v-else>급식이 없습니다.</div>
        <img class="home_right_meals_wave" src="../../../assets/student/home/meals-wave2.png" alt="wave">
      </div>
      <div class="home_right_meals_3 home_right_meals_box">
        <div class="home_right_meals_box_title">
          <img src="../../../assets/student/home/moon.png" alt="sunrise">
          <span>저녁</span>
        </div>
        <div class="home_right_meals_box_content" v-if="meals[2]" v-html="meals[2].meal_name"></div>
        <div class="home_right_meals_box_content" v-else>급식이 없습니다.</div>
        <img class="home_right_meals_wave" src="../../../assets/student/home/meals-wave2.png" alt="wave">
      </div>
      <img @click="next" class="home_right_meals_right" src="../../../assets/student/home/meal_next.png" alt="next">
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
      noMeals: true,
      now: 2
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
  methods: {
    prev() {
      if (this.now > 1) {
        if (this.now === 3) {
          document.getElementsByClassName('home_right_meals_right')[0].classList.remove('ob')
        }
        document.getElementsByClassName(`home_right_meals_${this.now}`)[0].style.display = "none"
        this.now -= 1
        document.getElementsByClassName(`home_right_meals_${this.now}`)[0].style.display = "block"    
        if (this.now === 1) {
          document.getElementsByClassName('home_right_meals_left')[0].classList.add('ob')
        }
      }
    },
    next() {
      if (this.now < 3) {
        if (this.now === 1) {
          document.getElementsByClassName('home_right_meals_left')[0].classList.remove('ob')
        }
        document.getElementsByClassName(`home_right_meals_${this.now}`)[0].style.display = "none"
        this.now += 1
        document.getElementsByClassName(`home_right_meals_${this.now}`)[0].style.display = "block"    
        if (this.now === 3) {
          document.getElementsByClassName('home_right_meals_right')[0].classList.add('ob')
        }
      }
    }
  },
}
</script>

<style lang="scss">
.ob {
  opacity: 0.3;
  filter: alpha(opacity=30);
}
.home_right {
  z-index: 10;
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
  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
    overflow: hidden;
    padding: 30px;
  }
  @media screen and (max-width: 450px) {
    padding: 20px;
  }
  @media screen and (max-width: 350px) {
    margin-top: 10px;
  }
  &_h1 {
    font-size: 31px;
    font-weight: 800;
    @media screen and (max-width: 768px) {
      font-size: 27px;
    }
    @media screen and (max-width: 450px) {
      font-size: 18px;
    }
  }
  &_title {
    font-size: 29px;
    font-weight: 800;
    @media screen and (max-width: 768px) {
      font-size: 25px;
    }
    @media screen and (max-width: 450px) {
      font-size: 20px;
    }
  }
  &_meals {
    flex-grow: 1;
    margin-top: 40px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
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
      @media screen and (min-width: 768px) {
        display: none;
      }
    }
    &_right {
      cursor: pointer;
      height: 20px;
      width: 20px;
      margin-left: 10px;
      @media screen and (min-width: 768px) {
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
        text-align: center;
        font-weight: 600;
        line-height: 25px;
        height: 140px;
        overflow-y: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
        @media screen and (min-width: 768px) {
          font-size: 16px;
        }
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
    &_1 {
      background-color: #611CEE;
      display: none;
      @media screen and (min-width: 768px) {
        display: block !important;
      }
    }
    &_2 {
      background-color: #4904D8;
      display: block;
      @media screen and (min-width: 768px) {
        display: block !important;
      }
    }
    &_3 {
      background-color: #3A00B4;
      display: none;
      @media screen and (min-width: 768px) {
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
}
</style>