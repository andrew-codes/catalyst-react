import webpack from 'webpack';
import webpackConfig from './../../../webpack.config';
import _debug from 'debug';
const debug = _debug('app:server:lib:compile');

export default () => {
  return new Promise(resolve => {
    let compiler = null;
    const { publicPath } = webpackConfig.output;
    return new Promise(resolve => {
      let scripts = null;
      compiler = webpack(webpackConfig, (error, stats) => {
        if (error) {
          debug(error);
        }
        const assets = stats.toJson().assetsByChunkName;
        scripts = Object.keys(assets).map(key => assets[key]);
        resolve(scripts);
      });
    })
      .then(scripts => resolve({compiler, publicPath, scripts}));
  });
};

