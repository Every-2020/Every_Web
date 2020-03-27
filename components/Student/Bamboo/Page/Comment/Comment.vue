<template>
  <div class="comment">
    <comment-load v-if="loading" />
    <div v-for="(comment, index) in comments" v-else :key="index" class="comment_area">
      <comment-box :comment="comment" @onClick="onClick" @onRefresh="onRefresh" @openEdit="openEdit" />
      <div class="comment_area_exp">
        <span :title="comment.created_at.substring(0, 19)">{{ postTimeCalc(comment.created_at) }}</span>
      </div>
    </div>
    <div v-if="!comments.length && loading === false" class="comment_none">
      <span>댓글이 없습니다.</span>
    </div>
    <comment-edit v-if="editing" :content="edit_content" :name="edit_name" @onEdit="onEdit" @onBack="onBack" />
  </div>
</template>

<script>
import axios from 'axios'
import CommentLoad from '~/components/Student/Bamboo/Page/Comment/CommentLoad'
import CommentBox from '~/components/Student/Bamboo/Page/Comment/CommentBox'
import CommentEdit from '~/components/Student/Bamboo/Page/Comment/CommentEdit'
export default {
  components: {
    CommentEdit,
    CommentLoad,
    CommentBox
  },
  props: {
    idx: {
      type: Number,
      required: true
    },
    refresh: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      comments: {},
      loading: true,
      more_idx: '',
      editing: false,
      edit_name: '',
      edit_content: ''
    }
  },
  watch: {
    refresh () {
      this.getAll()
    }
  },
  mounted () {
    this.getAll()
  },
  methods: {
    async getAll () {
      await this.getComment()
      if (this.comments.length) {
        await this.getUsers()
      }
      this.loading = false
    },
    getComment () {
      return axios.get(`${this.$store.state.url}/bamboo/reply?post=${this.idx}`)
        .then((res) => {
          this.comments = res.data.data.replies
        })
    },
    getUsers () {
      return this.comments.forEach((comment) => {
        this.getUser(comment, comment.student_idx)
      })
    },
    onRefresh () {
      this.$emit('onRefresh')
    },
    openEdit () {
      this.editing = true
    },
    onBack () {
      this.editing = false
    },
    onClick (comment) {
      this.more_idx = comment.idx
      this.edit_content = comment.content
      this.edit_name = comment.user
    },
    editComment (edit) {
      axios.put(`${this.$store.state.url}/bamboo/reply/${this.more_idx}`, {
        content: edit
      })
        .then(() => {
          this.editing = false
        })
        .catch(() => {
          this.$swal('오류', '로그인 시간이 만료되었습니다.', 'error')
          this.$router.push({ name: 'login' })
        })
    },
    async onEdit (edit) {
      if (edit.replace(/\s+$/, '') !== '') {
        await this.editComment(edit)
        setTimeout(() => {
          this.$emit('onRefresh')
        }, 200)
      }
    },
    getUser (comment, idx) {
      axios.get(`${this.$store.state.url}/member/student/${idx}`)
        .then((res) => {
          if (res.data.status === 200) {
            this.$set(comment, 'edit', false)
            this.$set(comment, 'user', res.data.data.member.name)
          }
        })
    },
    postTimeCalc (time) {
      const created = new Date(
        parseInt(time.substring(0, 4)),
        parseInt(time.substring(5, 7)) - 1,
        parseInt(time.substring(8, 10)),
        parseInt(time.substring(11, 13)),
        parseInt(time.substring(14, 16)),
        parseInt(time.substring(18, 20))
      )
      const date = new Date()
      const dateGab = (parseInt(date.getTime() - created.getTime()) / 1000)
      if (dateGab < 60) {
        return '방금'
      } else if (dateGab < 3600) {
        return parseInt(dateGab / 60) + '분'
      } else if (dateGab < 86400) {
        return parseInt(dateGab / 3600) + '시간'
      } else if (dateGab < 604800) {
        return parseInt(dateGab / 86400) + '일'
      } else {
        return parseInt(dateGab / 604800) + '주'
      }
    }
  }
}
</script>

<style lang="scss">
.comment {
  flex-grow: 1;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -ms-flex-direction: column;
  height: calc(100% - 80px);
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  @media screen and (max-width: 767px) {
    height: auto;
    overflow: scroll;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  &_area {
    display: flex;
    display: -webkit-flex;
    margin-bottom: 20px;
    position: relative;
    flex-direction: column;
    -ms-flex-direction: column;
    &_exp {
      text-align: left;
      padding-top: 3px;
      padding-left: 70px;
      color: #757575;
      font-weight: 700;
      font-size: 14px;
      span {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      @media screen and (max-width: 450px) {
        font-size: 12px;
      }
    }
    &_content {
      display: flex;
      display: -webkit-flex;
      position: relative;
      width: 100%;
    }
    &_box {
      max-width: calc(100% - 90px);
      position: relative;
      padding-left: 10px;
      &_img {
        width: 34px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
      }
      &_content {
        background-color: #EFEFEF;
        border-radius: 15px;
        padding: 10px;
        text-align: left;
        max-width: calc(100%);
        word-break: break-all;
        z-index: 5;
        &_text {
          white-space: pre-line;
          word-wrap: break-word;
          word-break: keep-all;
          font-size: 16px;
          color: black;
          display: inline;
          @media screen and (max-width: 450px) {
            font-size: 14px;
          }
        }
        &_title {
          font-weight: 700;
          font-size: 17px;
          margin-bottom: 3px;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
          @media screen and (max-width: 450px) {
            font-size: 15px;
          }
        }
      }
    }
    &_more {
      margin-left: 15px;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
      &_img {
        width: 15px;
        height: 15px;
        opacity: 0.4;
        filter: alpha(opacity=40);
        cursor: pointer;
        position: relative;
      }
    }
  }
  &_profile {
    width: 50px;
    height: 50px;
    @media screen and (max-width: 450px) {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
