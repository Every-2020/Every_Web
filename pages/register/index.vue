<template>
  <div class="register">
    <div class="register_box">
      <register-select v-if="value === 1" @onSelect="onSelect" />
      <register-form v-if="value === 2" :idx="1" @onRegister="onRegister" @onBack="value = 1" />
      <register-form v-if="value === 3" :idx="2" @onRegister="onRegister" @onBack="value = 1" />
      <register-success v-if="value === 4" />
    </div>
  </div>
</template>

<script>
import RegisterSelect from '@/components/Register/RegisterSelect.vue'
import RegisterForm from '@/components/Register/RegisterForm.vue'
import RegisterSuccess from '@/components/Register/RegisterSuccess.vue'
export default {
  name: 'Register',
  components: {
    RegisterSelect,
    RegisterForm,
    RegisterSuccess
  },
  data () {
    return {
      value: 1,
      select: ''
    }
  },
  methods: {
    onSelect (position) {
      if (position === 'student') {
        this.value = 2
      } else {
        this.value = 3
      }
      this.select = position
    },
    onRegister () {
      this.value = 4
    }
  },
  head () {
    return {
      title: 'Every - 가입'
    }
  }
}
</script>

<style lang="scss">
.register {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  background-color: #F2F2F2;
  padding: 40px;
  @media screen and (max-width: 350px) {
    padding: 0 5px;
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
    background-color: white;
    flex-direction: column;
    box-shadow: 0px 0px 30px rgba(128, 128, 128, 0.507);
    -ms-flex-direction: column;
    @media screen and (max-width: 767px) {
      max-width: 400px;
    }
  }
}
</style>
