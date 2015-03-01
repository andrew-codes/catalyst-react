'use strict';

import ignored from './ignoredExtensions';
import * as pkg from './../../package.json';

export default (config) => {
	return Object.freeze(Object.assign({
		isProduction: process.env.NODE_ENV === 'production',
		piping: {
			ignore: ignored.extensionsRegExp(),
			hook: true
		},
		port: process.env.PORT || 3000,
		version: pkg.version,
		assets: {
			public: 'assets',
			src: 'assets'
		},
		buildAssets: {
			public: 'build',
			src: 'build'
		},
	}, config));
};
