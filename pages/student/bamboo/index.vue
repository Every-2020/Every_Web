<template>
  <div class="post_area">
    <bamboo-load v-if="load" />
    <div v-for="(post, index) in posts" v-else :key="index" class="post">
      <div class="post_content">
        <bamboo-header :created="post.created_at" :time="postTimeCalc(post.created_at)" :idx="post.idx" @onPageView="onPageView" />
        <bamboo-main :item="post.content" :index="index" />
      </div>
      <bamboo-footer :idx="post.idx" @onPageView="onPageView" />
    </div>
    <div class="post_add" @click="open">
      <img src="~/assets/student/bamboo/add.png" alt="add">
    </div>
    <bamboo-add v-if="add" @onAdd="refresh" @onBack="close" />
  </div>
</template>

<script>
import axios from 'axios'
import BambooLoad from '~/components/Student/Bamboo/BambooLoad.vue'
import BambooFooter from '~/components/Student/Bamboo/BambooFooter.vue'
import BambooHeader from '~/components/Student/Bamboo/BambooHeader.vue'
import BambooAdd from '~/components/Student/Bamboo/BambooAdd.vue'
import BambooMain from '~/components/Student/Bamboo/BambooMain.vue'
export default {
  name: 'BambooPost',
  components: {
    BambooHeader,
    BambooFooter,
    BambooAdd,
    BambooLoad,
    BambooMain
  },
  data: () => {
    return {
      posts: {},
      show: false,
      index: 0,
      add: false,
      load: true
    }
  },
  async mounted () {
    await this.getPosts()
    this.load = false
    setTimeout(() => {
      window.scrollTo(0, this.$cookie.get('bamboo'))
    }, 100)
  },
  methods: {
    getPosts () {
      axios.get(`${this.$store.state.url}/bamboo/post`)
        .then((res) => {
          if (res.status === 200) {
            this.posts = res.data.data.posts
          }
        })
        .catch(() => {
          this.$swal('오류', '로그인 시간이 만료되었습니다.', 'error')
          this.$router.push({ name: 'login' })
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
    },
    onPageView (idx) {
      this.$cookie.set('bamboo', window.scrollY)
      this.$router.push({ name: 'student-bamboo-page', query: { idx: `${idx}` } })
    },
    open () {
      this.add = true
    },
    close () {
      this.add = false
    },
    async refresh () {
      this.add = false
      this.load = true
      this.posts = []
      await this.getPosts()
      this.load = false
    }
  },
  head () {
    return {
      title: 'Every - 대나무숲'
    }
  }
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
  margin-top: 10px;
  margin-bottom: 10px;
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
  }
}
</style>
