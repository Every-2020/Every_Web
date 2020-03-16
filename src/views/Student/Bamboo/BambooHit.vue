<template>
  <div class="hit_bamboo">
    <div class="hit_box">
      <div class="hit_box_content">
        <div class="hit_box_content_header">
          <img @click="close" src="../../../assets/back.png" class="back" alt="back">
          <div class="hit_box_content_header_profile">
            <img src="../../../assets/student/bamboo/profile.png" alt="profile" class="profile">
            <div class="hit_box_content_header_items">
              <div class="hit_box_content_header_title">
                <span v-if="hit">#{{ hit.idx }}번째 이야기</span>
                <span v-else>불러오는 중</span>
              </div>
              <div class="hit_box_content_header_date">
                <span>★ 오늘의 인기 게시글</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="hit" :class="{'hit_box_content_main' : true, 'hit_box_content_main_hidden' : postHide(hit.content)}">
          <span class="hit_box_content_main_text">{{ postLength(hit.content) }}</span>
          <span class="hit_box_content_main_hide">...</span>
          <span @click="postSeeMore(0)" class="hit_box_content_main_more">더 보기</span>
          <span class="hit_box_content_main_text_hide">{{ postSplit(hit.content) }}</span>
        </div>
        <div v-else :class="{'hit_box_content_main' : true}">
          <span class="hit_box_content_main_text">불러오는 중</span>
        </div>
      </div>
      <div v-if="hit" class="hit_box_comment">
        <page-comment @onRefresh="refreshComment" :refresh="refresh" :idx="hit.idx"></page-comment>
        <comment-add @onCommentAdd="refreshComment" :refresh="refresh" :idx="hit.idx"></comment-add>
      </div>
      <div v-else class="hit_box_comment">
        <hit-load></hit-load>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import server from '@/models/server'
import HitLoad from '@/components/Student/Bamboo/Hit/HitLoad.vue'
import CommentAdd from '@/components/Student/Bamboo/Page/PageAddComment.vue'
import PageComment from '@/components/Student/Bamboo/Page/PageComment.vue'
export default {
  components: {
    PageComment,
    CommentAdd,
    HitLoad
  },
  data() {
    return {
      url: server,
      hit: '',
      refresh: 0
    }
  },
  mounted() {
    axios.get(`${this.url}/bamboo/post?order=hit`)
    .then(response => {
      if (response.data.status === 200) {
        this.hit = response.data.data.posts[0]
      }
    })
    .catch(() => {
      this.$swal('오류','로그인 시간이 만료되었습니다.','error')
      this.$router.push({name: 'login'})
    })
  },
  methods: {
    close () {
      this.$router.push({name: 'student'})
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
      document.getElementsByClassName('hit_box_content_main')[idx].classList.remove('hit_box_content_main_hidden')
    },
    postSplit (content) {
      return content.substring(250)
    },
    refreshComment () {
      this.refresh += 1
    },
    getDate (date) {
      let day = new Date(date)
      let today = day.getFullYear().toString() + "년 " + (day.getMonth() + 1).toString() + "월 " + day.getDate().toString() + "일"
    
      return today
    }
  },
}
</script>

<style lang="scss">
.hit_bamboo {
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
.hit {
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
        &_date {
          margin-top: 3px;
          span {
            cursor: pointer;
            font-size: 13px;
            border: 1.7px solid #FFC400;
            color: #FFC400;
            font-weight: 800;
            border-radius: 14px;
            text-align: center;
            padding: 3px 10px;
            @media screen and (max-width: 450px) {
              border: 1.3px solid #FFC400;
              font-size: 12px;
            }
          }
        }
        &_profile {
          display: flex;
          display: -webkit-flex;
          margin-left: 20px;
          align-items: center;
          @media screen and (max-width: 450px) {
            margin-left: 10px;
          }
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