<template>
  <div class="more_image">
    <vue-slider
      :container="container"
      :items="1"
      :controls="false"
      :autoplay="true"
      :mouseDrag="true"
      :loop="true"
      :autoplayButtonOutput="false"
      :autoplayTimeout="3000"
    >
      <img class="more_image_img" src="../../../assets/student/more/slide1.png" alt="slide1">
      <img class="more_image_img" src="../../../assets/student/more/slide2.png" alt="slide2">
      <img class="more_image_img" src="../../../assets/student/more/slide3.png" alt="slide3">
      <img class="more_image_img" src="../../../assets/student/more/slide4.png" alt="slide4">
      <img class="more_image_img" src="../../../assets/student/more/slide5.png" alt="slide5">
    </vue-slider>
  </div>
</template>

<script>
import VueSlider from 'vue-tiny-slider'
export default {
  components: { VueSlider },
  name: 'moreImage',
  data() {
    return {
      container: '.more_image_slide'
    }
  },
}
</script>

<style lang="scss">
.tns-visually-hidden {
  display: none;
}
.more_image {
  z-index: 10;
  height: 100%;
  margin-top: 30px;
  max-width: 570px;
  border-radius: 16px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
  display: flex;
  overflow-x: hidden;
  height: auto;
  display: -webkit-flex;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
  }
  @media screen and (max-width: 350px) {
    margin-top: 10px;
  }
  &_slide {
    width: 100%;
    height: 100%;
  }
  &_img {
    width: 100%;
    max-width: 570px;
  }
  .tns-nav {
    position: absolute;
    z-index: 10;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%,0);
    .tns-nav-active {
      background-color: #2D008A !important;
    }
    button {
      margin-left: 5px;
      border-radius: 50%;
      margin-right: 5px;
      border: none;
      background-color: rgba(231, 231, 231, 0.877);
      cursor: pointer;
      width: 10px;
      height: 10px;
      &:focus {
        outline: none;
      }
    }
  }
}
</style>