<template>
  <div class="more_popup">
    <div @click="close" class="more_popup_area"></div>
    <div class="more_popup_box">
      <div class="more_popup_title">
        <span>업데이트 내용</span>
      </div>
      <div class="more_popup_container">
        <div class="more_popup_container_text" v-for="(content, index) in update" :key="index">
          <span class="more_popup_container_text_title">{{ content.date }}</span>
          <span class="more_popup_container_text_content">{{ content.title }}</span>
        </div>
      </div>
      <div @click="close" class="more_popup_btn">확인</div>
    </div>
  </div>
</template>

<script>
import update from '@/models/update'
export default {
  name: 'morePopup',
  data() {
    return {
      update: update
    }
  },
  methods: {
    close () {
      this.$emit('onClose')
    }
  },
}
</script>

<style lang="scss">
.more_popup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  z-index: 103;
  padding: 15px;
  &_area {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 104;
  }
  &_box {
    width: 100%;
    height: 540px;
    max-width: 520px;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
    z-index: 105;
    border-radius: 10px;
    background: white;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -ms-flex-direction: column;
    padding: 30px;
    text-align: left;
    @media screen and (max-width: 350px) {
      height: 500px;
      padding: 20px;
    }
  }
  &_title {
    color: #2D008A;
    font-weight: 800;
    font-size: 26px;
    text-align: center;
  }
  &_container {
    width: 100%;
    height: calc(100% - 90px);
    overflow-y: scroll;
    padding-top: 20px;
    &_text {
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      -ms-flex-direction: column;
      padding-bottom: 34px;
      &_title {
        font-size: 25px;
        @media screen and (max-width: 450px) {
          font-size: 20px;
        }
      }
      &_content {
        word-break: keep-all;
        word-wrap: break-word;
        margin-top: 5px;
        font-size: 22px;
        font-weight: 700;
        color: #2D008A;
        @media screen and (max-width: 450px) {
          font-size: 21px;
        }
      }
    }
  }
  &_btn {
    margin-top: 10px;
    height: 55px;
    width: 100%;
    border-radius: 15px;
    background-color: #2D008A;
    font-weight: 800;
    color: white;
    font-size: 25px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>