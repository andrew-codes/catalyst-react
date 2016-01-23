require('babel-polyfill');
import Koa from 'koa';
import React from 'React';
import ReactDOMServer from 'react-dom/server';
import webpack from 'webpack';
import _debug from 'debug';
import convert from 'koa-convert';
import serve from 'koa-static';
import webpackConfig from './../../webpack.config';
import * as config from './../../build/config';
import Html from './Html';
import webpackDevServer from './middleware/webpack-dev-server';
import webpackHmr from './middleware/webpack-hmr';
import responseTime from './middleware/responseTime';
import {getScripts} from './lib/webpackBuiltAssets';
import HelloWorld from './../../src/components/HelloWorld';
const debug = _debug('app:server');
const app = new Koa();

export default ({url}) => {
  let scripts = [];
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
    scripts = getScripts();
    app.use(convert(serve(config.paths.dist())));
  }

  app.use(responseTime());

  app.use(async (ctx, next) => {
    const isAsset = /\.(js|json)$/.test(ctx.url);
    if (isAsset) {
      return;
    }
    await next();
    const html = ReactDOMServer.renderToStaticMarkup(<Html title={ ctx.route.title } url={ url } body={ ctx.route.body }
                                                           scripts={ scripts } />);
    ctx.body = html;
  });

  app.use(async (ctx, next) => {
    // TODO: Handle routes to components here
    ctx.route = {
      title: 'Hello Koa',
      body: ReactDOMServer.renderToStaticMarkup(<HelloWorld />)
    };
  });

  return app;
};
