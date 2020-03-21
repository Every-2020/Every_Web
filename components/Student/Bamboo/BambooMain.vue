<template>
  <div :class="{'post_main' : true, 'post_main_hidden' : postHide(item)}">
    <span class="post_main_text">{{ postLength(item) }}</span>
    <span class="post_main_hide">...</span>
    <span class="post_main_more" @click="postSeeMore(index)">더보기</span>
    <span class="post_main_text_hide">{{ postSplit(item) }}</span>
  </div>
</template>

<script>
export default {
  name: 'PostMain',
  props: {
    item: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    postHide (content) {
      if (content.length > 250) {
        return true
      } else {
        return false
      }
    },
    postLength (content) {
      if (content.length > 250) {
        if (content.substring(250, 251) === ' ') {
          return content.substring(0, 251)
        }
        return content.substring(0, 250)
      }
      return content
    },
    postSeeMore (idx) {
      document.getElementsByClassName('post_main')[idx].classList.remove('post_main_hidden')
    },
    postSplit (content) {
      if (content.substring(250, 251) === ' ') {
        return content.substring(251)
      }
      return content.substring(250)
    }
  }
}
</script>

<style lang="scss">
.post_main {
  text-align: left;
  margin: 10px 0;
  span {
    white-space: pre-line;
    word-wrap: break-word;
    word-break: keep-all;
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
</style>
