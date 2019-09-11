const path = require("path");
const webpack = require("webpack")

const resolve = dir => {
  return path.join(__dirname, dir);
};

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = "/";//process.env.NODE_ENV === "production" ? "/ring" : "/";

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  publicPath: BASE_URL,

  // 输出文件目录
  outputDir: "dist", // 默认dist
  assetsDir: "static", // 用于嵌套生成的静态资产（js,css,img,fonts）目录

  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  indexPath: 'index.html',
  filenameHashing: true,


  pages: {
    index: {
        // page 的入口
        entry: 'src/main.js',
        // 模板来源
        template: 'public/index.html',
        // 在 dist/index.html 的输出
        filename: 'index.html',
        // 当使用 title 选项时，
        // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'Tron Oscar',
        // 在这个页面中包含的块，默认情况下会包含
        // 提取出来的通用 chunk 和 vendor chunk。
        chunks: ['chunk-vendors', 'chunk-common', 'index']
      }
  },


  //vue.config.js中去配置全局引用、路径别名等。
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src")) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set("_c", resolve("src/components"));
  },

  // 设为false打包时不生成.map文件
  productionSourceMap: false,

  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    host: "localhost",
    port: 3001,
    https: false,
    open: true,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => {}
  },

  // PWA 插件相关配置
  pwa: {},

  // 第三方插件配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/style/_setting.less'),
      ]
    }
  },

  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "windows.jQuery":"jquery"
      })
    ]
  }
};
