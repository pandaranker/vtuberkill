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
let hp_style = ['vk','emotion','hpbutton','glass','ol','round']
let hp_entry = {}
for(let v of hp_style){
  hp_entry[v] = `./hp/${v}.js`
}
module.exports = {
  entry: {
    ...hp_entry
  },
  output: {
    filename: (pathData) => hp_style.includes(pathData.chunk.name) ? 'hp/[name]layoutTemp.js' : '[name]/layoutTemp.js',
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
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        // type: 'asset',
        // parser: {
        //   dataurlCondition: {
        //     maxSize: 8192
        //   }
        // },
        // generator: {
        //   filename: '[name][hash:4].[ext]'
        // }
        type: 'asset/inline',
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 30000,
        //       name: '[name][hash:4].[ext]'
        //     }
        //   }
        // ],
        // type:'javascript/auto'
      }
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ]
  },
  plugins: [new MiniCssExtractPlugin({
    filename: (pathData) => hp_style.includes(pathData.chunk.name) ? 'hp/[name].css' : '[name]/layout.css',
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