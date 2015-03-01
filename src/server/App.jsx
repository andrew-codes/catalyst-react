'use strict';

import DocumentTitle from 'react-document-title';
import Html from './Html';
import Promise from 'bluebird';
import React from 'react';
import Router from 'react-router';

function renderRoute (Handler, config) {
	// Here we can add some fixtures initial app data and state for client.
	let data = {};
	// Set app state here. Isomorphic rendering is safe when stores are stateless.
	let appHtml = React.renderToString(<Handler />);
	let appScriptSrc = config.isProduction ? `/${config.buildAssets.public}/app.js?v=` + config.version : `http://localhost:8888/${config.buildAssets.public}/app.js`;
	let scriptsHtml = `
		<script src="${appScriptSrc}"></script>
		<script>blogApp(${JSON.stringify(data)}, ${JSON.stringify(config.routes)})</script>
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
		assets = {
			config.assets.public
		}
		blog = {
			config.blog
		} />);
	return `<!DOCTYPE html>${htmlBody}`;
}

export default class {
	constructor(config){
		this.config = config;
	}
	render(path, config) {
		return new Promise((resolve) => {
			Router.run(this.config.routes, path, (Handler, state) => {
				let html = renderRoute(Handler, config);
				let isNotFound = state.routes.some(route => route.name.toLowerCase() === 'not-found');
				resolve({
					html: html,
					status: isNotFound ? 404 : 200
				});
			});
		});
	}
}
