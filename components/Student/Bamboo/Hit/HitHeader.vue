<template>
  <div class="hit_header">
    <img class="back" src="~/assets/back.png" alt="back" @click="close">
    <div class="hit_header_profile">
      <img src="~/assets/student/bamboo/profile.png" alt="profile" class="profile">
      <div class="hit_header_items">
        <div class="hit_header_title">
          <span v-if="item.idx">#{{ item.idx }}번째 이야기</span>
          <span v-else>불러오는 중</span>
        </div>
        <div class="hit_header_date">
          <span v-if="item.created_at" :title="item.created_at.substring(0, 19)">★ 오늘의 인기 게시글</span>
          <span v-else>★ 오늘의 인기 게시글</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HitHeader',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
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
    close () {
      this.$emit('onClose')
    },
    getDate (date) {
      const day = new Date(
        parseInt(date.substring(0, 4)),
        parseInt(date.substring(5, 7)) - 1,
        parseInt(date.substring(8, 10)),
        parseInt(date.substring(11, 13)),
        parseInt(date.substring(14, 16)),
        parseInt(date.substring(18, 20))
      )
      const today = day.getFullYear().toString() + '년 ' + (day.getMonth() + 1).toString() + '월 ' + day.getDate().toString() + '일'

      return today
    }
  }
}
</script>

<style lang="scss">
.hit_header {
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
</style>
