<template>
  <div class="register_worker">
    <div class="register_form_container">
      <input class="register_form_input" type="text" placeholder="근무 직장 또는 대학교" v-model="place" />
      <span v-if="placeCheck === 1">이 입력란을 작성해주세요.</span>
    </div>
    <div class="register_form_container category">
      <select class="register_form_input" id="category" title="category" v-model="category_select">
        <option selected value="">근무 분야를 선택해주세요.</option>
        <option v-for="(item, index) in category" :key="index" :value="index + 1">{{ item }}</option>
      </select>
      <span v-if="categoryCheck === 1">근무 분야를 선택해주세요.</span>
    </div>
  </div>
</template>

<script>
import category from '@/models/category'
export default {
  data() {
    return {
      place: '',
      category: category,
      category_select: ''
    }
  },
  props: {
    categoryCheck: Number,
    placeCheck: Number
  },
  watch: {
    category_select : function () {
      this.$emit('onCategory', this.category_select)
      setTimeout(() => {
        if (this.category_select === '') {
          document.getElementById('category').classList.remove('category_color')
        } else {
          document.getElementById('category').classList.add('category_color')
        }
      }, 10);
    },
    place: function () {
      this.$emit('onKeydown', this.place)
    }
  }
}
</script>

<style lang="scss">
.register_worker {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  flex-direction: column;
  -ms-flex-direction: column;
  width: 100%;
  height: 100%;
  #category {
    position: relative;
    z-index: 10;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 11px 0 0 11px;
    color: #CFCFCF;
    padding: 0 !important;
    padding-left: 45px !important;
    font-weight: 800;
    width: 100%;
    height: 34px;
    font-size: 15px;
    background: url('../../assets/register/arrow.png') no-repeat;
    background-size: 34px;
    @media screen and (max-width: 767px) {
      height: 32px;
      background-size: 32px;
      font-size: 14px;
    }
    @media screen and (max-width: 450px) {
      height: 29px;
      font-size: 12px;
      background-size: 29px;
    }
  }
  .category {
    position: relative;
    z-index: 10;
    border-radius: 11px 0 0 11px;
    background-color: #E8E8E8;
  }
  .category_color {
    color: rgb(139, 139, 139) !important;
    font-weight: 400 !important;
  }
}
</style>