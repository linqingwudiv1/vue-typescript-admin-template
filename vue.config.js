// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, on Mac: sudo npm run / sudo yarn


// TODO: get this variable from setting.ts
const devServerPort = 9527;
// TODO: get this variable from setting.ts 
const name = 'Vue Template Admin'; 


const CompressionPlugin = require('compression-webpack-plugin');

const plugins_custom = [];

if (process.env.NODE_ENV === 'production')
{
  plugins_custom.push(new CompressionPlugin({
    test: /\.js$|\.html$|\.css$|\.css/,
    threshold: 10240,
    deleteOriginalAssets: false
  }));
};

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: false ,
  crossorigin:'anonymous',
  productionSourceMap: false,
  devServer: {
    port: devServerPort,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    progress: false
  },
  pwa: {
    name: name,
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: path.resolve(__dirname, 'src/pwa/service-worker.js')
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    },
    express: {
      shouldServeApp: false,
      serverDir: 'DebugServer'
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        import: "~@/src/styles/Global.styl"   
      }
    }
  },
  configureWebpack:{
    devtool: process.env.NODE_ENV === 'production' ? 'nosources-source-map': 'cheap-eval-source-map',
    plugins:plugins_custom,
    //#region cdn
    /*
    externals: {
      vue: "Vue",
      vuex: "Vuex",
      "vue-router": "VueRouter",
      "element-ui": "ELEMENT",
      "echart": "EChart"
    }
    */
    //#endregion
  },
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)


    // remove vue-cli-service's progress output
    config.plugins.delete('progress')
    // replace with another progress output plugin to solve the this bug:
    // https://github.com/vuejs/vue-cli/issues/4557
    config.plugin('simple-progress-webpack-plugin')
      .use(require.resolve('simple-progress-webpack-plugin'), [{
        format: 'compact'
      }])

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: path.resolve(__dirname, 'src/components'),
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
