const webpack = require('webpack')
const rewireAliases = require('react-app-rewire-aliases')
const path = require('path')

module.exports = function override(config, env) {
  // Object.assign(fallback, {
  //   crypto: require.resolve('crypto-browserify'),
  //   stream: require.resolve('stream-browserify'),
  //   assert: require.resolve('assert'),
  //   http: require.resolve('stream-http'),
  //   https: require.resolve('https-browserify'),
  //   os: require.resolve('os-browserify'),
  //   url: require.resolve('url'),
  // })
  config = rewireAliases.aliasesOptions({
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@apis': path.resolve(__dirname, 'src/apis'),
    '@layouts': path.resolve(__dirname, 'src/layouts'),
    '@constants': path.resolve(__dirname, 'src/constants'),
    '@styles': path.resolve(__dirname, 'src/styles'),
    '@locales': path.resolve(__dirname, 'src/locales'),
    '@helpers': path.resolve(__dirname, 'src/helpers'),
    '@contracts': path.resolve(__dirname, 'src/contracts'),
    '@graphql': path.resolve(__dirname, 'src/graphql'),
    '@redux': path.resolve(__dirname, 'src/redux'),
    '@': path.resolve(__dirname, 'src'),
  })(config, env)
  // config.resolve.fallback = fallback
  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url'),
  }
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
      // 'react/jsx-dev-runtime.js': require.resolve('react/jsx-dev-runtime.js'),
      // 'react/jsx-runtime.js': require.resolve('react/jsx-runtime.js'),
    }),
  ])
  config.ignoreWarnings = [/Failed to parse source map/]
  config.module.rules.unshift({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false, // disable the behavior
    },
  })
  return config
}
