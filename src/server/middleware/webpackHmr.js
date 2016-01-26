import WebpackHotMiddleware from 'webpack-hot-middleware';
import applyExpressMiddleware from './../lib/applyExpressMiddleware';
import _debug from 'debug';

const debug = _debug('app:server:webpack-hmr');

export default (compiler, opts) => {
  debug('Enable Webpack Hot Module Replacement (HMR).');

  const middleware = WebpackHotMiddleware(compiler, opts);
  return async (ctx, next) => {
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, ctx.res);
    if (hasNext && next) {
      await next();
    }
  };
};
