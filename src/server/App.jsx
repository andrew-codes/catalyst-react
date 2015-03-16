'use strict';

import DocumentTitle from 'react-document-title';
import Html from './Html';
import Promise from 'bluebird';
import React from 'react';
import Router from 'react-router';
import Routes from './../../blog/Routes'

function renderRoute (Handler, config) {
	let data = {};
	let appHtml = React.renderToString(<Handler />);
	let appScriptSrc = config.isProduction ? `/${config.assets.public}/bundle/bundle.js?v=` + config.version : `http://localhost:8888/${config.assets.public}/bundle/bundle.js`;
	let scriptsHtml = `
		<script src="${appScriptSrc}"></script>
		<script>
		    var window.__app_state__ = JSON.parse(${JSON.stringify(data)});
		    blogApp();
		</script>
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

export default class App {
	constructor(config){
		this.config = config;
	}

	render(path) {
		return new Promise((resolve) => {
			Router.run(Routes, path, (Handler, state) => {
				let html = renderRoute(Handler, this.config);
				let isNotFound = state.routes.some(route => route.name.toLowerCase() === 'not-found');
				resolve({
					html: html,
					status: isNotFound ? 404 : 200
				});
			});
		});
	}
}
