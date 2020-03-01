<template>
  <div class="add_post">
    <div @click="onBack" class="add_post_area"></div>
    <div class="add_post_box">
      <div class="add_post_box_header">
        <img @click="onBack" src="../../assets/back.png" alt="back" class="add_post_box_header_back">
        <img src="../../assets/bamboo/profile.png" alt="profile" class="add_post_box_header_profile">
        <span>익명</span>
      </div>
      <textarea class="add_post_textarea" placeholder="글을 작성해주세요!" maxlength="250" v-model="content"></textarea>
      <button @click="onSubmit">공유</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import server from '@/models/server'
export default {
  data() {
    return {
      content: '',
      url: server
    }
  },
  mounted() {
    setTimeout(() => {
      document.getElementsByClassName('add_post_textarea')[0].focus()
    }, 10);
  },
  methods: {
    onBack () {
      this.$emit('onBack')
    },
    onSubmit () {
      if (this.content) {
        axios.post(`${this.url}/bamboo/post`, {
          content: this.content,
        })
        .then((response) => {
          if (response.data.status === 201) {
            setTimeout(() => {
              this.$emit('onAdd')
            }, 200);
          }
        })
      } else {
        this.$swal('오류','입력란을 작성해주세요.','error')
      }
    }
  },
}
</script>

<style lang="scss">
.add_post {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  &_area {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  &_box {
    width: 90%;
    height: 400px;
    max-width: 590px;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
    background: white;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -ms-flex-direction: column;
    padding: 10px;
    z-index: 1000;
    &_header {
      padding: 10px;
      text-align: left;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      &_back {
        width: 35px;
        height: 35px;
        cursor: pointer;
      }
      &_profile {
        margin-left: 10px;
        margin-right: 10px;
        width: 60px;
        height: 60px;
      }
      span {
        font-size: 20px;
        font-weight: 800;
      }
    }
    textarea {
      width: 100%;
      height: calc(100% - 100px);
      border: none;
      resize: none;
      padding: 0px 10px 10px 10px;
      font-family: 'NanumSquare', sans-serif;
      font-size: 18px;
      &:focus {
        outline: none;
      }
    }
    button {
      background: #7E40FF;
      border: none;
      color: white;
      font-size: 18px;
      font-weight: 700;
      width: 100%;
      cursor: pointer;
      height: 38px;
    }
  }
}
</style>