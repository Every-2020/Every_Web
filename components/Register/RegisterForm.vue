<template>
  <div class="register_form">
    <div class="register_form_header">
      <img class="register_form_back" src="../../assets/register/back.png" @click="back">
      <div>
        <span class="register_form_header_title">회원가입 - {{ identity }}</span>
        <span class="register_form_header_content">각각 정보를 입력해주세요!</span>
      </div>
    </div>
    <div class="register_form_content">
      <div class="register_form_content_left">
        <div class="register_form_container">
          <input v-model="email" class="register_form_input" type="email" placeholder="이메일">
          <span v-if="emailCheck === 1">이미 가입된 이메일입니다!</span>
          <span v-if="emailCheck === 2">이 입력란을 작성해주세요.</span>
          <span v-if="emailCheck === 3">존재하지 않는 이메일입니다!</span>
        </div>
        <div class="register_form_container">
          <input v-model="pw" maxlength="20" class="register_form_input" type="password" placeholder="비밀번호         8~20자">
          <span v-if="pwCheck === 1">잘못된 비밀번호입니다!</span>
          <span v-if="pwCheck === 2">이 입력란을 작성해주세요.</span>
        </div>
        <div class="register_form_container">
          <input v-model="name" class="register_form_input" type="text" placeholder="이름">
          <span v-if="nameCheck === 2">이 입력란을 작성해주세요.</span>
        </div>
        <div class="register_form_container">
          <input
            v-model="birth"
            maxlength="4"
            class="register_form_input birth"
            type="text"
            placeholder="태어난 년도     ex) 2003"
            @keydown="inputBirth"
          >
          <span v-if="birthCheck === 1">잘못된 자릿수입니다!</span>
          <span v-if="birthCheck === 2">이 입력란을 작성해주세요.</span>
        </div>
      </div>
      <div class="register_form_content_between">
        <div class="register_form_content_between_line" />
      </div>
      <div class="register_form_content_right">
        <div class="register_form_container">
          <input
            v-model="phone"
            maxlength="13"
            class="register_form_input phone"
            type="text"
            placeholder="전화번호"
            @keydown="inputPhone"
          >
          <span v-if="phoneCheck === 1">잘못된 전화번호입니다!</span>
          <span v-if="phoneCheck === 2">이 입력란을 작성해주세요.</span>
          <span v-if="phoneCheck === 3">이미 가입된 전화번호입니다!</span>
        </div>
        <register-student
          v-if="identity === '학생'"
          :school-check="schoolCheck"
          @onSelect="onSelect"
        />
        <register-worker
          v-if="identity === '대학생/직장인'"
          :place-check="placeCheck"
          :category-check="categoryCheck"
          @onKeydown="onKeydown"
          @onCategory="onCategory"
        />
      </div>
    </div>
    <div class="register_form_footer">
      <button @click="onSubmit">
        다음
      </button>
    </div>
    <img class="wave_768" src="../../assets/register/wave@768px.png" alt="wave">
    <img class="wave" src="../../assets/register/wave.png" alt="wave">
  </div>
</template>

<script>
import axios from 'axios'
import sha512 from 'js-sha512'
import RegisterStudent from '@/components/Register/RegisterStudent.vue'
import RegisterWorker from '@/components/Register/RegisterWorker.vue'
import server from '@/models/server'
export default {
  name: 'RegisterForm',
  components: {
    RegisterStudent,
    RegisterWorker
  },
  props: {
    idx: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      email: '',
      pw: '',
      name: '',
      birth: '',
      phone: '',
      url: server,
      identity: '',
      school_id: '',
      place: '',
      category: '',
      emailCheck: 0,
      pwCheck: 0,
      birthCheck: 0,
      nameCheck: 0,
      phoneCheck: 0,
      schoolCheck: 0,
      placeCheck: 0,
      categoryCheck: 0
    }
  },
  mounted () {
    if (this.idx === 1) {
      this.identity = '학생'
    } else {
      this.identity = '대학생/직장인'
    }
  },
  methods: {
    back () {
      this.$emit('onBack')
    },
    inputBirth () {
      const obj = document.getElementsByClassName('birth')[0]
      const number = obj.value.replace(/[^0-9]/g, '')
      let birth = ''
      if (number.length < 5) {
        birth = number
      } else {
        birth = number.slice(0, 4)
      }
      this.birth = birth
      obj.value = birth
    },
    inputPhone () {
      const obj = document.getElementsByClassName('phone')[0]
      const number = obj.value.replace(/[^0-9]/g, '')
      let phone = ''
      if (number.length < 4) {
        phone = number
      } else if (number.length < 7) {
        phone += number.substr(0, 3)
        phone += '-'
        phone += number.substr(3)
      } else if (number.length < 10) {
        phone += number.substr(0, 3)
        phone += '-'
        phone += number.substr(3, 3)
        phone += '-'
        phone += number.substr(6)
      } else if (number.length < 14) {
        phone += number.substr(0, 3)
        phone += '-'
        phone += number.substr(3, 4)
        phone += '-'
        phone += number.substr(7)
      }
      this.phone = phone
      obj.value = phone
    },
    onSubmit () {
      this.checkEmail()
      this.checkPw()
      this.checkName()
      this.checkBirth()
      this.checkPhone()
      if (this.identity === '학생') {
        this.checkSchool()
      } else {
        this.checkPlace()
        this.checkCategory()
      }
      if (this.emailCheck === 0 && this.pwCheck === 0 && this.nameCheck === 0 && this.birthCheck === 0 && this.phoneCheck === 0) {
        if (this.identity === '학생' && this.school_id !== '') {
          this.submitStudent()
        } else if (this.identity === '대학생/직장인' && this.placeCheck === 0 && this.categoryCheck === 0) {
          this.submitWorker()
        }
      }
    },
    checkEmail () {
      const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
      if (this.email === '') {
        this.emailCheck = 2
      } else if (this.email.match(regExp) === null) {
        this.emailCheck = 3
      } else {
        axios.get(`${this.url}/auth/check/email?email=${this.email}`)
          .then((response) => {
            if (response.status === 200) {
              this.emailCheck = 0
            }
          })
          .catch((error) => {
            console.log(error)
            this.emailCheck = 1
          })
      }
    },
    checkPw () {
      if (this.pw === '') {
        this.pwCheck = 2
      } else if (this.pw.length < 8) {
        this.pwCheck = 1
      } else {
        this.pwCheck = 0
      }
    },
    checkName () {
      if (this.name === '') {
        this.nameCheck = 2
      } else {
        this.nameCheck = 0
      }
    },
    checkBirth () {
      if (this.birth === '') {
        this.birthCheck = 2
      } else if (this.birth.length < 4) {
        this.birthCheck = 1
      } else if (this.birth < 1900 || this.birth > 2020) {
        this.birthCheck = 1
      } else {
        this.birthCheck = 0
      }
    },
    checkPhone () {
      const phone = /^\d{3}-\d{3,4}-\d{4}$/
      if (this.phone === '') {
        this.phoneCheck = 2
      } else if (this.phone.match(phone) === null) {
        this.phoneCheck = 1
      } else {
        axios.get(`${this.url}/auth/check/phone?phone=${this.phone}`)
          .then((response) => {
            if (response.status === 200) {
              this.phoneCheck = 0
            }
          })
          .catch((error) => {
            console.log(error)
            this.phoneCheck = 3
          })
      }
    },
    checkSchool () {
      if (this.school_id === '') {
        this.schoolCheck = 1
      } else {
        this.schoolCheck = 0
      }
    },
    checkPlace () {
      if (this.place === '') {
        this.placeCheck = 1
      } else {
        this.placeCheck = 0
      }
    },
    checkCategory () {
      if (this.category === '') {
        this.categoryCheck = 1
      } else {
        this.categoryCheck = 0
      }
    },
    submitStudent () {
      axios.post(`${this.url}/auth/register/student`, {
        email: this.email,
        pw: sha512(this.pw),
        name: this.name,
        phone: this.phone,
        birth_year: this.birth,
        school_id: this.school_id
      })
        .then((response) => {
          if (response.status === 201) {
            this.$emit('onRegister')
          }
        })
        .catch(() => {
          this.$swal('오류', '회원가입에 실패하였습니다.', 'error')
          this.next = 1
        })
    },
    submitWorker () {
      axios.post(`${this.url}/auth/register/worker`, {
        email: this.email,
        pw: sha512(this.pw),
        name: this.name,
        phone: this.phone,
        birth_year: this.birth,
        work_place: this.place,
        work_category: this.category
      })
        .then((response) => {
          if (response.status === 201) {
            this.$emit('onRegister')
          }
        })
        .catch(() => {
          this.$swal('오류', '회원가입에 실패하였습니다.', 'error')
          this.next = 1
        })
    },
    onSelect (id) {
      this.schoolCheck = 0
      this.school_id = id
    },
    onKeydown (place) {
      this.place = place
    },
    onCategory (category) {
      this.category = category
    }
  }
}
</script>

<style lang="scss">
.register_form {
  display: flex;
  display: -webkit-flex;
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 40px 30px 40px 30px;
  flex-direction: column;
  -ms-flex-direction: column;
  min-height: 578px;
  max-height: 578px;
  @media screen and (max-width: 450px) {
    padding: 40px 20px 40px 20px;
  }
  @media screen and (max-width: 350px) {
    min-height: 560px;
    max-height: 560px;
  }
  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    display: block;
    &_768 {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      display: none;
      @media screen and (max-width: 767px) {
        display: block;
      }
    }
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
  &_footer {
    position: relative;
    z-index: 10;
    button {
      background-color: #8A51FF;
      border: none;
      width: 189px;
      height: 38px;
      font-size: 18px;
      cursor: pointer;
      color: white;
      font-weight: 700;
    }
  }
  &_container {
    width: 100%;
    max-width: 345px;
    position: relative;
    margin-top: 10px;
    margin-bottom: 25px;
    @media screen and (max-width: 767px) {
      margin-bottom: 15px;
    }
    span {
      color: #FF8282;
      font-weight: 700;
      font-size: 14px;
      left: 10px;
      top: 38px;
      position: absolute;
      @media screen and (max-width: 767px) {
        top: 35px;
      }
      @media screen and (max-width: 450px) {
        font-size: 13px;
      }
    }
  }
  &_input {
    height: 34px;
    border: none;
    background-color: #E8E8E8;
    font-size: 15px;
    width: 100%;
    color: rgb(139, 139, 139);
    padding: 10px;
    max-width: 345px;
    &::placeholder {
      color: #CFCFCF;
      font-weight: 800;
    }
    &:focus {
      outline: none;
    }
    @media screen and (max-width: 767px) {
      height: 32px;
      font-size: 14px;
    }
    @media screen and (max-width: 450px) {
      height: 29px;
      font-size: 12px;
    }
  }
  &_header {
    text-align: left;
    margin-bottom: 20px;
    @media screen and (max-width: 767px) {
      margin-bottom: 0px;
    }
    div {
      display: inline-block;
    }
    &_title {
      font-size: 46px;
      color: #2D008A;
      font-weight: 800;
      @media screen and (max-width: 767px) {
        font-size: 20px;
      }
    }
    &_content {
      display: block;
      margin-top: 5px;
      font-size: 20px;
      font-weight: 700;
      color: #260074;
      @media screen and (max-width: 767px) {
        font-size: 18px;
      }
      @media screen and (max-width: 450px) {
        font-size: 15px;
      }
    }
  }
  &_back {
    margin-right: 20px;
    margin-bottom: 20px;
    display: inline-block;
    cursor: pointer;
    @media screen and (max-width: 767px) {
      width: 40px;
      margin-right: 0;
      margin-bottom: 10px;
    }
    @media screen and (max-width: 480px) {
      margin-bottom: 10px;
      margin-right: 10px;
      width: 30px;
    }
  }
  &_content {
    display: flex;
    display: -webkit-flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    @media screen and (max-width: 767px) {
      flex-direction: column;
      -ms-flex-direction: column;
    }
    &_left {
      display: flex;
      display: -webkit-flex;
      align-items: center;
      flex-direction: column;
      -ms-flex-direction: column;
      flex-basis: 0;
      flex-grow: 6;
      padding: 10px;
      padding-bottom: 40px;
      @media screen and (max-width: 767px) {
        padding-bottom: 0;
        padding-top: 5px;
      }
      flex-shrink: 1;
    }
    &_between {
      display: flex;
      display: -webkit-flex;
      flex-grow: 2;
      max-width: 75px;
      justify-content: center;
      @media screen and (max-width: 767px) {
        display: none;
      }
      &_line {
        width: 6px;
        height: 100%;
        max-height: 291px;
        border-radius: 10px;
        background-color: #E8E8E8;
      }
    }
    &_right {
      padding: 10px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      flex-direction: column;
      -ms-flex-direction: column;
      flex-basis: 0;
      flex-grow: 6;
      flex-shrink: 1;
      @media screen and (max-width: 767px) {
        padding-top: 0;
      }
      @media screen and (max-width: 350px) {
        padding-bottom: 0;
      }
    }
  }
}
</style>
