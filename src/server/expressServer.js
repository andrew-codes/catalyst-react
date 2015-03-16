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
import path from 'path';
import Cookies from 'cookies';
import uuid from 'uuid';

export default (config) => {
    const server = express();

    server.use(compression());
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
    server.use('/assets', express.static(path.join(__dirname, './../../blog/assets')));
    let app = new App(config);
    server.use((req, res) => {
        let cookies = new Cookies(req, res);
        let token = cookies.get('token') || uuid();
        cookies.set('token', token, {maxAge: 30 * 24 * 60 * 60});
        app.render(req.path, token)
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
        console.log(`App started on port ${config.port}`);
    });
    return Promise.resolve({
        server, config
    });
};
