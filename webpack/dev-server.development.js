const {webpackUtils} = require('c2-react-config')
const path = require('path')

module.exports = (env) => webpackUtils.extendPreset(env, 'dev-server.development', {
  devServer: {
    contentBase: path.join(env.projectDir, 'example', 'dist'),
    port: 8087
  }
})
