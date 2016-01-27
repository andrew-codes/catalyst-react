import {config as envConfig} from 'dotenv';
envConfig();

import config from './../config';
import {blog} from './../../package.json';
import server from './../../src/server/createServer';
import _debug from 'debug';
const debug = _debug('catalyst/build/scripts/start-dev');
const port = config.port;
const host = config.host;

server(blog.url).then(s => {
  s.listen(port);
  debug(`Server is now running at ${host}:${port}.`);
});
