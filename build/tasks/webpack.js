'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfigFactory from './../webpackConfigFactory';
let isProduction = process.env.NODE_ENV === 'production';
let webpackConfig = webpackConfigFactory(isProduction);

gulp.task('webpack', [], function (done) {
    if (isProduction) {
        webpack(webpackConfig, function (fatalError, stats) {
            let jsonStats = stats.toJson();
            let buildError = fatalError || jsonStats.errors[0] || jsonStats.warnings[0];
            if (buildError) {
                throw new gutil.PluginError('webpack', buildError);
            }
            gutil.log('[webpack]', stats.toString({
                colors: true,
                version: false,
                hash: false,
                timings: false,
                chunks: false,
                chunkModules: false
            }));
            done();
        });
    }
    else {
        new WebpackDevServer(webpack(webpackConfig), {
            contentBase: 'http://localhost:8888',
            hot: true,
            publicPath: webpackConfig.output.publicPath,
            quiet: false,
            noInfo: true,
            stats: {
                assets: false,
                colors: true,
                version: false,
                hash: false,
                timings: false,
                chunks: false,
                chunkModules: false
            }
        })
            .listen(8888, 'localhost', function (error) {
                if (error) {
                    throw new gutil.PluginError('webpack-dev-server', error);
                }
                gutil.log('[webpack-dev-server]', 'localhost:8888/assets/bundle/bundle.js');
                done()
            });
    }
});