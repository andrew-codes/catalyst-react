'use strict';

import ignored from './ignoredExtensions';
import pkg from './../../package.json';
import _ from 'underscore';

export default (config) => {
	return Object.freeze(_.extend({
		assets: {
			public: 'assets',
			src: 'assets'
		},
		buildAssets: {
			public: 'build',
			src: 'build'
		},
	}, config, {
		isProduction: process.env.NODE_ENV === 'production',
		piping: {
			ignore: ignored.extensionsRegExp,
			hook: true
		},
		port: process.env.PORT || 3000,
		version: pkg.version
	}));
};
