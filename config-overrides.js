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
    '@typechain': path.resolve(__dirname, 'src/typechain'),
    '@middlewares': path.resolve(__dirname, 'src/middlewares'),
    '@globalTypes': path.resolve(__dirname, 'src/globalTypes'),
    '@': path.resolve(__dirname, 'src')
  })(config, env)
  // config.resolve.fallback = fallback
  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url')
  }
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ])
  config.ignoreWarnings = [/Failed to parse source map/]
  config.module.rules.unshift({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false // disable the behavior
    }
  })
  config.module.rules.push({
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: 'graphql-tag/loader'
  })

  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'] // You can also use 'file-loader' or 'url-loader' here
  })

  config.module.rules.push({
    test: /\.less$/i,
    exclude: /\.module\.(less)$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }
    ]
  })

  return config
}
