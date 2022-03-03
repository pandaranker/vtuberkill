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
    vk: './hp/vk.js',
  },
  output: {
    filename: (pathData) => ['vk'].includes(pathData.chunk.name) ? 'hp/[name]layoutTemp.js' : '[name]/layoutTemp.js',
    path: resolve(__dirname, '..', 'theme', 'style')
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
          {
            test: /\.(jpg|png|gif|bmp|jpeg|cur)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 30000,
                  name: '[name][hash:4].[ext]'
                }
              }
            ]
          }
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
    filename: (pathData) => ['vk'].includes(pathData.chunk.name) ? 'hp/[name].css' : '[name]/layout.css',
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