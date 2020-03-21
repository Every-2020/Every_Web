<template>
  <div class="comment_area_content">
    <img class="comment_profile" src="~/assets/student/bamboo/profile.png" alt="profile">
    <div class="comment_area_box">
      <img class="comment_area_box_img" src="~/assets/student/bamboo/comment.png" alt="comment">
      <div class="comment_area_box_content">
        <div>
          <span class="comment_area_box_content_title">
            {{ comment.user }}
          </span>
        </div>
        <span class="comment_area_box_content_text">{{ comment.content }}</span>
      </div>
      <comment-more v-if="comment.edit" :comment="comment" @openEdit="openEdit" @onClose="onClose" @onRefresh="onRefresh" />
    </div>
    <div v-if="comment.student_idx === my_idx" class="comment_area_more">
      <img class="comment_area_more_img" src="~/assets/student/bamboo/more.png" alt="more" @click="onClick(comment)">
    </div>
  </div>
</template>

<script>
import CommentMore from '~/components/Student/Bamboo/Page/Comment/CommentMore'
export default {
  name: 'CommentBox',
  components: {
    CommentMore
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    my_idx () {
      return parseInt(this.$cookie.get('idx'))
    }
  },
  methods: {
    onRefresh () {
      this.$emit('onRefresh')
    },
    onClose (comment) {
      comment.edit = false
    },
    onClick (comment) {
      comment.edit = true
      this.$emit('onClick', comment)
    },
    openEdit (comment) {
      comment.edit = false
      this.$emit('openEdit', comment)
    }
  }
}
</script>

<style lang="scss">

</style>
