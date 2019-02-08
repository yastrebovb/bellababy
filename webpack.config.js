const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssUrlRelativePlugin = require('css-url-relative-plugin')

const IS_DEV = process.env.NODE_ENV === 'dev'

const js = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader'
}
const scss = {
  test: /\.scss$/,
  use: [
    IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    'sass-loader?sourcemap'
  ]
}
const img = {
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    {
      loader: 'url-loader'
    },
    {
      loader: 'image-webpack-loader',
      options: {
        bypassOnDebug: true,
        mozjpeg: {
          progressive: true,
          quality: 75
        }
      }
    }
  ]
}

const pug = {
  test: /\.pug$/,
  include: path.join(__dirname, 'src'),
  loaders: ['pug-loader']
}

const config = {
  mode: IS_DEV ? 'development' : 'production',
  devtool: IS_DEV ? 'eval' : 'source-map',
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [js, scss, img, pug]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      {
        from: './src/public',
        to: 'public'
      }
    ]),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, './src/index.pug'),
      favicon: path.resolve(__dirname, './src/public/ico/favicon.ico'),
      minify: !IS_DEV && {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: IS_DEV ? 'css/[name].css' : 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].css'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CssUrlRelativePlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src')
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    },
    minimizer: []
  }
}

if (!IS_DEV) {
  const TerserPlugin = require('terser-webpack-plugin')
  const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

  config.optimization.minimizer.push(
    new TerserPlugin(),
    new OptimizeCSSAssetsPlugin({})
  )
}

module.exports = config
