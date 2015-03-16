'use strict';

require('babel/register');
var config = require('./blog.config');

var server = require('./src/server/Server');
server(config).start();