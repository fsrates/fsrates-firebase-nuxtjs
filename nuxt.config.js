import colors from 'vuetify/es5/util/colors';
import env from 'dotenv';
env.config();

export default {
  mode: 'universal',

  target: 'static',

  ssr: true,

  publicRuntimeConfig: {
    apiKey: 'AIzaSyCado-rFkBejI3CB6s1lR9xLizgv5MYGJg',
    authDomain: 'fs-exchange.firebaseapp.com',
    databaseURL:
      'https://fs-exchange-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'fs-exchange',
    storageBucket: 'fs-exchange.appspot.com',
    messagingSenderId: '632523912329',
    appId: '1:632523912329:web:985b8505780d84af328258',
    measurementId: 'G-H0HSG8LEC6'
  },
  /*
   ** Headers of the page
   ** Doc: https://vue-meta.nuxtjs.org/api/#metainfo-properties
   */
  head: {
    title: 'Nuxt.js starter for CSB',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Official Nuxt.js starter for CodeSandBox'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      },
      {
        rel: 'stylesheet',
        href: 'https://code.getmdl.io/1.1.3/material.blue_grey-orange.min.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Lobster&effect=shadow-multiple'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto'
      }
    ],
    script: [{ src: 'https://code.getmdl.io/1.1.3/material.min.js' }]
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],

  /*
   ** Nuxt.js modules
   ** Doc: https://modules.nuxtjs.org
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
    '@nuxtjs/dotenv'
  ],

  axios: {},

  firebase: {
    config: {
      apiKey: 'AIzaSyCado-rFkBejI3CB6s1lR9xLizgv5MYGJg',
      authDomain: 'fs-exchange.firebaseapp.com',
      databaseURL:
        'https://fs-exchange-default-rtdb.asia-southeast1.firebasedatabase.app',
      projectId: 'fs-exchange',
      storageBucket: 'fs-exchange.appspot.com',
      messagingSenderId: '632523912329',
      appId: '1:632523912329:web:985b8505780d84af328258',
      measurementId: 'G-H0HSG8LEC6'
    },
    services: {
      auth: {
        persistence: 'local',
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChanged'
        },
        ssr: false
      },
      database: true,
      firestore: true,
      storage: true,
      analytics: true
    },
    onFirebaseHosting: false
  },

  env: {
    NODE_ENV: 'development'
  },

  pwa: {
    meta: false,
    icon: false,
    workbox: {
      importScripts: ['/firebase-auth-sw.js'],
      dev: 'development'
    }
  },

  /*
   ** Global CSS
   ** Doc: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-css
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   ** Doc: https://nuxtjs.org/docs/2.x/directory-structure/plugins
   */
  plugins: [
    { src: './plugins/vuetify', ssr: true },
    { src: './plugins/axios.js', ssr: false },
    { src: './plugins/firebase-client.js', ssr: false }
  ],

  vuetify: {
    customVariables: ['./assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: colors.blue.darken2,
          accent3: colors.grey.darken3,
          secondary: colors.grey.base,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.base
        }
      }
    }
  },

  build: {}
};
