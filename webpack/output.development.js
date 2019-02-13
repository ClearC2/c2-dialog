const path = require('path')

module.exports = (env) => ({
  output: {
    path: path.join(env.projectDir, 'example', 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  }
})
