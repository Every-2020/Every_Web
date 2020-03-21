<template>
  <div class="comment_footer">
    <span class="comment_footer_count">댓글 {{ count }}개</span>
    <div class="comment_footer_content">
      <div class="comment_footer_content_box">
        <textarea v-model="comment" maxlength="250" type="text" placeholder="댓글 달기..." />
        <img src="~/assets/student/bamboo/submit.png" alt="submit" @click="onSubmit">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    count: {
      type: Number,
      required: true
    },
    idx: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      comment: ''
    }
  },
  methods: {
    onSubmit () {
      if (this.comment.replace(/\s+$/, '') !== '') {
        axios.post(`${this.$store.state.url}/bamboo/reply`, {
          content: this.comment,
          post: this.idx
        })
          .then((res) => {
            if ((res).data.status === 201) {
              this.comment = ''
              setTimeout(() => {
                this.$emit('onCommentAdd')
              }, 200)
            }
          })
          .catch(() => {
            this.$swal('오류', '로그인 시간이 만료되었습니다.', 'error')
            this.$router.push({ name: 'login' })
          })
      } else {
        this.$swal('오류', '입력란을 작성해주세요.', 'error')
      }
    }
  }
}
</script>

<style lang="scss">
.comment_footer {
  height: 80px;
  width: 100%;
  text-align: left;
  position: relative;
  &_count {
    text-align: left;
    color: #878787;
    font-size: 13px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  &_content {
    margin-top: 5px;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    border-top: #E2E2E2 1px solid;
    &_box {
      margin-top: 10px;
      width: 100%;
      position: relative;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      img {
        width: 25px;
        margin-left: 10px;
        cursor: pointer;
        @media screen and (max-width: 450px) {
          margin-left: 15px;
          width: 20px;
        }
      }
      textarea {
        width: calc(100% - 50px);
        height: 35px;
        border-radius: 21px;
        border: none;
        background-color: #F1F1F1;
        padding-left: 20px;
        font-size: 15px;
        padding-top: 10px;
        resize: none;
        font-family: 'NanumSquare', sans-serif;
        &::placeholder {
          font-weight: 700;
          color: #C2C2C2;
        }
        &:focus {
          outline: none;
        }
        @media screen and (max-width: 450px) {
          font-size: 13px;
          padding-top: 8px;
          height: 30px;
        }
      }
    }
  }
}
</style>
