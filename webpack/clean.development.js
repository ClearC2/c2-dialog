const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = (env) => ({
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.join(env.projectDir, 'example'),
      exclude: ['.gitignore', 'favicon.ico']
    })
  ]
})
