<template>
  <div class="page_bamboo">
    <div class="page_box">
      <div class="page_box_content">
        <page-header :item="item" @onClose="close" />
        <page-main :item="item.content" />
      </div>
      <div class="page_box_comment">
        <comment :refresh="refresh" :idx="idx" @onRefresh="refreshComment" />
        <comment-add :refresh="refresh" :idx="idx" @onCommentAdd="refreshComment" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CommentAdd from '~/components/Student/Bamboo/Page/Comment/CommentAdd.vue'
import Comment from '~/components/Student/Bamboo/Page/Comment/Comment.vue'
import PageHeader from '~/components/Student/Bamboo/Page/PageHeader'
import PageMain from '~/components/Student/Bamboo/Page/PageMain'
export default {
  name: 'BambooPage',
  components: {
    PageHeader,
    PageMain,
    Comment,
    CommentAdd
  },
  data () {
    return {
      refresh: 0,
      load: true,
      idx: parseInt(this.$router.app._route.query.idx),
      item: {
        created_at: '',
        content: ''
      }
    }
  },
  mounted () {
    axios.get(`${this.$store.state.url}/bamboo/post/${this.idx}`)
      .then((response) => {
        if (response.data.status === 200) {
          this.item = response.data.data.post
          this.load = false
        }
      })
      .catch(() => {
        this.$swal('오류', '로그인 시간이 만료되었습니다.', 'error')
        this.$router.push({ name: 'login' })
      })
  },
  methods: {
    close () {
      this.$router.push({ name: 'student-bamboo' })
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
    refreshComment () {
      this.refresh += 1
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
