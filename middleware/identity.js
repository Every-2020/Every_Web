import VueCookie from 'vue-cookie'

export default function ({ route, next }) {
  if ((route.name === 'index' || route.matched[0].path === '/worker') && VueCookie.get('identity') === 'student') {
    console.log('a')
    return next('student')
  }
}
