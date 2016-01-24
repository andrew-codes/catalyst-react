import fs from 'fs';
import config from './../../../build/config';
import _debug from 'debug';
const debug = _debug('app:webpackAssetsGetter');

export const getScripts = () => {
  debug('Reading webpack stats.json file.');
  const stats = JSON.parse(fs.readFileSync(config.paths.dist('stats.json'), 'utf8'));
  return Object.keys(stats.assetsByChunkName).map(assetKey => stats.assetsByChunkName[assetKey]);
};
