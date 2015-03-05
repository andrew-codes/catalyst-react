'use strict';

import gulp from 'gulp';
import mocha from 'gulp-mocha';
import './../../test/lib/specs-setup';

global.isWatching = true;

gulp.task('specs', [], function () {
	let specs = './test/specs/**/*.js';
	return gulp.src(specs)
		.pipe(mocha({
			ui: 'bdd',
			reporter: 'spec'
		}));
});
