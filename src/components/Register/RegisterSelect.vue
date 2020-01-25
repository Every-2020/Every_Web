<template>
  <div class="select">
    <div class="register_item_header">
      <h1 style="margin-bottom: 10px;" class="register_item_title">회원가입하기에 앞서</h1>
      <h4 style="margin-top: 0px;">자신의 신분을 알려주세요!</h4>
    </div>
    <div class="select_content">
      <div @click="onSelect(0)" class="select_img">
        <div class="select_img_content">
          <img src="@/assets/register/student.svg" alt="student">
          <span>학생</span>
        </div>
      </div>
      <div @click="onSelect(1)" class="select_img">
        <div class="select_img_content">
          <img src="@/assets/register/worker.svg" alt="worker">
          <span>직장인</span>
        </div>
      </div>
      <div class="select_content_next">
        <span @click="onNext" style="cursor: pointer;">선택완료</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      position: ''
    }
  },
  methods: {
    onKeypress (e) {
      if (e.charCode === 13) { // 엔터키
        this.onNext()
      }
    },
    onSelect (idx) {
      if (idx === 0) {
        this.position = 'student'
      } else {
        this.position = 'worker'
      }
      document.getElementsByClassName('select_img')[idx].classList.add('selected')
      document.getElementsByClassName('select_img')[(idx === 1) ? 0 : 1].classList.remove('selected')
    },
    onNext () {
      if (this.position === '') {
        alert('선택해주세요.')
      } else {
        this.$emit('onSelect', this.position)
      }
    }
  },
}
</script>

<style lang="scss">
.select {
  padding: 30px 30px;
  &_img {
    margin: 0 auto;
    cursor: pointer;
    margin-top: 30px;
    background: linear-gradient(to right, rgb(158, 158, 158), rgb(158, 158, 158));
    background: -moz-linear-gradient(to right, #5400FF, #B954FF);
    background: -webkit-linear-gradient(to right, #5400FF, #B954FF);
    background: -o-linear-gradient(to right, #5400FF, #B954FF);
    border-radius: 20px;
    position: relative;
    height: 100px;
    display: flex;
    color: rgba(71, 71, 71, 0.801);
    display: -webkit-flex;
    width: 60%;
    box-shadow: 2px 2px 10px gray;
    &:before, &:after {
      content: '';
      display: block;
      box-flex: 1;
      -webkit-box-flex: 1;
      flex-grow: 1;
      height: 24px;
    }
    &_content {
      margin: 0 auto;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      span {
        color: white;
        font-size: 16pt;
        font-weight: 600;
      }
    }
    img {
      width: 3rem;
      margin-right: 10px;
    }
    input {
      font-size: 100pt;
    }
  }
  &_content_next {
    margin: 0 auto;
    margin-top: 50px;
    background: linear-gradient(to right, #5400FF, #B954FF);
    background: -moz-linear-gradient(to right, #5400FF, #B954FF);
    background: -webkit-linear-gradient(to right, #5400FF, #B954FF);
    background: -o-linear-gradient(to right, #5400FF, #B954FF);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 15pt;
    font-weight: 600;
  }
}
.selected {
  background: linear-gradient(to right, #5400FF, #B954FF);
  background: -moz-linear-gradient(to right, #5400FF, #B954FF);
  background: -webkit-linear-gradient(to right, #5400FF, #B954FF);
  background: -o-linear-gradient(to right, #5400FF, #B954FF);
}
</style>