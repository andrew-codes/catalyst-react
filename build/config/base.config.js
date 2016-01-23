import path from 'path';
import {validateVendor} from './utils';

export const env = (process.env.NODE_ENV || 'development').toLowerCase();
export const __PROD__ = env === 'production';
export const __DEV__ = env === 'development';
export const __TEST__ = env === 'test';
export const host = process.env.HOST || 'localhost';
export const port = process.env.PORT || 3000;

export const compilerDevtool = 'source-map';
export const compilerCssModules = false;
export const compilerHashType = 'hash';
export const compilerFailOnWarning = false;
export const compilerQuiet = false;
export const compilerPublicPath = '';
export const compilerStats = {
  chunks: false,
  chunkModules: false,
  colors: true
};
export const compilerVendor = validateVendor([
  'react'
]);

const rootDir = path.join(__dirname, '..', '..');
const base = (...args) => path.resolve.apply(path.resolve, [rootDir, ...args]);
const clientDir = base('src', 'client');
const serverDir = base('src', 'server');
const distDir = base('src', 'client', 'public', 'js');

export const paths = {
  root: base,
  client: base.bind(null, clientDir),
  server: base.bind(null, serverDir),
  dist: base.bind(null, distDir)
};

export const globals = {
  'proces.env': {
    'NODE_ENV': JSON.stringify(env)
  },
  'NODE_ENV': env,
  '__DEV__': env === 'development',
  '__PROD__': env === 'production'
};
