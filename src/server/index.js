require('babel-polyfill');
import Koa from 'koa';
import _debug from 'debug';
import convert from 'koa-convert';
import serve from 'koa-static';
import * as config from './../../build/config';
import webpackDevServer from './middleware/webpackDevServer';
import webpackHmr from './middleware/webpackHmr';
import responseTime from './middleware/responseTime';
import htmlWrapper from './middleware/htmlWrapper';
import compile from './lib/compile';
const debug = _debug('app:server');
const app = new Koa();

export default async ({url}) => {
  let scriptFiles = null;
  if (config.__DEV__) {
    debug('Applying dev environment middleware to server');
    const {compiler, publicPath, scripts} = await compile();
    scriptFiles = scripts;
    app.use(webpackDevServer(compiler, publicPath));
    app.use(webpackHmr(compiler));
  }

  app.use(convert(serve(config.paths.dist())));
  app.use(htmlWrapper({url, scripts: scriptFiles}));
  app.use(responseTime());

  app.use(async (ctx, next) => {
    // TODO: Handle routes to components here
    ctx.route = {
      title: 'Hello Koa',
      body: ''
    };
  });

  return app;
};
