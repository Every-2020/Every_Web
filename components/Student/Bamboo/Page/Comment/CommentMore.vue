<template>
  <div class="comment_more">
    <div class="comment_more_area" @click="onClose" />
    <div class="comment_more_box">
      <div class="comment_more_box_edit" @click="openEdit">
        <img src="~/assets/student/bamboo/edit.png" alt="edit">
        <span>댓글 수정하기</span>
      </div>
      <div class="comment_more_box_delete" @click="onDelete">
        <img src="~/assets/student/bamboo/delete.png" alt="delete">
        <span>댓글 삭제하기</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CommentMore',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClose () {
      this.$emit('onClose', this.comment)
    },
    openEdit () {
      this.$emit('openEdit', this.comment)
    },
    onDelete () {
      this.$swal
        .fire({
          title: '경고',
          text: '정말로 삭제하시겠습니까?',
          showCancelButton: true,
          confirmButtonText: '삭제하기',
          cancelButtonText: '취소',
          icon: 'warning'
        })
        .then((result) => {
          if (result.value) {
            axios.delete(`${this.$store.state.url}/bamboo/reply/${this.comment.idx}`)
              .then((res) => {
                if (res.data.status === 200) {
                  this.$swal.fire(
                    '완료!',
                    '댓글을 성공적으로 삭제하였습니다.',
                    'success'
                  )
                  this.$emit('onRefresh')
                }
              })
              .catch(() => {
                this.$swal.fire(
                  '오류',
                  '댓글을 삭제하지 못했습니다.',
                  'error'
                )
              })
          }
        })
    }
  }
}
</script>

<style lang="scss">
.comment_more {
  &_area {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
  }
  &_box {
    position: absolute;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -ms-flex-direction: column;
    padding: 8px;
    z-index: 200;
    border-radius: 5px;
    width: 140px;
    background-color: #F8F8F8;
    right: -40px;
    top: 15px;
    &_edit {
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        width: 22px;
        height: 22px;
      }
      span {
        margin-left: 5px;
        font-size: 14px;
        font-weight: 700;
        color: rgba(0, 0, 0, 0.50);
      }
    }
    &_delete {
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
      margin-top: 8px;
      border-top: #D4D4D4 1px solid;
      padding-top: 8px;
      cursor: pointer;
      img {
        width: 20px;
        height: 20px;
      }
      span {
        margin-left: 5px;
        font-size: 14px;
        font-weight: 700;
        color: rgba(0, 0, 0, 0.50);
      }
    }
  }
}
</style>
