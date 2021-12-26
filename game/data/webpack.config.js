/**webpack配置文件 */

const {resolve} = require("path");

function resolve1(dir) {
    return resolve(__dirname, dir)
}
module.exports = {
   entry: './webpack.js',
   output: {
      filename: 'data.js',
      path: resolve1('output')
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/transform-runtime']
               }
            }
         }
      ]
   },
   plugins: [],
   // mode: 'development',
   mode: 'production',
   resolve: {
      // 在导入语句没带文件后缀时，webpack会自动按照顺序添加后缀名查找
      extensions: ['.js', '.json'],
      // 配置别名
      alias: {
      }
   }
}