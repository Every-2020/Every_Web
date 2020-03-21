<template>
  <div class="login_right">
    <div class="login_right_header">
      <span class="login_right_title">환영합니다!</span>
      <span class="login_right_exp">로그인 후 서비스 이용이 가능합니다.</span>
    </div>
    <form name="login" @submit.prevent="onSubmit">
      <input v-model="email" name="email" type="email" placeholder="이메일">
      <input v-model="pw" name="pw" type="password" placeholder="비밀번호">
      <span class="forgot" @click="forgot">비밀번호를 잊으셨나요?</span>
      <button type="submit">
        로그인
      </button>
    </form>
  </div>
</template>

<script>
import sha512 from 'js-sha512'
import axios from 'axios'
import server from '@/models/server'
export default {
  name: 'LoginRight',
  data () {
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
        pw: sha512(this.pw)
      })
        .then((response) => {
          if (response.status === 200) {
            this.$swal('환영합니다!', '로그인에 성공하였습니다.', 'success')
            if (response.data.data.worker_idx) {
              this.$cookie.set('idx', response.data.data.worker_idx, { expires: '12h' })
              this.$cookie.set('identity', 'worker', { expires: '12h' })
              this.$store.commit('setInfo', {
                newIdx: response.data.data.worker_idx,
                newIdentity: 'worker',
                newAccess: response.data.data['x-access-token']
              })
            } else {
              this.$cookie.set('identity', 'student', { expires: '12h' })
              this.$cookie.set('idx', response.data.data.student_idx, { expires: '12h' })
              this.$store.commit('setInfo', {
                newIdx: response.data.data.student_idx,
                newIdentity: 'student',
                newAccess: response.data.data['x-access-token']
              })
            }
            this.$cookie.delete('access')
            this.$cookie.set('access', response.data.data['x-access-token'], { expires: '12h' })
            axios.defaults.headers.common.token = response.data.data['x-access-token']
            this.$router.push({ path: '/' })
          }
        })
        .catch(() => {
          this.$swal('오류', '이메일 또는 비밀번호가 올바르지 않습니다.', 'error')
        })
    },
    forgot () {
      this.$swal('안내', '현재 개발 중입니다.', 'warning')
    }
  }
}
</script>

<style lang="scss">
.login_right {
  display: flex;
  display: -webkit-flex;
  background-color: var(--bg-color);
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
    color: var(--text-color-purple);
    font-size: 36px;
    font-weight: 800;
  }
  &_exp {
    font-size: 16px;
    font-weight: 700;
    display: block;
    color: var(--text-color-purple);
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
    color: var(--text-color-purple-blue);
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
</style>
