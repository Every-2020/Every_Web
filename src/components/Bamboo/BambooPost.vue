<template>
  <div class="post_area">
    <div class="post" v-for="(post, index) in posts" :key="index">
      <div class="post_content">
        <bamboo-header :created="post.created_at" :time="postTimeCalc(post.created_at)" :idx="post.idx"></bamboo-header>
        <div :class="{'post_content_main' : true, 'post_content_main_hidden' : postHide(post.content)}">
          <span class="post_content_main_text">{{ postLength(post.content) }}</span>
          <span class="post_content_main_hide">...</span>
          <span @click="postSeeMore(index)" class="post_content_main_more">더 보기</span>
          <span class="post_content_main_text_hide">{{ postSplit(post.content) }}</span>
        </div>
      </div>
      <bamboo-footer @onPageView="onPageView" :idx="post.idx"></bamboo-footer>
    </div>
    <div @click="open" class="post_add">
      <img src="../../assets/bamboo/add.png" alt="add">
    </div>
    <bamboo-add @onAdd="refresh" @onBack="close" v-if="add"></bamboo-add>
  </div>
</template>

<script>
import server from '@/models/server'
import axios from 'axios'
import BambooFooter from '@/components/Bamboo/BambooFooter.vue'
import BambooHeader from '@/components/Bamboo/BambooHeader.vue'
import BambooAdd from '@/components/Bamboo/BambooAdd.vue'
export default {
  data: () => {
    return {
      url: server,
      posts: {},
      show: false,
      index: 0,
      add: false
    }
  },
  mounted () {
    axios.get(`${this.url}/bamboo/post`)
    .then( response => {
      if (response.status === 200) {
        this.posts = response.data.data.posts
      }
    })
    .catch( error => {
      console.log(error)
    })
    setTimeout(() => {
      window.scrollTo(0, this.$cookie.get('bamboo'))    
    }, 100);
  },
  components: {
    BambooHeader,
    BambooFooter,
    BambooAdd
  },
  methods: {
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
      document.getElementsByClassName('post_content_main')[idx].classList.remove('post_content_main_hidden')
    },
    postSplit (content) {
      return content.substring(250)
    },
    onPageView (idx) {
      this.$cookie.set('bamboo', window.scrollY)
      this.$router.push({ name: 'bambooPage', query: {idx}})
    },
    open () {
      this.add = true
    },
    close () {
      this.add = false
    },
    refresh () {
      this.add = false
      setTimeout(() => {
        axios.get(`${this.url}/bamboo/post`)
        .then( response => {
          if (response.status === 200) {
            this.posts = response.data.data.posts
            this.$cookie.delete('bamboo')
            window.scrollTo(0, 0)
          }
        })
        .catch( error => {
          console.log(error)
        })
      }, 100);
    }
  },
}
</script>

<style lang="scss">
.hidden {
  display: none !important;
}
.post_add {
  position: fixed;
  bottom: 70px;
  right: 70px;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.24);
  background-color: #7E40FF;
  img {
    width: 25px;
    height: 25px;
    @media screen and (max-width: 450px) {
      width: 20px;
      height: 20px;
    }
  }
  @media screen and (max-width: 767px) {
    bottom: 40px;
    right: 40px;
  }
  @media screen and (max-width: 450px) {
    width: 40px;
    height: 40px;
  }
}
.post {
  &_area {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    max-width: 600px;
    -ms-flex-direction: column;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  background-color: rgb(252, 252, 252);
  width: 100%;
  margin-top: 20px;
  position: relative;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -ms-flex-direction: column;
  padding: 20px;
  padding-bottom: 0;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
  &_content {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -ms-flex-direction: column;
    flex-grow: 1;
    width: 100%;
    &_main {
      text-align: left;
      margin: 10px 0;
      span {
        word-wrap: break-word;
        // word-break: keep-all;
        -ms-word-wrap: break-word;
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
}
</style>