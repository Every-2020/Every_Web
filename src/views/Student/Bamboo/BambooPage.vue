<template>
  <div class="page_bamboo">
    <div class="page_box">
      <div class="page_box_content">
        <div class="page_box_content_header">
          <img @click="close" src="../../../assets/back.png" class="back" alt="back">
          <div class="page_box_content_header_profile">
            <img src="../../../assets/bamboo/profile.png" alt="profile" class="profile">
            <div class="page_box_content_header_items">
              <div class="page_box_content_header_title">
                <span>#{{ idx }}번째 이야기</span>
              </div>
              <div class="page_box_content_header_time">
                <span :title="items.created_at.substring(0, 19)">{{ postTimeCalc(items.created_at) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div :class="{'page_box_content_main' : true, 'page_box_content_main_hidden' : postHide(items.content)}">
          <span class="page_box_content_main_text">{{ postLength(items.content) }}</span>
          <span class="page_box_content_main_hide">...</span>
          <span @click="postSeeMore(0)" class="page_box_content_main_more">더 보기</span>
          <span class="page_box_content_main_text_hide">{{ postSplit(items.content) }}</span>
        </div>
      </div>
      <div class="page_box_comment">
        <page-comment @onRefresh="refreshComment" :refresh="refresh" :idx="idx"></page-comment>
        <comment-add @onCommentAdd="refreshComment" :refresh="refresh" :idx="idx"></comment-add>
      </div>
    </div>
  </div>
</template>

<script>
import CommentAdd from '@/components/Student/Bamboo/Page/PageAddComment.vue'
import PageComment from '@/components/Student/Bamboo/Page/PageComment.vue'
import server from '@/models/server'
import axios from 'axios'
export default {
  name: 'bambooPage',
  props: ['idx'],
  data () {
    return {
      url: server,
      refresh: 0,
      items: {
        created_at: '',
        content: ''
      }
    }
  },
  components: {
    PageComment,
    CommentAdd
  },
  created () {
    axios.get(`${this.url}/bamboo/post/${this.idx}`)
    .then(response => {
      if (response.data.status === 200) {
        this.items = response.data.data.post
      }
    })
  },
  methods: {
    close () {
      this.$router.push({name: 'bamboo'})
    },
    postTimeCalc (time) {
      const created = new Date(time)
      const date = new Date()
      const dateGab = date - created
      if (dateGab < 1000) {
        return "방금"
      } else if (dateGab < 60000) {
        return parseInt(dateGab / 1000) + "초"
      } else if (dateGab < 3600000) {
        return parseInt(dateGab / 60000) + "분"
      } else if (dateGab < 86400000) {
        return parseInt(dateGab / 3600000) + "시간"
      } else if (dateGab < 604800000) {
        return parseInt(dateGab / 86400000) + "일"
      } else {
        return parseInt(dateGab / 604800000) + "주"
      }
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
          return content.substring(0, 250)
      }
      return content;
    },
    postSeeMore (idx) {
      document.getElementsByClassName('page_box_content_main')[idx].classList.remove('page_box_content_main_hidden')
    },
    postSplit (content) {
      return content.substring(250)
    },
    refreshComment () {
      this.refresh += 1
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
      &_header {
        width: 100%;
        height: 70px;
        text-align: left;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        @media screen and (max-width: 450px) {
          height: 50px;
        }
        .back {
          width: 45px;
          height: 45px;
          cursor: pointer;
          @media screen and (max-width: 450px) {
            width: 30px;
            height: 30px;
          }
        }
        .profile {
          width: 70px;
          height: 70px;
          @media screen and (max-width: 450px) {
            width: 50px;
            height: 50px;
          }
        }
        &_items {
          margin-left: 15px;
          display: flex;
          display: -webkit-flex;
          flex-direction: column;
          -ms-flex-direction: column;
          @media screen and (max-width: 450px) {
            margin-left: 8px;
          }
        }
        &_title {
          font-size: 23px;
          font-weight: 800;
          color: black;
          @media screen and (max-width: 450px) {
            font-size: 20px;
          }
        }
        &_time {
          font-size: 16px;
          color: gray;
          span {
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        &_profile {
          display: flex;
          display: -webkit-flex;
          margin-left: 20px;
          align-items: center;
        }
      }
      &_main {
        padding-top: 20px;
        font-size: 18px;
        text-align: left;
        overflow-y: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
        word-break: break-all;
        &::-webkit-scrollbar {
          display: none;
        }
        &_more {
          color: gray;
          display: none;
          cursor: pointer;
          &:hover {
            text-decoration-line: underline;
          }
        }
        &_hide {
          display: none;
        }
        &_hidden &_hide {
          display: inline !important;
        }
        &_hidden &_more {
          display: inline !important;
        }
        &_text_hide {
          display: inline;
        }
        &_hidden &_text_hide {
          display: none !important;
        }
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