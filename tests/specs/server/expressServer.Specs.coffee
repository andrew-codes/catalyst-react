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
	express.static = sinon.stub()
	compression = sinon.stub()
	logger = sinon.stub()
	app = {
		render: sinon.stub()
	}
	App = sinon.stub().returns app
	cookieParser = sinon.stub()
	bodyParser = {
		urlencoded: sinon.stub(),
		json: sinon.stub()
	}
	csrf = sinon.stub()
	apiMiddleware = sinon.spy()
	requireDir = sinon.stub()
	bluebird = sinon.stub()

	sut = proxy './../../../src/server/expressServer', {
		express: express,
		compression: compression,
		morgan: logger,
		'./App': App,
		'cookie-parser': cookieParser,
		'body-parser': bodyParser,
		csurf: csrf,
		'./middlewares/apiService': apiMiddleware,
		'require-dir': requireDir,
		bluebird: bluebird
	}

	Describe 'creating a server', ->
		compressionOutput = { use: 'compression'}
		loggerOutput = {use: 'logger' }
		jsonOutput = {use: 'json'}
		urlencodedOutput = {use: 'urlencoded'}
		csrfOutput = {use: 'csrf'}
		cookieParserOutput = {use: 'cookieParser'}
		staticAssetSrc = { use: 'static asset src'}
		staticBuildAssetSrc = { use: 'static build asset src'}

		compression.returns compressionOutput
		logger.returns loggerOutput
		bodyParser.json.returns jsonOutput
		bodyParser.urlencoded.withArgs({extended: false} ).returns urlencodedOutput
		cookieParser.returns cookieParserOutput
		csrf.withArgs({cookie: true}).returns csrfOutput
		service1 = sinon.stub
		requireDir.returns {
			'service1': service1
		}
		express.static.withArgs('assets/src').returns staticAssetSrc
		express.static.withArgs('build/src').returns staticBuildAssetSrc

		Given 'a server configuration', ->
			@serverConfig = {
				port: 3000,
				isProduction: false,
				buildAssets: {
					public: 'build/public',
					src: 'build/src'
				} ,
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
		Then 'it should use compression on requests', ->
			server.use.should.have.been.calledWith compressionOutput
		Then 'it should use logger on requests', ->
			server.use.should.have.been.calledWith loggerOutput
		Then 'it should use a cookie parser on requests', ->
			server.use.should.have.been.calledWith cookieParserOutput
		Then 'it should use a json body parser on requests', ->
			server.use.should.have.been.calledWith jsonOutput
		Then 'it should use url encoded from body-parser on requests', ->
			server.use.should.have.been.calledWith urlencodedOutput
		Then 'it should use the csrf on request', ->
			server.use.should.have.been.calledWith csrfOutput
		Then 'it should use the configuration\'s assets public path to server static files from the src path', ->
			server.use.should.have.been.calledWith '/assets/public', staticAssetSrc
		Then 'it should use the configuration\'s assets public path to server static files from the src path', ->
			server.use.should.have.been.calledWith '/build/public', staticBuildAssetSrc
		Then 'it should register API middleware', ->
			apiMiddleware.should.have.been.calledWith server, [service1]
		Then 'it should listen on the configuration port', ->
			server.listen.should.have.been.calledWith @serverConfig.port

	Describe 'running in production environment', ->
		loggerOutput = { production: true}
		Given 'a server configuration for a production environment', ->
			@config = {
				port: 3000,
				isProduction: true,
				buildAssets: {
					public: 'build/public',
					src: 'build/src'
				} ,
				assets: {
					public: 'assets/public',
					src: 'assets/src'
				}
			}
			logger.withArgs('combined').returns loggerOutput
		When 'creating the server', ->
			@actual = sut @config
		Then 'it should call the logger with combined parameter', ->
			server.use.should.have.been.calledWith loggerOutput

	Describe 'running in a development environment', ->
		loggerOutput = {
			production: false
		}
		Given 'a server configuration for a production environment', ->
			@config = {
				port: 3000,
				isProduction: false,
				buildAssets: {
					public: 'build/public',
					src: 'build/src'
				} ,
				assets: {
					public: 'assets/public',
					src: 'assets/src'
				}
			}
			logger.withArgs('dev').returns loggerOutput
		When 'creating the server', ->
			@actual = sut @config
		Then 'it should call the logger with combined parameter', ->
			server.use.should.have.been.calledWith loggerOutput
