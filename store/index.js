import Vuex from 'vuex'
import VueCookie from 'vue-cookie'
import server from '~/models/server'

const store = () => new Vuex.Store({
  state: {
    url: server,
    idx: VueCookie.get('idx'),
    identity: VueCookie.get('identity'),
    access: VueCookie.get('access')
  },
  mutations: {
    setInfo (state, { newIdx, newIdentity, newAccess }) {
      state.idx = newIdx
      state.identity = newIdentity
      state.access = newAccess
    }
  }
})

export default store
