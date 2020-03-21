<template>
  <div class="comment_popup">
    <div class="comment_popup_area" @click="onBack" />
    <div class="comment_popup_box">
      <div class="comment_popup_box_header">
        <img src="~/assets/back.png" alt="back" class="comment_popup_box_header_back" @click="onBack">
        <img src="~/assets/student/bamboo/profile.png" alt="profile" class="comment_popup_box_header_profile">
        <span>{{ name }}</span>
      </div>
      <textarea v-model="text" maxlength="250" class="comment_edit" />
      <button @click="onEdit">
        수정
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      text: this.content
    }
  },
  mounted () {
    document.getElementsByClassName('comment_edit')[0].focus()
  },
  methods: {
    onBack () {
      this.$emit('onBack')
    },
    onEdit () {
      this.$emit('onEdit', this.text)
    }
  }
}
</script>

<style lang="scss">
.comment_popup {
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
