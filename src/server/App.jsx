'use strict';

import DocumentTitle from 'react-document-title';
import Html from './Html';
import Promise from 'bluebird';
import React from 'react';
import Router from 'react-router';
import {getRoutes} from './../../blog/Routes';
import fetchData from './../lib/fetchData';
import {cleanCache} from './../lib/cache';

function renderRoute(Handler, config, token, data) {
    let appHtml = React.renderToString(<Handler data={data} />);
    let appScriptSrc = config.isProduction ? `/assets/bundle/bundle.js?v=` + config.version : `http://localhost:8888/assets/bundle/bundle.js`;
    let clientHandOff = {token, data: cleanCache(token)};
    let scriptsHtml = `
		<script>
		    window.__DATA__ = JSON.parse(${JSON.stringify(clientHandOff)});
		</script>
		<script src="${appScriptSrc}"></script>
	`;
    let bodyHtml = appHtml + scriptsHtml;
    let title = DocumentTitle.rewind();
    let htmlBody = React.renderToStaticMarkup(<Html bodyHtml={
        bodyHtml
        }
        isProduction = {
            config.isProduction
            }
        title = {
            title
            }
        version = {
            config.version
            }
        blog = {
            config.blog
            } />);
    return `<!DOCTYPE html>${htmlBody}`;
}

export default
class App {
    constructor(config) {
        this.config = config;
    }

    render(path, token) {
        return new Promise((resolve, reject) => {
            let router = Router.create({
                routes: getRoutes(token),
                location: path,
                onAbort: function (redirect) {
                    resolve({redirect});
                },
                onError: function (err) {
                    console.log(err);
                    reject(err);
                }
            });
            router.run((Handler, state) => {
                if (state.routes[0].name === 'not-found') {
                    var html = React.renderToStaticMarkup(<Handler/>);
                    resolve({status: 404, html});
                    return;
                }
                fetchData(token, state).then((data) => {
                    let html = renderRoute(Handler, this.config, token, data);
                    resolve({
                        html: html,
                        status: 200
                    });
                });

            });
        });
    }
}
