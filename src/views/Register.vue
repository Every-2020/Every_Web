<template>
  <div class="register">
    <div class="register_box">
      <div class="register_item">
        <div v-if="value > 1" class="register_item_header">
          <img src="@/assets/logo.png" alt="logo" class="login_item_logo">
          <h1 class="register_item_title">회원가입</h1>
        </div>
        <register-select @onSelect="onSelect" v-if="value === 1"></register-select>
        <register-student v-if="value === 2"></register-student>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterSelect from '@/components/Register/RegisterSelect.vue'
import RegisterStudent from '@/components/Register/RegisterInputStudent.vue'
export default {
  data() {
    return {
      value: 1,
      select: ''
    }
  },
  components: {
    RegisterSelect,
    RegisterStudent
  },
  methods: {
    onSubmit () {
      this.$store.state.register = true
      this.$router.push({ name: 'home' })
    },
    onSelect (position) {
      if (position === 'student') {
        this.value = 2
      } else {
        this.value = 3
      }
      this.select = position
    }
  },
}
</script>

<style lang="scss">
.register {
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
    &_title {
      font-size: 17pt;
      margin-top: 0;
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
}
</style>