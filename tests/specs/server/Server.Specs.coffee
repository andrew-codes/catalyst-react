sinon = require 'sinon'
proxy = require 'proxyquire'

Describe 'Server', ->
	createServerConfig = sinon.stub()
	expressServer = sinon.stub()
	expectedExpressServer = sinon.stub()
	mocks = {
		'./createServerConfig': createServerConfig
		'./expressServer': expressServer,
		'express': expectedExpressServer
	}
	expressServer.resolves(expectedExpressServer)
	sut = proxy './../../../src/server/Server', mocks

	Given 'a configuration', ->
		@config = { routes: []}
		@serverConfig = {}
		createServerConfig.withArgs(@config).returns(@serverConfig)
	When 'starting the server', ->
		@actual = sut(@config).start()
	Then 'it should start the express server with the augmented server config', ->
		expressServer.should.have.been.calledWith(@serverConfig)
	Then 'it should return the express server instance', ->
		@actual.should.eventually.equal(expectedExpressServer)
