/**webpack配置文件 */

const { resolve } = require("path");
const TerserPlugin  = require('terser-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

let commonCssLoader = [
  'style-loader',
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
    character:'./character/_entry.js',
    card:'./card/_entry.js',
    mode:'./mode/_entry.js',
    main:'./main/main.ts',
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, '..', 'dist')
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
          }
        ]
      },
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
    minimize: false,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
  },
  // plugins: [new MiniCssExtractPlugin({
  //   filename: (pathData) => '[name]_layout.css',
  // })],
  mode: 'development',
  // mode: 'production',
  resolve: {
    // 在导入语句没带文件后缀时，webpack会自动按照顺序添加后缀名查找
    extensions: ['.ts', '.js', '.json'],
    // 配置别名
    alias: {
    }
  },
  externals: {
    'lodash': '_'
  }
}