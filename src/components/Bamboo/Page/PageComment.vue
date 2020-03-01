<template>
  <div class="comment">
    <div class="comment_popup" v-if="editing">
      <div @click="onBack" class="comment_popup_area"></div>
      <div class="comment_popup_box">
        <div class="comment_popup_box_header">
          <img @click="onBack" src="../../../assets/back.png" alt="back" class="comment_popup_box_header_back">
          <img src="../../../assets/bamboo/profile.png" alt="profile" class="comment_popup_box_header_profile">
          <span>{{ edit_name }}</span>
        </div>
        <textarea maxlength="250" class="comment_edit" v-model="edit"></textarea>
        <button @click="onEdit">수정</button>
      </div>
    </div>
    <div class="comment_area" v-if="loading">
      <div class="comment_area_content">
        <img class="comment_profile load_profile" src="../../../assets/bamboo/profile.png" alt="profile">
        <div class="comment_area_box load_box">
          <div class="comment_area_box_content load_content">
            <div class="comment_load_title">
              <div class="comment_load_bar"></div>
            </div>
            <div class="comment_load_content">
              <div class="comment_load_bar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="comment_area" v-for="(comment, index) in comments" :key="index">
      <div class="comment_area_content">
        <img class="comment_profile" src="../../../assets/bamboo/profile.png" alt="profile">
        <div class="comment_area_box">
          <img class="comment_area_box_img" src="../../../assets/bamboo/comment.png" alt="comment">
          <div class="comment_area_box_content">
            <div>
              <span class="comment_area_box_content_title">
                {{ comment['user'] }}
              </span>
            </div>
            <span class="comment_area_box_content_text">{{ comment.content }}</span>
          </div>
        </div>
        <div @click="onClick(comment.idx, comment.content, comment['user'])" class="comment_area_more" v-if="comment.student_idx === my_idx">
          <img src="../../../assets/bamboo/more.png" alt="more">
        </div>
      </div>
      <div class="comment_area_exp">
        <span :title="comment.created_at.substring(0, 19)">{{ postTimeCalc(comment.created_at) }}</span>
      </div>
    </div>
    <div class="comment_none" v-if="!comments.length && this.loading === false">
      <span>댓글이 없습니다.</span>
    </div>
  </div>
</template>

<script>
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
      edit_name: ''
    }
  },
  props: ['idx', 'refresh'],
  computed: {
    my_idx: function () {
      return this.$store.getters.getIdx
    }
  },
  watch: {
    refresh: function () {
      this.loading = true
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
    }
  },
  mounted() {
    axios.get(`${this.url}/bamboo/reply?post=${this.idx}`)
    .then(response => {
      if (response.data.status === 200) {
        this.comments = response.data.data.replies
        for(let comment of response.data.data.replies) {
          this.getUser(comment, comment.student_idx)
        }
        setTimeout(() => {
          this.loading = false 
        }, 300);
      }
    })
  },
  methods: {
    onBack () {
      this.editing = false
    },
    onClick (idx, content, name) {
      this.edit_idx = idx
      this.editing = true
      this.edit = content
      this.edit_name = name
      setTimeout(() => {
        document.getElementsByClassName('comment_edit')[0].focus()
      }, 10);
    },
    onEdit () {
      if (this.edit) {
        axios.put(`${this.url}/bamboo/reply/${this.edit_idx}`, {
          content: this.edit
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
@keyframes fadeIn {
  0% {
    left: -100px;
  }
  100% {
    left: 300px;
  }
}
.load {
  &_profile {
  }
  &_content {
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
    &_bar {
      width: 10px;
      height: 100%;
      top: 0;
      left: -100px;
      position: absolute;
      transform: skew(-20deg);
      -o-transform: skew(-20deg);
      -ms-transform: skew(-20deg);
      -moz-transform: skew(-20deg);
      -webkit-transform: skew(-20deg);
      animation: fadeIn 2s .3s infinite cubic-bezier(.14, .75, .2, 1.01) forwards;
      background: radial-gradient(ellipse at center, rgba(255,255,255,0.69) 0%,rgba(255,255,255,0) 87%);
      background: -moz-radial-gradient(center, ellipse cover, rgba(255,255,255,0.69) 0%, rgba(255,255,255,0) 87%);
      background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,rgba(255,255,255,0.69)), color-stop(87%,rgba(255,255,255,0)));
      background: -webkit-radial-gradient(center, ellipse cover, rgba(255,255,255,0.69) 0%,rgba(255,255,255,0) 87%);
      background: -o-radial-gradient(center, ellipse cover, rgba(255,255,255,0.69) 0%,rgba(255,255,255,0) 87%);
      background: -ms-radial-gradient(center, ellipse cover, rgba(255,255,255,0.69) 0%,rgba(255,255,255,0) 87%);
    }
    &_title {
      width: 50px;
      background: rgb(216, 216, 216);
      border-radius: 10px;
      height: 19px;
      position: relative;
      overflow: hidden;
    }
    &_content {
      margin-top: 10px;
      width: 130px;
      background: rgb(223, 223, 223);
      border-radius: 10px;
      height: 19px;
      position: relative;
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }
  &_area {
    display: flex;
    display: -webkit-flex;
    margin-bottom: 10px;
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
      img {
        width: 15px;
        height: 15px;
        opacity: 0.4;
        filter: alpha(opacity=40);
        cursor: pointer;
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