import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'main',
    component: Main,
    children: [
      {
        name: 'bamboo',
        path: 'bamboo',
        component: () => import(/* */'@/views/Bamboo.vue'),
        children: [
          {
            name: 'bambooPost',
            path: 'posts',
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
  {
    path: '/login',
    name: 'login',
    component: () => import(/* */'@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* */'@/views/Register.vue')
  }
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
