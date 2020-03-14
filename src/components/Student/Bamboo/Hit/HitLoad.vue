<template>
  <div class="comment">
    <div class="comment_area">
      <div class="comment_area_content">
        <div class="comment_profile comment_load_profile loading"></div>
        <div class="comment_area_box comment_load_box">
          <div class="comment_area_box_content">
            <div class="comment_load_title loading"></div>
            <div class="comment_load_first loading"></div>
            <div class="comment_load_second loading"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "@/assets/style/animation.scss";

.loading {
  animation: loading 2s infinite ease-in-out;
  -webkit-animation: loading 2s infinite ease-in-out;
  -o-animation: loading 2s infinite ease-in-out;
  -moz-animation: loading 2s infinite ease-in-out;
}
.comment_more {
  &_area {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
  }
  &_box {
    position: absolute;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -ms-flex-direction: column;
    padding: 8px;
    z-index: 200;
    border-radius: 5px;
    background-color: #F8F8F8;
    right: 10px;
    top: 15px;
  }
}
.comment {
  flex-grow: 1;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -ms-flex-direction: column;
  height: calc(100% - 80px);
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  @media screen and (max-width: 767px) {
    height: auto;
    overflow: scroll;
  }
  &_load {
    &_box {
      width: 100% !important;
    }
    &_title {
      width: 50px;
      background: rgb(216, 216, 216);
      border-radius: 10px;
      height: 13px;
    }
    &_first {
      margin-top: 10px;
      width: 80%;
      background: rgb(223, 223, 223);
      border-radius: 10px;
      height: 13px;
    }
    &_second {
      margin-top: 10px;
      width: 60%;
      background: rgb(223, 223, 223);
      border-radius: 10px;
      height: 13px;
      margin-bottom: 40px;
    }
    &_profile {
      border-radius: 50%;
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }
  &_area {
    display: flex;
    display: -webkit-flex;
    margin-bottom: 20px;
    position: relative;
    flex-direction: column;
    -ms-flex-direction: column;
    &_content {
      display: flex;
      display: -webkit-flex;
      position: relative;
      width: 100%;
    }
    &_box {
      max-width: calc(100% - 90px);
      position: relative;
      padding-left: 10px;
      &_content {
        background-color: #EFEFEF;
        border-radius: 15px;
        padding: 10px;
        text-align: left;
        max-width: calc(100%);
        word-break: break-all;
        z-index: 5;
      }
    }
  }
  &_profile {
    width: 50px;
    height: 50px;
    @media screen and (max-width: 450px) {
      width: 40px;
      height: 40px;
    }
  }
}
</style>