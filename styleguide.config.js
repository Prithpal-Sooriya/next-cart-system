const path = require('path')

const root = path.resolve(__dirname)

const webpackOutput = {
  path: `${root}/styleguide/build`,
  filename: 'bundle.js',
  chunkFilename: '[name].js',
}

const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', 'next/babel'],
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
        ],
      },
    ],
  },
}

module.exports = {
  title: 'Cart System Component Documentation',
  components: `${root}/components/**/*.tsx`,
  propsParser: require('react-docgen-typescript').parse,
  styleguideComponents: {
    Wrapper: `${root}/styleguide/Wrapper`,
  },
  moduleAliases: {
    root: path.resolve(__dirname, './'),
  },
  webpackConfig,
  dangerouslyUpdateWebpackConfig: (config) => ({ ...config, output: webpackOutput }),
  configureServer: (app) => {
    app.get('/static/*', (req, res) => {
      const file = req.originalUrl.split('?')[0]
      res.status(200).sendFile(`${root}${file}`)
    })
  },
}
