<template>
  <div class="post_header" @click="onClick">
    <div class="post_header_img">
      <img src="~/assets/student/bamboo/profile.png" alt="profile">
    </div>
    <div class="post_header_content">
      <div class="post_header_content_title">
        <span>#{{ idx }}번째 이야기</span>
      </div>
      <div class="post_header_content_date">
        <span :title="created.substring(0, 19)">{{ date }}</span>
      </div>
      <div class="post_header_content_time">
        <span>{{ time }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    idx: {
      type: Number,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    created: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      date: ''
    }
  },
  mounted () {
    const day = new Date(this.created)
    const today = day.getFullYear().toString() + '년 ' + (day.getMonth() + 1).toString() + '월 ' + day.getDate().toString() + '일'
    this.date = today
  },
  methods: {
    onClick () {
      this.$emit('onPageView', this.idx)
    }
  }
}
</script>

<style lang="scss">
.post_header {
  width: 100%;
  height: 60px;
  display: flex;
  display: -webkit-flex;
  &_img {
    img {
      width: 60px;
      @media screen and (max-width: 450px) {
        width: 50px;
      }
    }
  }
  &_content {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -ms-flex-direction: column;
    margin-left: 14px;
    justify-content: center;
    text-align: left;
    &_title {
      font-weight: 800;
      font-size: 18px;
    }
    &_date {
      font-size: 15px;
      color: black;
      span {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    &_time {
      color: black;
      font-size: 14px;
      font-weight: 700;
    }
  }
}
</style>
