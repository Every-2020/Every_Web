<template>
  <div class="login">
    <div class="login_box">
      <i @click="change" ref="i" class="fas fa-exchange-alt"></i>
      <div ref="left" class="login_box_left">
        <div class="login_box_left_header">
          <span class="login_box_left_title">What is Every?</span>
          <div class="login_box_left_under"></div>
        </div>
        <div class="login_box_left_content">
          <span>Every</span>는 당신을 위해 다양하고 편리한<br>
          기능을 제공하고 새로운 사람들과<br>
          소통을 할 수 있도록 도와줍니다.<br>
          이제 당신의 일상에 Every를 함께하세요!
        </div>
        <button @click="onClick" class="login_box_left_btn">회원가입</button>
        <img class="wave" src="../assets/login/wave.png" alt="wave">
        <img class="bubble" src="../assets/login/bubble.png" alt="bubble">
      </div>
      <div ref="right" class="login_box_right">
        <div class="login_box_right_header">
          <span class="login_box_right_title">환영합니다!</span>
          <span class="login_box_right_exp">로그인 후 서비스 이용이 가능합니다.</span>
        </div>
        <form name="login" @submit.prevent="onSubmit">
          <input name="email" type="email" v-model="email" placeholder="이메일">
          <input name="pw" type="password" v-model="pw" placeholder="비밀번호">
          <span class="forgot">비밀번호를 잊으셨나요?</span>
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import server from '@/models/server'
export default {
  name: 'login',
  data() {
    return {
      email: '',
      pw: '',
      url: server
    }
  },
  methods: {
    onSubmit () {
      axios.post(`${this.url}/auth/login`, {
        email: this.email,
        pw: this.pw
      })
      .then( response => { 
        if (response.status === 200) {
          this.$swal('환영합니다!','로그인에 성공하였습니다.','success')
          this.$store.state.login = true
          if (response.data.data.worker_idx) {
            this.$store.state.idx = response.data.data.worker_idx
            this.$store.state.identity = "worker"
          } else {
            this.$store.state.identity = "student"
            this.$store.state.idx = response.data.data.student_idx
          }
          this.$cookie.delete('access')
          this.$cookie.set('access', response.data.data['x-access-token'], { expires: '12h' })
          axios.defaults.headers.common['token'] = response.data.data['x-access-token']
          if (this.$store.state.identity === "student") this.$router.push({ name: 'student' })
        }
      })
      .catch(() => {
        this.$swal('오류','이메일 또는 비밀번호가 올바르지 않습니다.','error')
      })
    },
    onClick () {
      this.$router.push({ name: 'register' })
    },
    change () {
      this.$refs.i.classList.toggle('active')
      if (this.$refs.i.classList.contains('active')) {
        document.getElementsByTagName('i')[0].style.color = "white"
        document.getElementsByClassName('login_box_left')[0].style.display = "flex"
        document.getElementsByClassName('login_box_right')[0].style.display = "none"
      } else {
        document.getElementsByTagName('i')[0].style.color = "#7E40FF"
        document.getElementsByClassName('login_box_left')[0].style.display = "none"
        document.getElementsByClassName('login_box_right')[0].style.display = "flex"
      }
    }
  },
}
</script>

<style lang="scss">
.login {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 40px 40px;
  @media screen and (max-width: 350px) {
    padding: 0 5px;
  }
  i {
    z-index: 1;
    position: absolute;
    right: 30px;
    top: 30px;
    cursor: pointer;
    display: none;
    color: #7E40FF;
    @media screen and (max-width: 767px) {
      display: block;
    }
  }
  &_box {
    display: flex;
    display: -webkit-flex;
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;
    height: auto;
    overflow: hidden;
    max-width: 1042px;
    box-shadow: 0px 0px 30px rgba(128, 128, 128, 0.507);
    @media screen and (max-width: 767px) {
      max-width: 400px;
      min-height: 500px;
      max-height: 500px;
    }
    &_left {
      flex-grow: 1;
      flex-basis: 0;
      position: relative;
      padding-top: 85.4px;
      flex-direction: column;
      -ms-flex-direction: column;
      padding-bottom: calc(50% - 60px);
      padding-left: calc(20% - 20px);
      text-align: left;
      color: white;
      display: none;
      background-color: #7E40FF;
      @media screen and (min-width: 768px) {
        padding-left: 40px;
        padding-bottom: 180px;
        display: block !important;
      }
      .wave {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
      }
      .bubble {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 8%;
      }
      &_title {
        font-size: 32px;
        font-weight: 800;
        @media screen and (max-width: 767px) {
          font-size: 28px;
        }
      }
      &_under {
        width: 108px;
        height: 4px;
        margin-top: 5px;
        border-radius: 10px;
        background-color: white;
        @media screen and (max-width: 767px) {
          height: 3px;
        }
      }
      &_content {
        margin-top: 30px;
        font-size: 18px;
        line-height: 25px;
        font-weight: 700;
        span {
          font-size: 26px;
          font-weight: 800;
          @media screen and (max-width: 767px) {
            font-size: 18px;
          }
        }
        @media screen and (max-width: 767px) {
          font-size: 14px;
        }
      }
      &_btn {
        width: 144px;
        height: 56px;
        border-radius: 29px;
        padding: 0;
        color: white;
        cursor: pointer;
        background: none;
        margin-top: 50px;
        margin-bottom: 30px;
        font-size: 24px;
        font-weight: 600;
        box-sizing: border-box;
        border: 3px solid white;
        text-align: center;
        @media screen and (max-width: 767px) {
          padding-top: 10px;
          padding-bottom: 10px;
        }
      }
    }
    &_right {
      display: flex;
      display: -webkit-flex;
      background-color: white;
      text-align: left;
      padding-top: 86.4px;
      padding-left: 40px;
      padding-bottom: 80px;
      flex-direction: column;
      -ms-flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      @media screen and (min-width: 768px) {
        display: flex !important;
        padding-bottom: 100px;
        display: -webkit-flex !important;
      }
      &_title {
        color: #2D008A;
        font-size: 36px;
        font-weight: 800;
      }
      &_exp {
        font-size: 16px;
        font-weight: 700;
        display: block;
        color: #2D008A;
        margin-top: 5px;
        margin-bottom: 40px;
        @media screen and (max-width: 767px) {
          font-size: 14px;
          margin-bottom: 30px;
        }
      }
      form {
        display: flex;
        display: -webkit-flex;
        -ms-flex-direction: column;
        flex-direction: column;
        width: calc(95% - 90px);
        @media screen and (max-width: 767px) {
          width: 85%;
        }
      }
      input {
        margin-top: 35px;
        border: none;
        background-color: #E8E8E8;
        font-size: 15px;
        flex-grow: 1;
        flex-basis: 0;
        color: rgb(139, 139, 139);
        padding: 10px;
        padding-left: 10px;
        &::placeholder {
          color: #CFCFCF;
          font-weight: 800;
        }
        &:focus {
          outline: none;
        }
      }
      .forgot {
        color: #4300CE;
        font-weight: 700;
        font-size: 14px;
        text-align: right;
        margin-top: 10px;
        cursor: pointer;
      }
      button {
        flex-grow: 1;
        background: linear-gradient(to right, #8A51FF, #6824F6) no-repeat;
        background: -o-linear-gradient(to right, #8A51FF, #6824F6) no-repeat;
        background: -moz-linear-gradient(to right, #8A51FF, #6824F6) no-repeat;
        background: -webkit-linear-gradient(to right, #8A51FF, #6824F6) no-repeat;
        color: white;
        border: none;
        height: 43px;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        margin-top: 50px;
        @media screen and (max-width: 767px) {
          margin-top: 30px;
        }
      }
    }
  }
}
</style>