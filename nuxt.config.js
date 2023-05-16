
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "walt.id | Adopt Europe's new Digital Identity Ecosystem",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "The easiest and fastest way to use Self-Sovereign Identity (SSI) compliant with new EU Identity Standards (EBSI, ESSIF).",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // "@/assets/css/core.scss",
    "@/assets/css/core.css",
    "@/assets/css/animate.min.css",
    "@/assets/css/animations.css",
    "@/assets/css/bootstrap-icons.css",
    "@near-wallet-selector/modal-ui/styles.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/bootstrap", "@/plugins/globals.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: ["~/components", "~/components/credentials"],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    "@nuxtjs/pwa",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/auth-next",
    "@nuxtjs/i18n",
    "@nuxtjs/toast",
    "@nuxtjs/proxy",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  proxy: {
    // "/api/": "https://wallet.walt-test.cloud",
    // "/v2/nftkit/nft/": "https://nftkit.walt-test.cloud",
    "/v2/nftkit/nft/": "http://localhost:7000",
    "/api/": "http://localhost:8080",
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: "token",
          global: true,
          required: true,
          type: "Bearer",
        },
        user: false,
        endpoints: {
          login: { url: "api/auth/login", method: "post" },
          user: { url: "api/auth/userInfo", method: "get" },
          logout: false,
        },
      },
    },
    redirect: {
      login: "/login",
      logout: "/login",
      home: "/",
    },
    cookie: false,
  },
  i18n: {
    /* module options */
    langDir: "~/locales/",
    locales: [
      { code: "en", iso: "en-US", file: "en.js", flag: "flag-en.svg" },
      { code: "de", iso: "de-DE", file: "de.js", flag: "flag-de.svg" },
      { code: "fr", iso: "fr-FR", file: "fr.js", flag: "flag-fr.svg" },
    ],
    defaultLocale: "en",
    strategy: "no_prefix",
    vueI18n: {
      fallbackLocale: "en",
    },
  },
  router: {
    middleware: ["auth", "wallet"],
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      default: "/favicon.png",
    },
    meta: {
      title: "walt.id | Adopt Europe's new Digital Identity Ecosystem",
      author: "walt.id",
    },
    manifest: {
      name: "walt.id | Adopt Europe's new Digital Identity Ecosystem",
      short_name: "walt.id",
      lang: "en",
      display: "standalone",
    },
  },

  publicRuntimeConfig: {
    salt: process.env.SALT,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: true,
    },
    extend(config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = "source-map";
      }
      config.module.rules.push(
        {
          test: /\.js$/,
          loader: require.resolve('@open-wc/webpack-import-meta-loader'),
          exclude: /\.vue$/,
        },
        {
          test: /\.m?js$/,
          include: /node_modules[/\\|]@polkadot/i,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@vue/cli-plugin-babel/preset',
              ],
              plugins: [
                "@babel/plugin-proposal-private-methods",
                "@babel/plugin-proposal-class-properties",
                '@babel/plugin-proposal-object-rest-spread',
              ]
            }
          }
        }
      )
    },
  },

  ssr: false,
};
