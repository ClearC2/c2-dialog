const path = require('path')
const {webpackConfig} = require('c2-react-config')

module.exports = (env) => {
  env.presetDir = path.join(__dirname, 'webpack')
  env.projectDir = __dirname
  return webpackConfig(env)
}
