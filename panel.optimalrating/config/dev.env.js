var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_LOCATION : '"https://server.optimalrating.com/api/panel/"',
  // WEB_API_LOCATION : '"https://server.optimalrating.com/api/"',
  // CDN_LOCATION : '"https://server.optimalrating.com/"',
  API_LOCATION: '"http://localhost:8000/api/panel/"',
  WEB_API_LOCATION: '"http://localhost:8000/api/"',
  CDN_LOCATION: '"http://localhost:8000/"'
})
