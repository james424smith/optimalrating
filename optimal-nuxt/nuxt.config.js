const webpack = require('webpack');


module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'google-site-verification', content: 'NATqbTqkj-OC8erC3V7PA5_egdXK_NV3c8lmZ1KEW18' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' },
      /*{ src: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js' },
      { src: 'https://apis.google.com/js/platform.js?onload=loadAuthClient' },*/
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.materialdesignicons.com/3.0.39/css/materialdesignicons.min.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },
  /*
  ** Global CSS
  */
  css: [
    './assets/css/styles.css',
    './assets/css/sleek.css',
    './assets/css/bootstrap-social.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src:'./plugins/i18n/index'},
    {src:'./plugins/importNoSsr.js'},
    {src:'./plugins/import.js', ssr:false},
    {src:'./plugins/sleek.js', ssr:false},
    {src:'./plugins/vue-social.js',ssr:false}
  ],

  /*
   ** Global variable
   *
   * @todo Prod sunucuda url değişmeli
   */
  //env:{ 'api_url'  :  'http://localhost:8000/api', 'base_url' :  'http://localhost:8000', 'cdn_url'  :  'http://localhost:8000/cdn'},
  //env:{'api_url' :  'https://api.optimalrating.com/api', 'base_url' :  'https://api.optimalrating.com', 'cdn_url' :  'https://api.optimalrating.com/cdn'},
  env:{'api_url' :  'https://server.optimalrating.com/api', 'base_url' :  'https://server.optimalrating.com', 'cdn_url' :  'https://server.optimalrating.com/cdn'},
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/font-awesome',
    '@nuxtjs/svg'
  ],
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
   vendor: ['bootstrap'],
   plugins: [
     new webpack.ProvidePlugin({
     //  $:"Jquery",
       '_':"lodash"
     }),
    /* new webpack.HotModuleReplacementPlugin({
       multiStep: true
     })*/
   ],
    extend(config, ctx) {
    }
  }
};
//629
