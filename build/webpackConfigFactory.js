'use strict';

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import NotifyPlugin from './lib/notifyPlugin';
import path from 'path';

function styleLoaders(isProduction) {
    let loaders = [
        {
            test: /\.css$/,
            loader: 'css-loader!autoprefixer'
        },
        {
            test: /\.styl$/,
            loader: 'css-loader!autoprefixer!stylus-loader'
        },
        {
            test: /\.less$/,
            loader: 'css-loader!autoprefixer!less-loader'
        }
    ];
    return loaders.map(loader => {
        if (isProduction) {
            loader.loader = ExtractTextPlugin.extract('style-loader', loader.loader);
        }
        else {
            loader.loader = `style-loader!${loader.loader}`;
        }
        return loader;
    });
}

export default function (isProduction) {
    return {
        cache: !isProduction,
        debug: !isProduction,
        devtool: !isProduction && 'eval-source-map',
        entry: isProduction ? [
            './src/client/Main.jsx'
        ] : [
            'webpack-dev-server/client?http://localhost:8888',
            // Why only-dev-server instead of dev-server:
            // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
            'webpack/hot/only-dev-server',
            './src/client/Main.jsx'
        ],
        output: isProduction ? {
            path: 'blog/assets/bundle',
            filename: 'bundle.js'
        } : {
            path: path.join(__dirname, './blog/assets/bundle'),
            filename: 'bundle.js',
            publicPath: 'http://localhost:8888/assets/bundle/'
        },
        plugins: (function () {
            let plugins = [
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify(isProduction ? 'production' :
                            'development'),
                        IS_BROWSER: true
                    }
                })
            ];
            if (isProduction) {
                plugins.push(
                    new ExtractTextPlugin('bundle.css', {
                        allChunks: true
                    }),
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.OccurenceOrderPlugin(),
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    })
                );
            }
            else {
                plugins.push(
                    NotifyPlugin,
                    new webpack.HotModuleReplacementPlugin(),
                    new webpack.NoErrorsPlugin()
                );
            }
            return plugins;
        })(),
        resolve: {
            extensions: ['', '.js', '.jsx', '.json', '.styl', '.less']
        },
        module: {
            loaders: [{
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loaders: isProduction ? ['babel'] : ['react-hot', 'babel']
            },
                {
                    test: /\.(eot|ttf|woff)/,
                    loader: 'file'
                },
                {
                    test: /\.svg/,
                    loader: 'url'
                }].concat(styleLoaders(isProduction))
        }
    };
};
