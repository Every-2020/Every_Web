<template>
  <div class="more">
    <img class="more_wave" src="~/assets/student/home/wave.png" alt="wave">
    <div class="more_content">
      <div class="more_content_profile">
        <img class="more_content_profile_img" src="~/assets/student/home/profile.png" alt="profile">
        <div class="more_content_profile_text">
          <span class="more_content_profile_text_name">{{ name }}</span>
          <span class="more_content_profile_text_title">{{ email }}</span>
        </div>
        <img class="setting_img" src="~/assets/student/more/setting.png" alt="setting" @click="goSetting">
      </div>
      <div class="more_content_div">
        <div class="more_content_update" @click="show">
          <span class="more_content_update_title">Every의 새로워진 기능들을<br><b>확인하세요!</b></span>
          <img class="more_content_update_logo" src="~/assets/logo.png" alt="logo">
        </div>
        <div class="more_content_not">
          <span>추후에 공개될<br>예정입니다.</span>
          <img src="~/assets/student/more/more_img.png" alt="working">
        </div>
      </div>
    </div>
    <more-image />
    <more-popup v-if="popup" @onClose="close" />
  </div>
</template>

<script>
import axios from 'axios'
import MorePopup from '~/components/Student/More/MorePopup.vue'
import MoreImage from '~/components/Student/More/MoreImage.vue'
export default {
  name: 'More',
  components: {
    MoreImage,
    MorePopup
  },
  data () {
    return {
      name: '불러오는 중',
      email: '불러오는 중',
      popup: false
    }
  },
  computed: {
    idx () {
      return parseInt(this.$cookie.get('idx'))
    }
  },
  mounted () {
    axios.get(`${this.$store.state.url}/member/student/${this.idx}`)
      .then((res) => {
        if (res.data.status === 200) {
          this.name = res.data.data.member.name + '님'
          this.email = res.data.data.member.email
        }
      })
      .catch(() => {
        this.$swal('오류', '로그인 시간이 만료되었습니다.', 'error')
        this.$router.push({ name: 'login' })
      })
  },
  methods: {
    goSetting () {
      this.$router.push({ name: 'student-more-setting' })
    },
    show () {
      this.popup = true
    },
    close () {
      this.popup = false
    }
  }
}
</script>

<style lang="scss">
.setting_img {
  width: 30px;
  align-self: end;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
  }
  @media screen and (max-width: 450px) {
    width: 25px;
  }
}
.more {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  overflow: scroll;
  position: relative;
  padding: 30px;
  flex-direction: column;
  -ms-flex-direction: column;
  align-items: center;
  @media screen and (max-width: 450px) {
    padding: 25px;
  }
  @media screen and (max-width: 350px) {
    padding: 20px;
  }
  &_wave {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  &_content {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    -ms-flex-direction: column;
    &_div {
      margin-top: 20px;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      width: 100%;
      @media screen and (max-width: 768px) {
        flex-direction: column;
        -ms-flex-direction: column;
      }
    }
    &_profile {
      width: 100%;
      display: flex;
      display: -webkit-flex;
      position: relative;
      height: 80px;
      max-width: 880px;
      @media screen and (max-width: 768px) {
        height: 50px;
      }
      &_img {
        width: 80px;
        height: 80px;
        @media screen and (max-width: 768px) {
          width: 50px;
          height: 50px;
        }
      }
      &_text {
        margin-left: 20px;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        -ms-flex-direction: column;
        width: 100%;
        justify-content: center;
        &_title {
          font-size: 20px;
          font-weight: 700;
          text-align: left;
          word-break: break-all;
          @media screen and (max-width: 450px) {
            font-size: 16px;
          }
          @media screen and (max-width: 350px) {
            font-size: 14px;
          }
        }
        &_name {
          text-align: left;
          font-size: 32px;
          word-break: break-all;
          font-weight: 800;
          @media screen and (max-width: 768px) {
            font-size: 28px;
          }
          @media screen and (max-width: 450px) {
            font-size: 20px;
          }
        }
      }
    }
    &_update {
      width: 100%;
      border-radius: 16px;
      height: 140px;
      box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
      background-color: #fff;
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      -ms-flex-direction: column;
      padding: 20px;
      text-align: left;
      cursor: pointer;
      justify-content: center;
      position: relative;
      max-width: 430px;
      @media screen and (max-width: 768px) {
        max-width: 100%;
        height: 90px;
      }
      @media screen and (max-width: 350px) {
        margin-top: 20px;
      }
      &_logo {
        position: absolute;
        width: 70px;
        height: 70px;
        right: 30px;
        @media screen and (max-width: 850px) {
          right: 5px;
        }
        @media screen and (max-width: 450px) {
          width: 50px;
          height: 50px;
          right: 10px;
        }
      }
      &_title {
        color: #2D008A;
        font-weight: 800;
        font-size: 23px;
        @media screen and (max-width: 768px) {
          font-size: 19px;
        }
        @media screen and (max-width: 350px) {
          font-size: 17px;
        }
        b {
          font-size: 25px;
          font-weight: 800;
          @media screen and (max-width: 768px) {
            font-size: 20px;
          }
        }
      }
    }
    &_not {
      position: relative;
      margin-left: 40px;
      width: 100%;
      border-radius: 16px;
      height: 140px;
      box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
      background-color: #2D008A;
      padding: 20px;
      text-align: left;
      font-size: 18px;
      font-weight: 800;
      line-height: 25px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      color: white;
      max-width: 410px;
      @media screen and (max-width: 768px) {
        max-width: 100%;
        height: 120px;
        font-size: 16px;
        margin-top: 10px;
        margin-left: 0;
      }
      @media screen and (max-width: 450px) {
        margin-top: 20px;
        font-size: 15px;
      }
      span {
        display: block;
        width: 50%;
        font-weight: 800;
        font-size: 21px;
        @media screen and (max-width: 768px) {
          font-size: 19px;
        }
        @media screen and (max-width: 450px) {
          font-size: 17px;
        }
      }
      img {
        position: absolute;
        height: 70%;
        right: 40px;
        @media screen and (max-width: 450px) {
          right: 50px;
        }
      }
      &_next {
        position: absolute;
        width: 30px;
        right: 20px;
        @media screen and (max-width: 768px) {
          width: 20px;
        }
      }
    }
  }
}
</style>
