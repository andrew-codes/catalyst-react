import _debug from 'debug';
import fs from 'fs';
import * as config from './base.config';

const debug = _debug('app:config:index');
debug('Create configuration.');

const overridesFileName = `${config.env}.config`;
let hasOverrides = false;
try {
  fs.lstatSync(`${__dirname}/${overridesFileName}.js`);
  hasOverrides = true;
} catch (e) {

}

let overrides;
if (hasOverrides) {
  overrides = require(`./${overridesFileName}`)(config);
}
export default Object.assign({}, config, overrides);
