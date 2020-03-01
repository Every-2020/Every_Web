import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: true,
    identity: 'student',
    idx: ''
  },
  getters: {
    getIdentity: state => {
      return state.identity
    },
    getIdx: state => {
      return state.idx
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
