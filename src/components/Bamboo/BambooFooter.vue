<template>
  <div @click="onClick" class="post_footer">
    <div class="post_footer_comment">
      <span class="not_select">댓글 {{ count }}개</span>
    </div>
    <div class="post_footer_content">
      <div class="post_footer_content_line"></div>
      <div class="post_footer_content_text">
        <input type="text" readonly placeholder="댓글 달기...">
        <img src="../../assets/bamboo/submit.png" alt="submit">
      </div>
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
      count: ''
    }
  },
  props: {
    idx: Number
  },
  mounted() {
    axios.get(`${this.url}/bamboo/reply?post=${this.idx}`)
    .then(response => {
      if (response.data.status === 200) {
        this.count = response.data.data.replies.length
      }
    })
    .catch( () => {
      this.count = 0
    })
  },
  methods: {
    onClick () {
      this.$emit('onPageView', this.idx)      
    }
  },
}
</script>

<style lang="scss">
.post_footer {
  margin-top: 5px;
  width: 100%;
  height: 80px;
  display: flex;
  display: -webkit-flex;
  margin-top: 10px;
  flex-direction: column;
  -ms-flex-direction: column;
  &_comment {
    font-size: 13px;
    color: #878787;
    font-weight: 700;
    text-align: left;
    margin-bottom: 8px;
    span {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &_content {
    flex-grow: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    -ms-flex-direction: column;
    position: relative;
    cursor: pointer;
    &_line {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #E2E2E2; 
    }
    &_text {
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      img {
        width: 25px;
        margin-left: 20px;
      }
      input {
        width: calc(100% - 60px);
        height: 35px;
        border-radius: 21px;
        border: none;
        background-color: #F1F1F1;
        padding-left: 20px;
        &::placeholder {
          font-size: 15px;
          font-weight: 700;
          color: #C2C2C2;
        }
        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>