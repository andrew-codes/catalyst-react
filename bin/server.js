require('babel-register')({
  presets: ['es2015', 'react', 'stage-3', 'stage-2', 'stage-1', 'stage-0'],
  plugins: ['add-module-exports']
});
const url = require('./../package.json').blog.url;
const config = require('./../build/config');
const server = require('./../src/server')({url});
const debug = require('debug')('app:bin:server');

const port = config.port;
const host = config.host;

server.listen(port);
debug(`Server is now running at ${host}:${port}.`);
