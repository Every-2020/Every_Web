import Vue from 'vue'
import VueRouter from 'vue-router'
const VueCookie = require('vue-cookie')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Every - 로그인'
    },
    component: () => import(/* */'@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: 'Every - 가입'
    },
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
        meta: {
          title: 'Every'
        },
        component: () => import(/* */'@/views/Student/Home/Home.vue'),
      },
      {
        name: '',
        path: 'bamboo',
        component: () => import(/* */'@/views/Student/Bamboo/Bamboo.vue'),
        children: [
          {
            name: 'bamboo',
            path: '',
            meta: {
              title: 'Every - 대나무 숲'
            },
            component: () => import(/* */'@/views/Student/Bamboo/BambooPost.vue')
          },
          {
            name: 'bambooPage',
            path: 'page/',
            meta: {
              title: 'Every - 게시물'
            },
            props: (route) => ({ idx: route.query.idx }),
            component: () => import(/* */'@/views/Student/Bamboo/BambooPage.vue')
          }
        ]
      },
      {
        name: 'schedule',
        path: 'schedule',
        meta: {
          title: 'Every - 일정'
        },
        component: () => import(/* */'@/views/Student/Schedule/Schedule.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  base: '/every/',
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
    /* It will change the title when the router is change*/
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router
