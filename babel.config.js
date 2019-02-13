const config = require('c2-react-config').babelConfig

config.plugins = [
  require.resolve('@babel/plugin-proposal-class-properties'),
  require.resolve('@babel/plugin-proposal-object-rest-spread'),
  require.resolve('@babel/plugin-syntax-dynamic-import'),
  require.resolve('react-hot-loader/babel')
]

module.exports = config
