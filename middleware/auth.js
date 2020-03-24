import axios from 'axios'
import VueCookie from 'vue-cookie'

export default function ({ store, route, next }) {
  VueCookie.delete('bamboo')
  if (store.state.access) {
    axios.defaults.headers.common.token = store.state.access
  }
  if (route.matched[0].path === '/student' || route.matched[0].path === '/worker' || route.name === 'index') {
    if (!VueCookie.get('access')) {
      return next({ name: 'login' })
    }
  }
}
