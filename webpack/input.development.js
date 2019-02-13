const path = require('path')

module.exports = (env) => ({
  entry: [
    '@babel/polyfill',
    'url-search-params-polyfill',
    path.join(env.projectDir, 'example', 'src', 'index.js')
  ]
})
