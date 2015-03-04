'use strict';

import proxy from 'proxyquire';
import sinon from 'sinon';
import React from 'react';
import ReactAddOns from 'react/addons';
let ReactTestUtils = ReactAddOns.addons.TestUtils;
import HtmlComponent from './../../../src/server/Html';

describe('App Component', function () {
	beforeEach(() => {
		this.bluebird = sinon.stub();
		this.DocumentTitleComponent = sinon.stub();
		this.body = '<h1>Hello thar</h1>';
		this.state = {
			routes: [{
				name: 'path'
			}]
		};
		this.handler = {
			path: 'path'
		};
		this.react = {
			renderToString: sinon.stub().withArgs(this.handler).returns(this.body),
			renderToStaticMarkup: sinon.stub()
		};
		this.Router = {
			run: (routes, path, fn) => {
				fn(this.handler, this.state);
			}
		};
		this.Sut = proxy('./../../../src/server/App', {
			bluebird: this.bluebird,
			'react-document-title': this.DocumentTitleComponent,
			Html: HtmlComponent,
			react: this.react
		});


		this.status = this.state.routes.some((route) => {
			return route.name.toLowerCase() === 'not-found';
		}) ? 404 : 200;

		this.expectedHtml = 'some html';
		this.react.renderToStaticMarkup.withArgs(this.htmlComponent).returns(this.expectedHtml);

		this.bluebird.resolves({
			html: `<!DOCTYPE html>${this.expectedHtml}`,
			status: this.status
		});
	});
	describe('given server config and an existing route', () => {
		beforeEach(() => {
			this.config = {
				version: '2.1.0',
				isProduction: false,
				assets: {
					public: 'assets/public/path'
				},
				blog: {
					title: 'my title',
					url: 'my url'
				},
				routes: [{
					name: 'path'
				}]
			};
			this.htmlComponent = React.createFactory(HtmlComponent)({
				isProduction: this.config.isProduction,
				version: this.config.version,
				assets: this.config.assets,
				blog: this.config.blog,
				bodyHtml: this.body
			});
			this.sut = new this.Sut(this.config);
		});
		describe('when rendering the component', () => {
			beforeEach(() => {
				this.actual = this.sut.render('/existing/path');
			});
			it('it should eventually resolve to the rendered route\'s HTML and status', () => {
				this.actual.should.eventually.be.deep.equal({
					html: `<!DOCTYPE html>${this.expectedHtml}`,
					status: 200
				});
			});
		});
	});
	describe('given config and a route that does not exists', () => {
		beforeEach(() => {
			this.config = {
				version: '2.1.0',
				isProduction: false,
				assets: {
					public: 'assets/public/path'
				},
				blog: {
					title: 'my title',
					url: 'my url'
				},
				routes: [{
					name: 'path'
				}]
			};
			this.state.routes = [{name: 'not-found'}];
		});
		describe('when rendering the component', () => {
			beforeEach(() => {
				this.actual = this.sut.render('/i/dont/exist');
			});
			it('it should eventually resolve with a status of 404', () => {
				this.actual.should.eventually.be.deep.equal({
					html: '',
					status: 404
				});
			});
		});
	});
});
