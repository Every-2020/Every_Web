<template>
  <div class="home_bamboo" @click="hitPost">
    <span>오늘의 대나무숲 인기 게시글을<br><b>확인하세요!</b></span>
    <img class="home_bamboo_img" src="~assets/student/home/bamboo.png" alt="bamboo">
    <img class="home_bamboo_next" src="~assets/student/home/next.png" alt="next">
  </div>
</template>

<script>
export default {
  name: 'HomeBamboo',
  methods: {
    hitPost () {
      this.$router.push({ name: 'student-bamboo-hit' })
    }
  }
}
</script>

<style lang="scss">
.home_bamboo {
  cursor: pointer;
  margin-top: 40px;
  position: relative;
  width: 100%;
  border-radius: 16px;
  height: 110px;
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
    height: 80px;
    font-size: 16px;
  }
  @media screen and (max-width: 450px) {
    font-size: 15px;
  }
  @media screen and (max-width: 350px) {
    margin-top: 10px;
  }
  b {
    font-weight: 800;
    font-size: 21px;
    @media screen and (max-width: 768px) {
      font-size: 19px;
    }
    @media screen and (max-width: 450px) {
      font-size: 17px;
    }
  }
  &_img {
    position: absolute;
    height: 100%;
    right: 60px;
    top: 0;
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
</style>
