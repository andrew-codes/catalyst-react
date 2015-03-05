'use strict';

let ignored = require('./ignoredExtensions');
ignored.extensions.forEach(function (ext) {
	require.extensions['.' + ext] = function () {};
});

let apiMiddleware = require('./middlewares/apiService');
let createServerConfig = require('./createServerConfig');
let expressServer = require('./expressServer');
let requireDir = require('require-dir');
let servicesMap = requireDir('./services');
let apis = Object.keys(servicesMap).map(key => servicesMap[key]);

module.exports = function (config) {

	function start() {
		return expressServer(createServerConfig(config))
			.then(function (server) {
				apiMiddleware(server, apis);
				return server;
			});
	}

	return {
		start: start
	};
};
