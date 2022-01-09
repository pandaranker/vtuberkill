/**webpack配置文件 */

const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  entry: {
    game: './main.js'
  },
  output: {
    filename: '[name].js',
    path: resolve('..')
  },
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [[
      //         '@babel/preset-env',
      //         {
      //           useBuiltIns: 'usage',
      //           corejs: {
      //             //core-js的版本
      //             version: 3
      //           },
      //           //需要兼容的浏览器
      //           targets: {
      //             chrome: '60',
      //             firefox: '60',
      //             ie: '9',
      //             safari: '10',
      //             edge: '17'
      //           }
      //         }
      //       ]],
      //       plugins: ['@babel/transform-runtime'],
      //       sourceType: "unambiguous",
      //     }
      //   }
      // }

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
      '@d': resolve('data'),
      '@m': resolve('methods'),
      '@e': resolve('extension'),
    }
  },
  target: 'node'
}