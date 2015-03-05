'use strict';

let ignored = require('./ignoredExtensions');
ignored.extensions.forEach(function (ext) {
	require.extensions['.' + ext] = function () {};
});

let apiMiddleware = require('./middlewares/apiService');
let createServerConfig = require('./createServerConfig');
let expressServer = require('./expressServer');
let requireDir = require('require-dir');
let middlewareMap = requireDir('./services');
let middlewares = Object.keys(middlewareMap).map(key => middlewareMap[key]);

module.exports = function (config) {

	function start() {
		return expressServer(createServerConfig(config))
			.then(function (server) {
				middlewares.forEach((middleware) => {
					server.use(middleware.route, middleware.handler);
				});
				return server;
			});
	}

	return {
		start: start
	};
};
