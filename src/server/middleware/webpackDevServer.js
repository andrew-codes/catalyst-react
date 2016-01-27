import WebpackDevMiddleware from 'webpack-dev-middleware';
import applyExpressMiddleware from './../lib/applyExpressMiddleware';
import _debug from 'debug';
import config from './../../../build/config';
const debug = _debug('app:server:webpack-dev');

export default ({compiler, publicPath}) => async(ctx, next) => {
  debug('Enable webpack dev middleware.');

  const middleware = WebpackDevMiddleware(compiler, {
    publicPath,
    contentBase: config.paths.client(),
    hot: true,
    quiet: config.compilerQuiet,
    noInfo: config.compilerQuiet,
    lazy: false,
    stats: config.compilerStats
  });

  let hasNext = await applyExpressMiddleware(middleware, ctx.req, {
    end: function(content) {
      ctx.body = content.toString('utf8');
    },
    setHeader: () => ctx.set.apply(ctx, arguments)
  });
  if (hasNext) {
    await next();
  }
};
