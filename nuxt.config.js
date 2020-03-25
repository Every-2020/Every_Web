
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Every',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Every - 학교 생활을 편리화시키다.' },
      { name: 'keywords', content: 'Every, 에브리, 대나무숲, 학교, 학생, 직장인, 편리화, 대구소프트웨어고등학교, 학생 커뮤니티' },
      { property: 'og:image', content: 'http://everykr.com/search_image.png' },
      { property: 'og:description', content: 'Every - 학교 생활을 편리화시키다.' },
      { property: 'og:title', content: 'Evey - 에브리' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'canonical', href: 'http://everykr.com' },
      { rel: 'preload', as: 'font', crossorigin: 'crossorigin', type: 'font/woff2', href: 'fonts/NanumSquareEB.woff' },
      { rel: 'preload', as: 'font', crossorigin: 'crossorigin', type: 'font/woff2', href: 'fonts/NanumSquareB.woff' },
      { rel: 'preload', as: 'font', crossorigin: 'crossorigin', type: 'font/woff2', href: 'fonts/NanumSquareR.woff' }
    ]
  },
  router: {
    middleware: [ 'auth', 'identity' ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue-sweetalert2.js',
    '~/plugins/vue-cookie.js',
    '~/plugins/fontawesome.js',
    { src: '~/plugins/vuejs-datepicker', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],
  // styleResources: {
  //   sass: [
  //     '@/assets/style/common.scss'
  //   ]
  // },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
