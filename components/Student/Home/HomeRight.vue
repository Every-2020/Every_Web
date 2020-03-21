<template>
  <div class="home_right">
    <home-meals />
  </div>
</template>

<script>
import HomeMeals from '~/components/Student/Home/HomeMeals'
export default {
  name: 'HomeRight',
  components: {
    HomeMeals
  }
}
</script>

<style lang="scss">
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
}
.moon_star {
  position: absolute;
  top: 10px;
  left: 20px;
  width: 80%;
}
</style>
