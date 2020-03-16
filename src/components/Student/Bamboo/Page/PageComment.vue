<template>
  <div class="comment">
    <div class="comment_area" v-if="loading">
      <div class="comment_area_content">
        <div class="comment_profile comment_load_profile loading"></div>
        <div class="comment_area_box comment_load_box">
          <div class="comment_area_box_content">
            <div class="comment_load_title loading"></div>
            <div class="comment_load_first loading"></div>
            <div class="comment_load_second loading"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="comment_area" v-for="(comment, index) in comments" :key="index">
      <div class="comment_area_content">
        <img class="comment_profile" src="../../../../assets/student/bamboo/profile.png" alt="profile">
        <div class="comment_area_box">
          <img class="comment_area_box_img" src="../../../../assets/student/bamboo/comment.png" alt="comment">
          <div class="comment_area_box_content">
            <div>
              <span class="comment_area_box_content_title">
                {{ comment['user'] }}
              </span>
            </div>
            <span class="comment_area_box_content_text" v-html="comment.content.replace(/(?:\r\n|\r|\n)/g, '<br />')"></span>
          </div>
          <div class="comment_more" v-if="comment.edit">
            <div @click="onClose(comment)" class="comment_more_area"></div>
            <div class="comment_more_box">
              <div @click="openEdit(comment)" class="comment_more_box_edit">
                <img src="../../../../assets/student/bamboo/edit.png" alt="edit">
                <span>댓글 수정하기</span>
              </div>
              <div @click="onDelete(comment)" class="comment_more_box_delete">
                <img src="../../../../assets/student/bamboo/delete.png" alt="delete">
                <span>댓글 삭제하기</span>
              </div>
            </div>
          </div>
        </div>
        <div class="comment_area_more" v-if="comment.student_idx === my_idx">
          <img class="comment_area_more_img" @click="onClick(comment)" src="../../../../assets/student/bamboo/more.png" alt="more">
        </div>
      </div>
      <div class="comment_area_exp">
        <span :title="comment.created_at.substring(0, 19)">{{ postTimeCalc(comment.created_at) }}</span>
      </div>
    </div>
    <div class="comment_none" v-if="!comments.length && this.loading === false">
      <span>댓글이 없습니다.</span>
    </div>
    <comment-edit @onEdit="onEdit" @onBack="onBack" :edit="edit" :name="edit_name" v-if="editing"></comment-edit>
  </div>
</template>

<script>
import CommentEdit from '@/components/Student/Bamboo/Page/PageEditComment'
import axios from 'axios'
import server from '@/models/server'
export default {
  data() {
    return {
      url: server,
      comments: {},
      loading: true,
      edit: '',
      editing: false,
      edit_idx: '',
      edit_name: '',
      more: [],
    }
  },
  props: ['idx', 'refresh'],
  computed: {
    my_idx: function () {
      return parseInt(this.$cookie.get('idx'))
    }
  },
  watch: {
    refresh: function () {
      this.loading = true
      axios.get(`${this.url}/bamboo/reply?post=${this.idx}`)
      .then(response => {
        if (response.data.status === 200) {
          this.comments = response.data.data.replies
          for(let comment of this.comments) {
            this.getUser(comment, comment.student_idx)
          }
          this.loading = false
        }
      })
    }
  },
  created() {
    axios.get(`${this.url}/bamboo/reply?post=${this.idx}`)
    .then(response => {
      if (response.data.status === 200) {
        this.comments = response.data.data.replies
        for(let comment of response.data.data.replies) {
          this.getUser(comment, comment.student_idx)
        }
        this.loading = false
      }
    })
  },
  components: {
    CommentEdit
  },
  methods: {
    onDelete (comment) {
      comment.edit = false
      this.$swal
      .fire({
        title: '경고',
        text: '정말로 삭제하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: '삭제하기',
        cancelButtonText: '취소',
        icon: 'warning',
        })
        .then((result) => {
          if (result.value) {
            axios.delete(`${this.url}/bamboo/reply/${comment.idx}`)
            .then(response => {
              if (response.data.status === 200) {
                this.$swal.fire(
                  '완료!',
                  '댓글을 성공적으로 삭제하였습니다.',
                  'success'
                )
                this.$emit('onRefresh')
              }
            })
            .catch(() => {
              this.$swal.fire(
                  '오류',
                  '댓글을 삭제하지 못했습니다.',
                  'error'
                )
            })
          }
        })
    },
    openEdit (comment) {
      comment.edit = false
      this.editing = true
    },
    onClose (comment) {
      comment.edit = false
    },
    onBack () {
      this.editing = false
    },
    onClick (comment) {
      comment['edit'] = true
      this.edit_idx = comment.idx
      this.edit = comment.content
      this.edit_name = comment.user
    },
    onEdit (edit) {
      if (edit) {
        axios.put(`${this.url}/bamboo/reply/${this.edit_idx}`, {
          content: edit
        })
        .then(() => {
          this.editing = false
        })
        .catch((error) => {
          console.log(error)
        })
        setTimeout(() => {
          this.$emit('onRefresh')
        }, 200);
      }
    },
    getUser (comment, idx) {
      axios.get(`${this.url}/member/student/${idx}`)
      .then(response => {
        if (response.data.status === 200) {
          this.$set(comment, 'edit', false)
          this.$set(comment, 'user', response.data.data.member.name)
        }
      })
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
    }
  },
}
</script>

<style lang="scss">
@import "@/assets/style/animation.scss";

.loading {
  animation: loading 2s infinite ease-in-out;
  -webkit-animation: loading 2s infinite ease-in-out;
  -o-animation: loading 2s infinite ease-in-out;
  -moz-animation: loading 2s infinite ease-in-out;
}
.comment_more {
  &_area {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
  }
  &_box {
    position: absolute;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -ms-flex-direction: column;
    padding: 8px;
    z-index: 200;
    border-radius: 5px;
    width: 140px;
    background-color: #F8F8F8;
    right: -40px;
    top: 15px;
    &_edit {
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        width: 22px;
        height: 22px;
      }
      span {
        margin-left: 5px;
        font-size: 14px;
        font-weight: 700;
        color: rgba(0, 0, 0, 0.50);
      }
    }
    &_delete {
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
      margin-top: 8px;
      border-top: #D4D4D4 1px solid;
      padding-top: 8px;
      cursor: pointer;
      img {
        width: 20px;
        height: 20px;
      }
      span {
        margin-left: 5px;
        font-size: 14px;
        font-weight: 700;
        color: rgba(0, 0, 0, 0.50);
      }
    }
  }
}
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
  &_loading {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    margin-top: 3px;
  }
  &_load {
    &_box {
      width: 100% !important;
    }
    &_title {
      width: 50px;
      background: rgb(216, 216, 216);
      border-radius: 10px;
      height: 13px;
    }
    &_first {
      margin-top: 10px;
      width: 80%;
      background: rgb(223, 223, 223);
      border-radius: 10px;
      height: 13px;
    }
    &_second {
      margin-top: 10px;
      width: 60%;
      background: rgb(223, 223, 223);
      border-radius: 10px;
      height: 13px;
      margin-bottom: 40px;
    }
    &_profile {
      border-radius: 50%;
    }
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