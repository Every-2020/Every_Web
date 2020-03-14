<template>
  <div class="schedule_view">
    <div @click="back" class="schedule_view_area"></div>
    <div class="schedule_view_box">
      <div class="schedule_view_header">
        <img @click="back" class="schedule_view_header_back" src="../../../assets/student/schedule/back.png" alt="back">
        <img @click="onDelete" class="schedule_view_header_delete" src="../../../assets/student/schedule/delete.png" alt="delete">
        <img class="schedule_view_header_img_1" src="../../../assets/student/schedule/wave1.png" alt="wave1">
        <img class="schedule_view_header_img_2" src="../../../assets/student/schedule/wave2.png" alt="wave2">
        <span class="schedule_view_header_title">{{ event.title }}</span>
        <span class="schedule_view_header_date">{{ date }}</span>
      </div>
      <div class="schedule_view_content">
        <span class="schedule_view_content_title">일정 내용</span>
        <span class="schedule_view_content_text">{{ event.content }}</span>
      </div>
      <div @click="edit" class="schedule_view_btn">일정 수정하기</div>
    </div>
    <schedule-edit
      v-if="show"
      @onEdit="refresh"
      @close="close"
      :event="event"
    />
  </div>
</template>

<script>
import axios from 'axios'
import server from '@/models/server'
import ScheduleEdit from '@/components/Student/Schedule/ScheduleEdit.vue'
export default {
  name: 'scheduleView',
  props: ['event', 'date'],
  data() {
    return {
      url: server,
      show: false
    }
  },
  components: { ScheduleEdit },
  mounted() {
    document.getElementsByTagName('body')[0].classList.add('not_scroll')
  },
  destroyed() {
    document.getElementsByTagName('body')[0].classList.remove('not_scroll')
  },
  methods: {
    close () {
      this.show = false
    },
    back () {
      this.$emit('onBack')
    },
    edit () {
      this.show = true
    },
    refresh () {
      this.$emit('onRefresh')
    },
    onDelete () {
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
            axios.delete(`${this.url}/schedule/${this.event.idx}`)
            .then(response => {
              if (response.data.status === 200) {
                this.$swal.fire(
                  '완료!',
                  '일정을 성공적으로 삭제하였습니다.',
                  'success'
                )
                this.$emit('onRefresh')
                this.$emit('onBack')
              }
            })
            .catch(() => {
              this.$swal.fire(
                  '오류',
                  '일정을 삭제하지 못했습니다.',
                  'error'
                )
            })
          }
        })
    }
  },
}
</script>

<style lang="scss">
.not_scroll{
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%
}
.schedule_view {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  z-index: 101;
  padding: 15px;
  &_area {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 102;
  }
  &_box {
    width: 100%;
    height: 570px;
    max-width: 400px;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.123);
    z-index: 103;
    background: white;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -ms-flex-direction: column;
    align-items: center;
    position: relative;
    @media screen and (max-width: 350px) {
      height: 500px;
    }
  }
  &_header {
    width: 100%;
    height: 230px;
    background-color: #2D008A;
    position: relative;
    padding: 10px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    -ms-flex-direction: column;
    @media screen and (max-width: 450px) {
      height: 200px;
    }
    &_back {
      width: 30px;
      cursor: pointer;
      position: absolute;
      top: 15px;
      left: 15px;
    }
    &_delete {
      width: 20px;
      z-index: 2;
      cursor: pointer;
      position: absolute;
      top: 15px;
      right: 15px;
    }
    &_title {
      color: white;
      font-size: 20px;
      font-weight: 800;
      word-break: break-all;
      z-index: 10;
    }
    &_date {
      color: white;
      font-size: 14px;
      margin-top: 5px;
      word-break: break-all;
      z-index: 10;
    }
    &_img {
      &_1 {
        position: absolute;
        width: 40%;
        bottom: 0;
        left: 0;
      }
      &_2 {
        position: absolute;
        width: 40%;
        top: 0;
        right: 0;
      }
    }
  }
  &_content {
    height: calc(100% - 280px);
    width: 100%;
    color: #2D008A;
    padding: 23px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    text-align: left;
    &::-webkit-scrollbar {
      display: none;
    }
    @media screen and (max-width: 450px) {
      height: calc(100% - 250px);
    }
    &_title {
      font-weight: 800;
      font-size: 18px;
    }
    &_text {
      margin-top: 5px;
      display: block;
      font-size: 17px;
      word-break: break-all;
    }
  }
  &_btn {
    background-color: #2D008A;
    border-radius: 14px;
    height: 30px;
    width: 150px;
    color: white;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    font-weight: 800;
    font-size: 15px;
    cursor: pointer;
  }
}
</style>