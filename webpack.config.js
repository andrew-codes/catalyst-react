import webpack from 'webpack';
import cssnano from 'cssnano';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {StatsWriterPlugin} from 'webpack-stats-plugin';
import _debug from 'debug';
import * as config from './build/config';

const debug = _debug('app:webpack:config');
debug('Create configuration.');

const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.compilerDevTool,
  resolve: {
    root: config.paths.root(config.paths.client()),
    extensions: ['', '.js']
  },
  module: {}
};
// ------------------------------------
// Entry Points
// ------------------------------------
const appEntryPath = config.paths.client('index.js');
webpackConfig.entry = {
  app: config.__DEV__
    ? [appEntryPath, 'webpack-hot-middleware/client?path=/__webpack_hmr']
    : [appEntryPath],
  vendor: config.compilerVendor
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: `[name].[${config.compilerHashType}].js`,
  path: config.paths.dist(),
  publicPath: config.compilerPublicPath
};

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals)
];

if (config.__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).');
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
} else if (config.__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).');
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new StatsWriterPlugin({
      filename: 'stats.json'
    })
  );
}

// ------------------------------------
// Pre-Loaders
// ------------------------------------
webpackConfig.module.preLoaders = [
  {
    test: /\.js$/,
    loader: 'eslint',
    exclude: /node_modules/
  }
];

webpackConfig.eslint = {
  configFile: config.paths.root('.eslintrc'),
  emitWarning: config.__DEV__
};

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.loaders = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      cacheDirectory: true,
      plugins: ['transform-runtime'],
      presets: config.__DEV__
        ? ['es2015', 'react', 'stage-3', 'stage-2', 'stage-1', 'react-hmre']
        : ['es2015', 'react', 'stage-3', 'stage-2', 'stage-1']
    }
  },
  {
    test: /\.json$/,
    loader: 'json'
  }
];

// Styles
const cssLoaders = [
  'css?modules',
  'sourceMap',
  'importLoaders=1',
  'localIdentName=[name]__[local]___[hash:base64:5]'
].join('&');
const cssLoader = !config.compilerCssModules
  ? 'css?sourceMap'
  : cssLoaders;

webpackConfig.module.loaders.push({
  test: /\.scss$/,
  include: /src/,
  loaders: [
    'style',
    cssLoader,
    'postcss',
    'sass'
  ]
});

webpackConfig.module.loaders.push({
  test: /\.css$/,
  include: /src/,
  loaders: [
    'style',
    cssLoader,
    'postcss'
  ]
});

// Don't treat global SCSS as modules
webpackConfig.module.loaders.push({
  test: /\.scss$/,
  exclude: /src/,
  loaders: [
    'style',
    'css?sourceMap',
    'postcss',
    'sass'
  ]
});

// Don't treat global, third-party CSS as modules
webpackConfig.module.loaders.push({
  test: /\.css$/,
  exclude: /src/,
  loaders: [
    'style',
    'css?sourceMap',
    'postcss'
  ]
});

webpackConfig.sassLoader = {
  includePaths: config.paths.client('styles')
};

webpackConfig.postcss = [
  cssnano({
    sourcemap: true,
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    },
    safe: true,
    discardComments: {
      removeAll: true
    }
  })
];

// File loaders
/* eslint-disable */
webpackConfig.module.loaders.push(
  {
    test: /\.woff(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.woff2(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
  },
  {
    test: /\.otf(\?.*)?$/,
    loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'
  },
  {
    test: /\.ttf(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
  },
  {
    test: /\.eot(\?.*)?$/,
    loader: 'file?prefix=fonts/&name=[path][name].[ext]'
  },
  {
    test: /\.svg(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'
  },
  {
    test: /\.(png|jpg)$/, loader: 'url?limit=8192'
  }
);
/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!config.__DEV__) {
  debug('Apply ExtractTextPlugin to CSS loaders.');
  webpackConfig.module.loaders.filter(loader =>
    loader.loaders && loader.loaders.find(name => /css/.test(name.split('?')[0]))
  ).forEach(loader => {
    const [first, ...rest] = loader.loaders;
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'));
    delete loader.loaders;
  });

  webpackConfig.plugins.push(
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    })
  );
}

export default webpackConfig;
