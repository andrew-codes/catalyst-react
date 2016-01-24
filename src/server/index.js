require('babel-polyfill');
import Koa from 'koa';
import webpack from 'webpack';
import _debug from 'debug';
import convert from 'koa-convert';
import serve from 'koa-static';
import webpackConfig from './../../webpack.config';
import * as config from './../../build/config';
import webpackDevServer from './middleware/webpack-dev-server';
import webpackHmr from './middleware/webpack-hmr';
import responseTime from './middleware/responseTime';
import htmlWrapper from './middleware/htmlWrapper';
const debug = _debug('app:server');
const app = new Koa();

export default ({url}) => {
  let scripts;
  if (config.__DEV__) {
    debug('Applying dev environment middleware to server');
    const compiler = webpack(webpackConfig, (error, stats) => {
      if (error) {
        debug(error);
      }
      const assets = stats.toJson().assetsByChunkName;
      scripts = Object.keys(assets).map(key => assets[key]);
    });
    const { publicPath } = webpackConfig.output;
    app.use(webpackDevServer(compiler, publicPath));
    app.use(webpackHmr(compiler));
  }

  if (config.__PROD__) {
    debug('Applying production configuration');
    app.use(convert(serve(config.paths.dist())));
  }

  app.use(responseTime());
  app.use(htmlWrapper(url, scripts));

  app.use(async (ctx, next) => {
    // TODO: Handle routes to components here
    ctx.route = {
      title: 'Hello Koa',
      body: ''
    };
  });

  return app;
};
