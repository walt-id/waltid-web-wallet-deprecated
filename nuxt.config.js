export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "walt.id | Adopt Europe's new Digital Identity Ecosystem",
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'The easiest and fastest way to use Self-Sovereign Identity (SSI) compliant with new EU Identity Standards (EBSI, ESSIF).' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  "@/assets/css/core.scss",
  "@/assets/css/core.css",
  "@/assets/css/animate.min.css",
  "@/assets/css/animations.css",
  "@/assets/css/bootstrap-icons.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/bootstrap'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/auth"
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },

  proxy: {
   "/api/": "https://wallet.waltid.org"
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: "token",
          global: true,
          required: true,
          type: "Bearer"
        },
        user: false,
        endpoints: {
          login: { url: "api/auth/login", method: "post" },
          user: { url: "api/auth/userInfo", method: "get" },
          logout: false
        }
      },
      redirect: {
        login: '/login',
        logout: '/logout',
        home: '/Credentials',
        ecosystems: '/ecosystems',
        "ebsi-essif": '/ebsi-essif',
        Settings: '/Settings'
      }
    }
  },
  router: {
    middleware: ["auth"]
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en"
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: true,
    },
  }
}
