'use strict';

import gulp from 'gulp';
import nodemon from 'nodemon';

gulp.task('start-dev-server', [], function () {
    nodemon({
            script: './server.js',
            ext: 'js'
        }
    );
});