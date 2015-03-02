proxy = require 'proxyquire'
sinon = require 'sinon'

Describe 'expressServer', ->
	server = {
		use: sinon.spy(),
		set: sinon.spy(),
		listen: sinon.spy()
	}
	express = sinon.stub()
	express.returns server
	express.static = sinon.spy()
	compression = sinon.spy()
	logger = sinon.spy()
	app = {
		render: sinon.stub()
	}
	cookieParser = sinon.spy()
	bodyParser = {
		urlencoded: sinon.spy(),
		json: sinon.spy()
	}
	csrf = sinon.spy()
	apiMiddleware = sinon.spy()
	requireDir = sinon.stub()
	bluebird = sinon.stub()

	requireDir.returns {
		'service1': sinon.spy()
	}

	sut = proxy './../../../src/server/expressServer', {
		'express': express,
		'compression': compression,
		'morgan': logger,
		'./App', app,
		'cookie-parser': cookieParser,
		'body-parser': bodyParser,
		'csurf': csrf,
		'./middlewares/apiService': apiMiddleware,
		'require-dir': requireDir,
		'bluebird': bluebird
		}

	Given 'a server configuration', ->
		@serverConfig = {
			port: 3000,
			isProduction: false,
			buildAssets: {
				public: 'build/public',
				src: 'build/src'
			},
			assets: {
				public: 'assets/public',
				src: 'assets/src'
			}
		}

		bluebird.resolves {
			server: server,
			config: @serverConfig
		}
	When 'creating the server', ->
		@actual = sut @serverConfig
	Then 'it should eventually resolve to the express server instance', ->
		@actual.should.eventually.be.deep.equal {
			server: server,
			config: @serverConfig
		}
