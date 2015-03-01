'use strict';

import compression from 'compression';
import express from 'express';
// import favicon from 'serve-favicon'
import App from './App';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import csrf from 'csurf';
import Promise from 'bluebird';
import Api from './Api';
import requireDir from 'require-dir';
import forOf from './../lib/forOf';
let apis = requireDir('./api');

export default (config) => {
	return new Promise((resolve) => {
		const server = express();

		server.use(compression());
		server.set('state namespace', 'Blog');
		server.use(logger(config.isProduction ? 'combined' : 'dev'));
		server.use(cookieParser());
		server.use(bodyParser.json());
		server.use(bodyParser.urlencoded({
			extended: false
		}));
		server.use(csrf({
			cookie: true
		}));

		// server.use(favicon('assets/img/favicon.ico'));
		server.use(`/${config.buildAssets.public}`, express.static(config.buildAssets.src));
		server.use(`/${config.assets.public}`, express.static(config.assets.src));

		let handleApi = (req, res) => {
			Api(req)
				.execute()
				.then(function (apiResponse) {
					res
						.contentType('application/json')
						.status(apiResponse.isError ? 500 : 200)
						.send(apiResponse);
				});
		};

		for (let {
				value
			}
			of forOf(apis)) {
			server.use(value.route(), handleApi);
		}


		server.use((req, res) => {
			App.render(req.path, config)
				.then((result) => {
					res.status(result.status)
						.send(result.html);
				})
				.catch((error) => {
					const msg = error.stack || error;
					console.log(msg);
					res.status(500)
						.send('500: ' + msg);
				});
		});

		server.listen(config.port, function () {
			resolve({server, config});
		});
		console.log(`App started on port ${config.port}`);
	});
};
