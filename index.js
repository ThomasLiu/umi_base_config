'use strict';

// https://umijs.org/config/
// import pageRoutes from './router.config';
// import config from 'umi_base_config';

module.exports = {
  // add for transfer to umi
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          immer: true,
        },
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/PageLoading/index',
        },
        dll: {
          include: [ 'dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es' ],
          exclude: [ '@babel/runtime' ],
        },
        hardSource: true,
      },
    ],

  ],
  autoprefixer: { flexbox: true },
  es5ImcompatibleVersions: true,
  treeShaking: true,
  targets: {
    ie: 9,
  },

  proxy: {
    '/api/v1': {
      target: 'http://127.0.0.1:7101',
      changeOrigin: true,
      pathRewrite: { '^/api/v1': '/api/v1' },
    },
  },
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },


  ignoreMomentLocale: true, // 忽略 moment 的 locale 文件，用于减少尺寸。
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,


  cssnano: {
    mergeRules: false,
  },

  // extra configuration for egg
  runtimePublicPath: true, // 值为 true 时使用 HTML 里指定的 window.publicPath。
  hash: true,
  outputPath: '../public',
  // 配置后会生成 manifest.json，option 传给 https://www.npmjs.com/package/webpack-manifest-plugin。 比如：
  manifest: {
    fileName: '../../config/manifest.json',
    publicPath: '',
  },
  extraBabelPlugins: [
    [
      'import', {
        libraryName: 'u_webant',
        libraryDirectory: 'lib',
        style: true,
        camel2DashComponentName: false,
      },
    ],
  ],
};
