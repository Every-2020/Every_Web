<template>
  <div class="register_student">
    <div class="register_form_container" @click="onClick">
      <div class="register_student_search">
        <img src="../../assets/register/search.png" alt="search">
      </div>
      <input
        v-model="school"
        class="register_form_input register_student_school"
        type="text"
        placeholder="학교를 검색해보세요."
        readonly
      >
      <span v-if="schoolCheck === 1">재학중이신 학교를 선택해주세요!</span>
    </div>
    <div v-if="show" class="register_popup">
      <div class="register_popup_area" @click="close" />
      <div class="register_popup_box">
        <div class="register_popup_box_header">
          <form class="register_popup_box_header_content" @submit.prevent="onSubmit">
            <input
              v-model="school_input"
              type="text"
              class="register_popup_box_input"
              placeholder="학교를 검색해보세요!"
              required
            >
            <button type="submit" class="register_popup_search">
              <img src="../../assets/register/search.png" alt="search">
            </button>
          </form>
        </div>
        <div class="register_popup_box_item">
          <div v-if="idx === 1 || idx === 2" class="register_popup_box_item_1">
            <img src="../../assets/register/question.png" alt="question">
            <span v-if="idx === 1">자신이 재학중인 학교를 검색해보세요!</span>
            <span v-if="idx === 2">입력하신 학교는 존재하지 않습니다.</span>
          </div>
          <div v-if="idx === 3" class="register_popup_box_item_2">
            <div v-if="load" class="school first">
              <div class="school_load_title loading" />
              <div class="school_load_content loading" />
            </div>
            <div v-if="load" class="school second">
              <div class="school_load_title loading" />
              <div class="school_load_content loading" />
            </div>
            <div
              v-for="(item, index) in schools"
              v-else
              :id="item.school_id"
              :key="index"
              :class="{ 'second' : index % 2 === 1, 'first' : index % 2 === 0 }"
              class="school"
              @click="onSelect(index)"
            >
              <div class="school_name">
                <span class="school_name_title">학교명</span>
                <span class="school_name_name">{{ item.school_name }}</span>
              </div>
              <div class="school_address">
                <span class="school_address_title">주소</span>
                <span class="school_address_name">{{ item.school_location }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import server from '@/models/server'
export default {
  props: {
    schoolCheck: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      show: false,
      idx: 1,
      url: server,
      schools: {},
      school: '',
      school_input: '',
      school_id: '',
      load: true
    }
  },
  methods: {
    onClick () {
      this.show = true
      setTimeout(() => {
        document.getElementsByClassName('register_popup_box_input')[0].focus()
      }, 100)
    },
    close () {
      this.school_input = ''
      this.show = false
      this.idx = 1
    },
    onSubmit () {
      this.load = true
      axios.get(`${this.url}/school?query=${this.school_input}`)
        .then((response) => {
          this.schools = response.data.data.schools
          this.idx = 3
          if (response.data.data.schools.length === 0) {
            this.idx = 2
          } else {
            this.load = false
          }
        })
        .catch(() => {
          this.idx = 2
        })
    },
    onSelect (index) {
      this.school_id = document.getElementsByClassName('school')[index].id
      this.close()
      this.$emit('onSelect', this.school_id)
      this.school = this.schools[index].school_name
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/animation.scss";

.register_student {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  flex-direction: column;
  -ms-flex-direction: column;
  width: 100%;
  height: 100%;
  &_school {
    border-radius: 11px 0 0 11px;
    padding-left: 40px !important;
  }
  &_search {
    left: 0;
    top: 0px;
    border-radius: 10px;
    background-color: #7E40FF;
    position: absolute;
    width: 34px;
    height: 34px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    img {
      width: 25px;
      @media screen and (max-width: 767px) {
        width: 23px;
      }
      @media screen and (max-width: 450px) {
        width: 20px;
      }
    }
    @media screen and (max-width: 767px) {
      width: 32px;
      height: 32px;
    }
    @media screen and (max-width: 450px) {
      width: 29px;
      height: 29px;
    }
  }
}
.register_popup {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  z-index: 1000;
  top: 0;
  left: 0;
  align-items: center;
  padding: 50px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &_area {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(128, 128, 128, 0.562);
    z-index: 999;
  }
  &_box {
    z-index: inherit;
    position: relative;
    display: flex;
    display: -webkit-flex;
    max-width: 666px;
    background-color: white;
    height: 420px;
    padding-top: 40px;
    padding-bottom: 40px;
    flex-grow: 1;
    flex-basis: 0;
    justify-content: center;
    flex-direction: column;
    -ms-flex-direction: column;
    @media screen and (max-width: 350px) {
      max-width: 310px;
    }
    &_header {
      flex-grow: 1;
      flex-basis: 0;
      display: flex;
      padding-left: 40px;
      padding-right: 40px;
      display: -webkit-flex;
      max-height: 34px;
      justify-content: center;
      &_content {
        position: relative;
        max-width: 345px;
        flex-grow: 1;
        display: flex;
        display: -webkit-flex;
      }
    }
    &_input {
      flex-grow: 1;
      border-radius: 11px 0 0 11px;
      border: none;
      background-color: #E8E8E8;
      padding: 10px;
      padding-left: 43px;
      font-size: 15px;
      height: 34px;
      &::placeholder {
        color: #CFCFCF;
      }
      &:focus {
        outline: none;
      }
    }
    &_item {
      display: flex;
      display: -webkit-flex;
      flex-grow: 1;
      margin-top: 20px;
      &_1 {
        justify-content: center;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        flex-grow: 1;
        flex-direction: column;
        -ms-flex-direction: column;
        padding: 40px;
        img {
          width: 109px;
        }
        span {
          display: inline-block;
          margin-top: 20px;
          font-weight: 800;
          color: #CCCCCC;
          font-size: 20px;
        }
      }
      &_2 {
        overflow: auto;
        flex-grow: 1;
        max-height: 276px;
        overflow-y: scroll;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 5px;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
  &_search {
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 11px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    background-color: #7E40FF;
    cursor: pointer;
    border: none;
    &:focus {
      outline: none;
    }
    img {
      width: 25px;
    }
  }
}
.second {
  float: right;
  @media screen and (max-width: 767px) {
    float: none;
  }
}
.first {
  float: left;
  @media screen and (max-width: 767px) {
    float: none;
  }
}
.loading {
  animation: loading 2s infinite ease-in-out;
  -webkit-animation: loading 2s infinite ease-in-out;
  -o-animation: loading 2s infinite ease-in-out;
  -moz-animation: loading 2s infinite ease-in-out;
}
.school {
  width: 48%;
  display: inline-flex;
  display: -webkit-inline-flex;
  height: 87px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 20px;
  margin-bottom: 10px;
  margin-top: 10px;
  cursor: pointer;
  padding: 10px;
  justify-content: center;
  padding-left: 20px;
  flex-direction: column;
  -ms-flex-direction: column;
  text-align: left;
  @media screen and (max-width: 767px) {
    width: 100%;
    max-width: 400px;
  }
  &_load {
    &_title {
      border-radius: 10px;
      height: 10px;
      width: 70%;
    }
    &_content {
      margin-top: 20px;
      border-radius: 10px;
      height: 10px;
      width: 40%;
    }
  }
}
.school_name {
  padding-left: 45px;
  position: relative;
  &_title {
    width: 41px;
    position: absolute;
    height: 19px;
    left: 0;
    top: 2px;
    background-color: #9E9E9E;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 700;
    color: white;
    text-align: center;
    padding: 3px;
  }
  &_name {
    color: white;
    font-size: 20px;
    font-weight: 800;
    color: #4E4E4E;
    @media screen and (max-width: 450px) {
      font-size: 18px;
    }
  }
}
.school_address {
  margin-top: 10px;
  padding-left: 45px;
  position: relative;
  &_title {
    left: 0;
    position: absolute;
    width: 38px;
    height: 19px;
    background-color: #C8C8C8;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 700;
    color: white;
    padding: 3px;
    text-align: center;
  }
  &_name {
    color: white;
    font-size: 14px;
    font-weight: 700;
    color: #7B7B7B;
  }
}
</style>
