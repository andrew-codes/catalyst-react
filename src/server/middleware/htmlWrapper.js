import {createElement} from 'React';
import ReactDOMServer from 'react-dom/server';
import {getScripts} from './../lib/webpackBuiltAssets';
import Html from './../Html';

export default ({url, scripts}) => async (ctx, next) => {
  const isAsset = /\.(js|json)$/.test(ctx.url);
  if (isAsset) {
    return;
  }
  await next();
  if (!scripts) {
    scripts = getScripts();
  }
  const HtmlElement = createElement(Html, {title: ctx.route.title, url, body: ctx.route.body, scripts});
  ctx.body = ReactDOMServer.renderToStaticMarkup(HtmlElement);
};
