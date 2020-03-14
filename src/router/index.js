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
    beforeEnter: (to, from, next) => {
      if(VueCookie.get('access')) {
        if(VueCookie.get('identity') === 'student') {
          return next({name: 'student'});
        }
        return next({name: 'worker'});
      } else {
        return next('/login');
      }
    },
  },
  {
    path: '/',
    name: '',
    component: () => import(/* */'@/views/Worker/Worker.vue'),
    beforeEnter: (to, from, next) => {
      if(VueCookie.get('access')) {
        if(VueCookie.get('identity') === 'student') {
          return next({name: 'student'});
        }
        return next();
      } else {
        return next('/login');
      }
    },
    children: [
      {
        name: 'worker',
        path: '',
        meta: {
          title: 'Every'
        },
        component: () => import(/* */'@/views/Worker/Home/Home.vue'),
      },
    ]
  },
  {
    path: '/',
    name: '',
    component: () => import(/* */'@/views/Student/Student.vue'),
    beforeEnter: (to, from, next) => {
      if(VueCookie.get('access')) {
        if(VueCookie.get('identity') === 'student') {
          return next();
        }
        return next({name: 'worker'});
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
            props: (route) => ({ idx: route.query.idx, hit: route.query.hit }),
            component: () => import(/* */'@/views/Student/Bamboo/BambooPage.vue')
          },
          {
            name: 'bambooHit',
            path: 'hit',
            meta: {
              title: 'Every - 게시물'
            },
            component: () => import(/* */'@/views/Student/Bamboo/BambooHit.vue')
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
      {
        name: 'more',
        path: 'more',
        meta: {
          title: 'Every - More'
        },
        component: () => import(/* */'@/views/Student/More/More.vue'),
      },
    ]
  },
]

const router = new VueRouter({
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
