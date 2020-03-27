<template>
  <div class="page_bamboo">
    <div class="page_box">
      <div class="page_box_content">
        <hit-header :item="item" @onClose="close" />
        <page-main :item="item.content" />
      </div>
      <div class="page_box_comment">
        <comment :loading="loading" :comments="comments" @onRefresh="refreshComment" />
        <comment-add :idx="item.idx" :count="count" @onCommentAdd="refreshComment" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CommentAdd from '~/components/Student/Bamboo/Hit/HitCommentAdd'
import Comment from '~/components/Student/Bamboo/Hit/HitComment'
import HitHeader from '~/components/Student/Bamboo/Hit/HitHeader'
import PageMain from '~/components/Student/Bamboo/Page/PageMain'
export default {
  name: 'BambooHit',
  components: {
    HitHeader,
    PageMain,
    Comment,
    CommentAdd
  },
  data () {
    return {
      refresh: 0,
      loading: true,
      item: {
        created_at: '',
        content: '',
        idx: 0
      },
      comments: [],
      count: 0
    }
  },
  async mounted () {
    await this.getPost()
    this.getAll()
  },
  methods: {
    async getAll () {
      await this.getComment()
      if (this.comments.length) {
        await this.getUsers()
      }
      setTimeout(() => {
        this.loading = false
      }, 300)
    },
    getPost () {
      return axios.get(`${this.$store.state.url}/bamboo/post?order=hit`)
        .then((response) => {
          if (response.data.status === 200) {
            this.item = response.data.data.posts[0]
          }
        })
        .catch(() => {
          this.$swal('오류', '로그인 시간이 만료되었습니다.', 'error')
          this.$router.push({ name: 'login' })
        })
    },
    getComment () {
      return axios.get(`${this.$store.state.url}/bamboo/reply?post=${this.item.idx}`)
        .then((res) => {
          this.comments = res.data.data.replies
          this.count = this.comments.length
        })
    },
    getUsers () {
      return this.comments.forEach((comment) => {
        this.getUser(comment, comment.student_idx)
      })
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
    close () {
      this.$router.push({ name: 'student' })
    },
    postHide (content) {
      if (content.length > 250) {
        return true
      } else {
        return false
      }
    },
    postLength (content) {
      if (content.length > 250) {
        return content.substring(0, 250).replace(/(?:\r\n|\r|\n)/g, '<br />')
      }
      return content
    },
    postSeeMore (idx) {
      document.getElementsByClassName('page_box_content_main')[idx].classList.remove('page_box_content_main_hidden')
    },
    postSplit (content) {
      return content.substring(250).replace(/(?:\r\n|\r|\n)/g, '<br />')
    },
    async refreshComment () {
      await this.getPost()
      this.getAll()
    }
  },
  head () {
    return {
      title: 'Every - 게시물'
    }
  }
}
</script>

<style lang="scss">
.page_bamboo {
  display: flex;
  display: -webkit-flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px;
  @media screen and (max-width: 767px) {
    padding: 0;
  }
}
.page {
  &_box {
    position: relative;
    z-index: 50;
    width: 100%;
    max-width: 1000px;
    height: 500px;
    background: white;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
    display: flex;
    display: -webkit-flex;
    @media screen and (max-width: 767px) {
      flex-direction: column;
      -ms-flex-direction: column;
      height: 100%;
    }
    &_content {
      display: flex;
      display: -webkit-flex;
      padding: 20px;
      width: 60%;
      flex-direction: column;
      -ms-flex-direction: column;
      @media screen and (max-width: 767px) {
        width: 100%;
      }
    }
    &_comment {
      position: relative;
      padding: 20px;
      padding-bottom: 0;
      width: 40%;
      display: flex;
      display: -webkit-flex;
      box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
      flex-direction: column;
      -ms-flex-direction: column;
      @media screen and (max-width: 767px) {
        width: 100%;
        flex-direction: column-reverse;
        -ms-flex-direction: column-reverse;
        box-shadow: none;
      }
    }
  }
}
</style>
