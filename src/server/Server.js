'use strict';

require('babel/register');
let ignored = require('./ignoredExtensions');
ignored.extensions.forEach(function (ext) {
	require.extensions['.' + ext] = function () {};
});

let createServerConfig = require('./createServerConfig');
let expressServer = require('./expressServer');

module.exports = function (config) {

	function start() {
		return expressServer(createServerConfig(config));
	}

	return {
		start: start
	};
};
