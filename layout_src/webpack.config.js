/**webpack配置文件 */

const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

let commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {

        plugins: [
          require('postcss-preset-env')(),
        ]
      }
    }
  }
]
module.exports = {
  entry: {
    long: './long/layout.js',
    long2: './long2/layout.js',
    mobile: './mobile/layout.js',
    newlayout: './newlayout/layout.js',
    nova: './nova/layout.js',
  },
  output: {
    filename: '[name]/layoutTemp.js',
    path: resolve(__dirname, '..', 'layout')
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/i,
            use: [...commonCssLoader],
          },
          {
            test: /\.less$/i,
            use: [
              ...commonCssLoader,
              "less-loader",
            ],
          },
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ]
  },
  plugins: [new MiniCssExtractPlugin({
    filename: '[name]/layout.css',
  })],
  // mode: 'development',
  mode: 'production',
  resolve: {
    // 在导入语句没带文件后缀时，webpack会自动按照顺序添加后缀名查找
    extensions: ['.ts', '.js', '.json'],
    // 配置别名
    alias: {
    }
  }
}