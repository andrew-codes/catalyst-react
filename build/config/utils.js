import _debug from 'debug';
const debug = _debug('app:config');
import pkg from './../../package.json';

const isInPackageJson = dependencies => vendor => {
  if (dependencies[vendor]) {
    return true;
  }
  debug(`Package ${vendor} was not found as a npm dependency in package.json and therefore will not be included in the webpack vendor bundle. Consider removing it from compiler.vendor in ~/build/config/index.js`);
};
export const validateVendor = vendors => vendors.filter(isInPackageJson(pkg.dependencies));
