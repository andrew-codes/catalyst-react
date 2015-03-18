'use strict';

import proxy from 'proxyquire';
import sinon from 'sinon';
import path from 'path';

describe('expressServer', function () {
	beforeEach(() => {
		this.server = {
			use: sinon.spy(),
			set: sinon.spy(),
			listen: sinon.spy()
		};
		this.express = sinon.stub().returns(this.server);
		this.express.static = sinon.stub();
		this.compression = sinon.stub();
		this.logger = sinon.stub();
		this.app = {
			render: sinon.stub()
		};
		this.App = sinon.stub().returns(this.app);
		this.cookieParser = sinon.stub();
		this.bodyParser = {
			urlencoded: sinon.stub(),
			json: sinon.stub()
		};
		this.csrf = sinon.stub();
		this.bluebird = sinon.stub();

		this.sut = proxy('./../../../src/server/expressServer', {
			'express': this.express,
			'compression': this.compression,
			'morgan': this.logger,
			'./App': this.App,
			'cookie-parser': this.cookieParser,
			'body-parser': this.bodyParser,
			'csurf': this.csrf,
			'bluebird': this.bluebird
		});

		this.compressionOutput = {
			use: 'compression'
		};
		this.loggerOutput = {
			use: 'logger'
		};
		this.devLoggerOutput = {
			use: 'dev logger'
		};
		this.jsonOutput = {
			use: 'json'
		};
		this.urlencodedOutput = {
			use: 'urlencoded'
		};
		this.csrfOutput = {
			use: 'csrf'
		};
		this.cookieParserOutput = {
			use: 'cookieParser'
		};
		this.staticAssets = {
			use: 'static asset src'
		};

		this.bluebird.resolves({
			server: this.server,
			config: this.serverConfig
		});
		this.compression.returns(this.compressionOutput);
		this.logger.withArgs('combined').returns(this.loggerOutput)
		.withArgs('dev').returns(this.devLoggerOutput);
		this.bodyParser.json.returns(this.jsonOutput);
		this.bodyParser.urlencoded.withArgs({
			extended: false
		}).returns(this.urlencodedOutput);
		this.cookieParser.returns(this.cookieParserOutput);
		this.csrf.withArgs({
			cookie: true
		}).returns(this.csrfOutput);
		this.express.static.withArgs(path.join(__dirname, './../../../blog/assets')).returns(this.staticAssets);
	});
	describe('given a server configuration', () => {
		beforeEach(() => {
			this.serverConfig = {
				port: 3000,
				isProduction: false,
                dataServices: {}
			};
		});
		describe('when creating the server', () => {
			beforeEach(() => {
				this.actual = this.sut(this.serverConfig);
			});
			it('it should use compression on requests', () => {
				this.server.use.should.have.been.calledWith(this.compressionOutput);
			});
			it('it should use logger on requests', () => {
				this.server.use.should.have.been.calledWith(this.devLoggerOutput);
			});
			it('it should use cookie on requests', () => {
				this.server.use.should.have.been.calledWith(this.cookieParserOutput);
			});
			it('it should use json body parser on requests', () => {
				this.server.use.should.have.been.calledWith(this.jsonOutput);
			});
			it('it should use url encoder body parser on requests', () => {
				this.server.use.should.have.been.calledWith(this.urlencodedOutput);
			});
			//it('it should use csrf on post requests', () => {
			//	this.server.use.should.have.been.calledWith(this.csrfOutput);
			//});
			it('it should listen on the configuration port', () => {
				this.server.listen.should.have.been.calledWith(this.serverConfig.port);
			});
            it('should serve static assets from the correct directory', () => {
                this.server.use.should.have.been.calledWith('/assets', this.staticAssets)
            });
		});
	});
	describe('given a server configuration for a production environment', () => {
		beforeEach(() => {
			this.serverConfig = {
				port: 3000,
				isProduction: true,
                dataServices: {}
			};
		});
		describe('when creating the server', () => {
			beforeEach(() => {
				this.actual = this.sut(this.serverConfig);
			});
			it('it should use logger called with combined parameter on requests', () => {
				this.server.use.should.have.been.calledWith(this.loggerOutput);
			});
		});
	});
});
