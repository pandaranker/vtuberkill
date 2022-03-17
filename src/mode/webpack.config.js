/**webpack配置文件 */

const { resolve } = require("path");
const TerserPlugin  = require('terser-webpack-plugin');
module.exports = {
  entry: {
    mode:'./_entry.js',
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, '..','..', 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          // {
          //   loader: 'babel-loader',
          //   options: {
          //     presets: ['@babel/preset-env'],
          //     plugins: ['@babel/transform-runtime']
          //   }
          // },
          'ts-loader'
        ],
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [],
  mode: 'development',
  // mode: 'production',
  resolve: {
    // 在导入语句没带文件后缀时，webpack会自动按照顺序添加后缀名查找
    extensions: ['.ts', '.js', '.json'],
    // 配置别名
    alias: {
    }
  }
}