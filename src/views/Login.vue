<template>
  <div class="login">
    <div class="login_box">
      <div class="login_item">
        <img src="@/assets/logo.png" alt="logo" class="login_item_logo">
        <div class="login_item_header">
          <h1 class="login_item_header_title">EVERY</h1>
          <div class="login_item_header_content">
            <span>로그인 하시고 다양한 서비스를 즐겨보세요.</span>
          </div>
        </div>
        <div class="login_item_content">
          <div class="login_item_content_form">
            <input class="login_item_content_form_input" type="text" v-model="id" required/>
            <div class="login_item_content_form_placeholder">아이디</div>
          </div>
          <div class="login_item_content_form">
            <input class="login_item_content_form_input" type="password" v-model="pw" required/>
            <div class="login_item_content_form_placeholder">비밀번호</div>
            <div @click="showPw(1, 0)" class="login_item_content_form_eye">
              <i class="fas fa-eye"></i>
            </div>
          </div>
          <div class="login_item_content_forgot"><span>비밀번호를 잊으셨나요?</span></div>
          <div class="login_item_content_form">
            <input style="padding: 13px 15px;" @click="onSubmit" readonly value="로그인" class="login_item_content_form_input login_btn">
          </div>
        </div>
        <router-link class="login_to_register" to="/register">회원가입</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import LoginSelect from '@/components/Login/LoginSelect.vue'
export default {
  data() {
    return {
      id: '',
      pw: ''
    }
  },
  // components: {
  //   LoginSelect
  // },
  methods: {
    onSubmit () {
      this.$store.state.login = true
      this.$router.push({ name: 'home' })
    },
    showPw (input, i) {
      document.getElementsByClassName('login_item_content_form')[input].classList.toggle('active')
      if (document.getElementsByClassName('login_item_content_form')[input].classList.contains('active')) {
        document.getElementsByTagName('i')[i].classList.replace('fa-eye', 'fa-eye-slash')
        document.getElementsByTagName('input')[input].setAttribute('type', 'text')
      } else {
        document.getElementsByTagName('i')[i].classList.replace('fa-eye-slash', 'fa-eye')
        document.getElementsByTagName('input')[input].setAttribute('type', 'password')
      }
    }
  },
}
</script>

<style lang="scss">
.login {
  position: relative;
  min-height: 100vh;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -ms-flex-direction: column;
  & * {
    box-sizing: inherit;
    -moz-box-sizing: inherit;
    -webkit-box-sizing: inherit;
  }
  @media screen and (min-width: 601px) {
    &:before, &:after {
      content: '';
      display: block;
      box-flex: 1;
      -webkit-box-flex: 1;
      flex-grow: 1;
      height: 24px;
    }
  }
  &_box {
    background: white;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -ms-flex-direction: column;
    max-width: 100%;
    position: relative;
    z-index: 2;
    min-height: 100vh;
    @media screen and (min-width: 601px) {
      min-height: 0;
      border: 1px solid rgb(221, 221, 221);
      border-radius: 8px;
      display: block;
      flex-shrink: 0;
      margin: 0 auto;
      width: 450px;
    }
  }
  &_item {
    box-flex: 1;
    -moz-box-flex: 1;
    -webkit-box-flex: 1;
    flex-grow: 1;
    overflow: hidden;
    padding: 24px 24px 36px;
    @media screen and (min-width: 601px) {
      height: auto;
      overflow-y: auto;
    }
    @media screen and (min-width: 450px) {
      padding: 20px 40px 36px;
    }
    &_logo {
      width: 100px;
    }
    &_header {
      &_title {
        font-size: 17pt;
        margin-top: 0;
      }
      &_content {
        font-weight: 500;
      }
    }
    &_content {
      margin-top: 35px;
      &_form {
        display: flex;
        display: -webkit-flex;
        box-flex: 1;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        min-width: 0%;
        position: relative;
        flex-grow: 1;
        flex-shrink: 1;
        &_eye {
          position: absolute;
          right: 15px;
          cursor: pointer;
          top: 13px;
          color: gray;
        }
        &_input {
          border: 1px solid rgb(221, 221, 221);
          border-radius: 5px;
          box-flex: 1;
          -webkit-box-flex: 1;
          -moz-box-flex: 1;
          flex-grow: 1;
          flex-shrink: 1;
          padding: 13px 40px 13px 13px;
          outline: none;
          line-height: 24px;
          display: block;
          margin-bottom: 20px;
          &:focus {
            border: 1px solid #1a73e8;
          }
        }
        &_placeholder {
          position: absolute;
          pointer-events: none;
          font-size: 17px;
          left: 5px;
          top: 13px;
          background: white;
          padding: 0px 10px;
          transition: 0.1s;
          color: gray;
        }
        &_input:focus ~ &_placeholder,
        &_input:valid ~ &_placeholder {
          opacity: 1;
          color: #1a73e8;
          left: 8px;
          top: -10px;
        }
        &_input:not(:focus):valid ~ &_placeholder {
          color: rgb(116, 116, 116);
        }
      }
      &_forgot {
        text-align: right;
        font-size: 11pt;
        margin-bottom: 20px;
        color: #984DCC;
        span {
          cursor: pointer;
        }
      }
    }
  }
  &_btn {
    text-align: center;
    cursor: pointer;
    color: white;
    background: linear-gradient(to right, #5400FF, #B954FF);
    background: -moz-linear-gradient(to right, #5400FF, #B954FF);
    background: -webkit-linear-gradient(to right, #5400FF, #B954FF);
    background: -o-linear-gradient(to right, #5400FF, #B954FF);
    font-size: 15pt;
    font-weight: 600;
  }
  &_to_register {
    text-decoration: none;
    font-size: 15pt;
    background: linear-gradient(to right, #5400FF, #B954FF);
    background: -moz-linear-gradient(to right, #5400FF, #B954FF);
    background: -webkit-linear-gradient(to right, #5400FF, #B954FF);
    background: -o-linear-gradient(to right, #5400FF, #B954FF);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 600;
  }
}
</style>