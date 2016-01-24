import React from 'React';
import ReactDOMServer from 'react-dom/server';
import {getScripts} from './../lib/webpackBuiltAssets';
import Html from './../Html';

export default (url) => async (ctx, next) => {
  const isAsset = /\.(js|json)$/.test(ctx.url);
  if (isAsset) {
    return;
  }
  await next();
  const scripts = getScripts();
  ctx.body = ReactDOMServer.renderToStaticMarkup(<Html title={ ctx.route.title } url={ url } body={ ctx.route.body }
                                                       scripts={ scripts } />);
};
