<template>
  <div class="register_student">
    <div class="register_student_form">
      <input class="register_student_form_input" v-model="email" required/>
      <div class="register_student_form_placeholder">이메일</div>
    </div>
    <div class="register_student_form">
      <input class="register_student_form_input" type="text" v-model="id" required/>
      <div class="register_student_form_placeholder">아이디</div>
    </div>
    <div class="register_student_form">
      <input class="register_student_form_input" type="password" v-model="pw" required/>
      <div class="register_student_form_placeholder">비밀번호</div>
      <div @click="showPw(2, 0)" class="register_student_form_eye">
        <i class="fas fa-eye"></i>
      </div>
    </div>
    <div class="register_student_form">
      <input class="register_student_form_input" v-model="name" required/>
      <div class="register_student_form_placeholder">이름</div>
    </div>
    <div class="register_student_form_input_next">
      <span style="cursor: pointer;">다음</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      pw: '',
      email: '',
      name: ''
    }
  },
  methods: {
    showPw (input, i) {
      document.getElementsByClassName('register_student_form')[input].classList.toggle('active')
      if (document.getElementsByClassName('register_student_form')[input].classList.contains('active')) {
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
.register_student {
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
      &_next {
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
    &_eye {
      position: absolute;
      right: 15px;
      cursor: pointer;
      top: 13px;
      color: gray;
    }
  }
}
</style>