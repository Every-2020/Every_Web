import Vue from 'vue'
import VueRouter from 'vue-router'
const VueCookie = require('vue-cookie')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* */'@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* */'@/views/Register.vue')
  },
  {
    path: '/',
    name: '',
    component: () => import(/* */'@/views/Student/Student.vue'),
    beforeEnter: (to, from, next) => {
      if(VueCookie.get('access')) {
        return next();
      } else {
        return next('/login');
      }
    },
    children: [
      {
        name: 'student',
        path: '',
        component: () => import(/* */'@/views/Student/Home.vue'),
      },
      {
        name: '',
        path: 'bamboo',
        component: () => import(/* */'@/views/Student/Bamboo.vue'),
        children: [
          {
            name: 'bamboo',
            path: '',
            component: () => import(/* */'@/components/Bamboo/BambooPost.vue')
          },
          {
            name: 'bambooPage',
            path: 'page/',
            props: (route) => ({ idx: route.query.idx }),
            component: () => import(/* */'@/components/Bamboo/Page/BambooPage.vue')
          }
        ]
      },
    ]
  },
]

const router = new VueRouter({
  base: '/every/',
  mode: 'history',
  routes,
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }
})

export default router
