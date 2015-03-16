'use strict';

import React from 'react';
import ReactAddOns from 'react/addons';
let ReactTestUtils = ReactAddOns.addons.TestUtils;
import proxy from 'proxyquire';
import chai from 'chai';
let should = chai.should();

describe('Html Component', function() {
	beforeEach(() => {
		this.Sut = proxy('./../../../src/server/Html', {});
	});
	describe('given props with production set to true', () => {
		beforeEach(() => {
			this.props = {
				isProduction: true,
				version: '0.2.1',
				assets: {
					public: 'public'
				},
				title: 'page title',
				blog: {
					title: 'title',
					url: 'url'
				},
				bodyHtml: '<h1>Hello World</h1>'
			};
		});
		describe('when rendering the component', () => {
			beforeEach(() => {
				this.sut = ReactTestUtils.renderIntoDocument(this.Sut(this.props));
			});
			it('it should render al link to the built styles', () => {
					this.sut.refs.appStyles.getDOMNode().href.should.be.equal(`/assets/bundle/bundle.css?v=${this.props.version}`);
			});
			it('it should render the page title', () => {
				this.sut.refs.title.getDOMNode().innerHTML.should.be.equal(this.props.title);
			});
			it('it should render a canonical link', () => {
				this.sut.refs.canonical.getDOMNode().href.should.be.equal(this.props.blog.url);
			});
			it('it should render a RSS link', () => {
				this.sut.refs.rss.getDOMNode().href.should.be.equal(`${this.props.blog.url}/rss`);
			});
		});
	});
	describe('given props with production set to false', () => {
		beforeEach(() => {
			this.props = {
				isProduction: false,
				version: '0.2.1',
				assets: {
					public: 'public'
				},
				title: 'page title',
				blog: {
					title: 'title',
					url: 'url'
				},
				bodyHtml: '<h1>Hello World</h1>'
			};
		});
		describe('when rendering the component', () => {
			beforeEach(() => {
				this.sut = ReactTestUtils.renderIntoDocument(this.Sut(this.props));
			});
			it('it should not render a link to the built styles', () => {
				should.equal(this.sut.refs.appStyles, undefined);
			});
		});
	});
});
