<template>
  <div class="more_setting">
    <div class="more_setting_box">
      <div class="more_setting_profile">
        <img class="more_back" src="~/assets/back.png" alt="back" @click="back">
        <img class="more_setting_profile_img" src="~/assets/student/home/profile.png" alt="profile">
        <span class="more_setting_profile_title">{{ name }}</span>
        <span class="more_setting_profile_email">{{ email }}</span>
      </div>
      <div class="more_setting_content">
        <div class="more_setting_content_text">
          <img src="~/assets/student/more/phone.png" alt="phone">
          TEL. {{ phone }}
        </div>
        <div class="more_setting_content_text">
          <img src="~/assets/student/more/school.png" alt="scholl">
          {{ school }}
        </div>
        <div class="more_setting_content_text">
          <img src="~/assets/student/more/birth.png" alt="birth">
          {{ birth }}
        </div>
      </div>
      <div class="more_setting_btn" @click="logout">
        로그아웃
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: '불러오는 중',
      email: '불러오는 중',
      phone: '불러오는 중',
      school: '불러오는 중',
      birth: '불러오는 중'
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
          this.name = res.data.data.member.name
          this.email = res.data.data.member.email
          this.phone = res.data.data.member.phone
          this.birth = res.data.data.member.birth_year + '년생'
          axios.get(`${this.$store.state.url}/school/${res.data.data.member.school_id}`)
            .then((res) => {
              if (res.data.status === 200) {
                this.school = res.data.data.school.school_name
              }
            })
            .catch(() => {
              this.$swal('오류', '로그인 시간이 만료되었습니다.', 'error')
              this.$router.push({ name: 'login' })
            })
        }
      })
      .catch(() => {
        this.$swal('오류', '로그인 시간이 만료되었습니다.', 'error')
        this.$router.push({ name: 'login' })
      })
  },
  methods: {
    back () {
      this.$router.push({ name: 'student-more' })
    },
    logout () {
      this.$swal
        .fire({
          title: '경고',
          text: '로그아웃 하시겠습니까?',
          showCancelButton: true,
          confirmButtonText: '로그아웃',
          cancelButtonText: '취소',
          icon: 'warning'
        })
        .then((result) => {
          if (result.value) {
            this.$swal.fire(
              '완료!',
              '로그아웃 되었습니다.',
              'success'
            )
            this.$router.push({ name: 'login' })
            this.$cookie.delete('access')
            this.$cookie.delete('idx')
            this.$cookie.delete('bamboo')
          }
        })
    }
  }
}
</script>

<style lang="scss">
.more_back {
  position: absolute;
  left: 30px;
  top: 30px;
  width: 64px;
  cursor: pointer;
  @media screen and (max-width: 450px) {
    width: 50px;
  }
}
.more_setting {
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  &_box {
    width: 100%;
    height: 100%;
    max-width: 1000px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -ms-flex-direction: column;
    align-items: center;
  }
  &_profile {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -ms-flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    position: relative;
    padding: 30px;
    width: 100%;
    padding-bottom: 0;
    @media screen and (max-width: 450px) {
      height: 270px;
    }
    @media screen and (max-width: 350px) {
      height: 240px;
    }
    &_title {
      margin: 20px;
      font-weight: 700;
      font-size: 28px;
      @media screen and (max-width: 450px) {
        font-size: 23px;
        margin: 10px;
      }
    }
    &_email {
      font-size: 25px;
      color: #9F9F9F;
      @media screen and (max-width: 450px) {
        font-size: 20px;
      }
      @media screen and (max-width: 350px) {
        font-size: 18px;
      }
    }
    &_img {
      width: 130px;
      @media screen and (max-width: 768px) {
        width: 115px;
      }
      @media screen and (max-width: 450px) {
        width: 90px;
      }
    }
  }
  &_content {
    width: 100%;
    padding: 10px 30px;
    &_text {
      width: 100%;
      font-weight: 700;
      border-bottom: #DFDFDF 1px solid;
      font-size: 26px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      padding: 10px;
      @media screen and (max-width: 450px) {
        font-size: 19px;
      }
      @media screen and (max-width: 350px) {
        font-size: 17px;
      }
      img {
        width: 30px;
        margin-right: 15px;
        @media screen and (max-width: 450px) {
          width: 25px;
        }
      }
    }
  }
  &_btn {
    background-color: white;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
    border-radius: 23px;
    max-width: 300px;
    width: calc(100% - 60px);
    height: 50px;
    color: #2D008A;
    font-weight: 700;
    font-size: 19px;
    display: flex;
    display: -webkit-flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
    @media screen and (max-width: 350px) {
      margin-top: 20px;
      font-size: 17px;
    }
  }
}
</style>
