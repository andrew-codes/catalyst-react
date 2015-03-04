proxy = require 'proxyquire'
sinon = require 'sinon'
react = require 'react'
ReactAddOns = require 'react/addons'
ReactTestUtils = ReactAddOns.addons.TestUtils
TestLocation = require 'react-router/lib/locations/TestLocation'
HtmlComponent = require './../../../src/server/Html'

Describe 'App Component', ->
	bluebird = sinon.stub()
	DocumentTitleComponent = sinon.stub()
	body = '<h1>Hello World</h1>'
	state = {
		routes: [{
			name: 'path'
			} ]
	}
	React = {
		renderToString: sinon.stub(),
		renderToStaticMarkup: sinon.stub()
	}
	handler = { path: 'path' }
	Router = {
		HistoryLocation: TestLocation,
		run: (routes, path, fn) ->
			fn handler, state
	}
	Sut = proxy './../../../src/server/App', {
		bluebird: bluebird,
		'react-document-title': DocumentTitleComponent,
		Html: HtmlComponent,
		react: React
	}

	Describe 'rendering an existing route', ->
		React.renderToString.withArgs(handler).returns body
		htmlFactory = react.createFactory HtmlComponent

		Given 'a server configuration', ->
			@config = {
				version: '2.1.0',
				isProduction: false,
				assets: {
					public: 'assets/public/path'
				}
				blog: {
					title: 'my title',
					url: 'my url'
				} ,
				routes: [
					{
						name: 'path'
					}
				]
			}

			htmlComponent = htmlFactory {
				isProduction: @config.isProduction,
				version: @config.version,
				assets: @config.assets,
				blog: @config.blog,
				bodyHtml: body
			}

			isNotFound = @config.routes.some (route) ->
				route.name.toLowerCase() == 'not-found'
			if (isNotFound)
				@status = 404
			else
				@status = 200

			@expectedHtml = 'hiya'
			React.renderToStaticMarkup.withArgs(htmlComponent).returns @expectedHtml
			bluebird.resolves {
				html: '<!DOCTYPE html>' + @expectedHtml
				status: @status
			}

			@sut = new Sut @config
		And 'the a URL path that exists', ->
			@path = '/path'
		When 'rendering the component', ->
			@actual = @sut.render @path
		Then 'it should eventually resolve the rendered route\'s HTML and status', ->
			@actual.should.eventually.be.deep.equal {
				html: 	'<!DOCTYPE html>' + @expectedHtml,
				status: @status
			}
