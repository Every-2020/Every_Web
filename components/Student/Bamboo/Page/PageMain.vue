<template>
  <div :class="{'page_main' : true, 'page_main_hidden' : postHide(item)}">
    <span class="page_main_text">{{ postLength(item) }}</span>
    <span class="page_main_hide">...</span>
    <span class="page_main_more" @click="postSeeMore(0)">더보기</span>
    <span class="page_main_text_hide">{{ postSplit(item) }}</span>
  </div>
</template>

<script>
export default {
  name: 'PageMain',
  props: {
    item: {
      type: String,
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
        return content.substring(0, 250)
      }
      return content
    },
    postSeeMore (idx) {
      document.getElementsByClassName('page_main')[idx].classList.remove('page_main_hidden')
    },
    postSplit (content) {
      return content.substring(250)
    }
  }
}
</script>

<style lang="scss">
.page_main {
  padding-top: 20px;
  font-size: 18px;
  text-align: left;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: keep-all;
  -ms-word-wrap: break-word;
  &::-webkit-scrollbar {
    display: none;
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
