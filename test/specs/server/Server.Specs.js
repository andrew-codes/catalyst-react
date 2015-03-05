'use strict';

import sinon from 'sinon';
import proxy from 'proxyquire';

describe('Server', function () {
	beforeEach(() => {
		this.createServerConfig = sinon.stub();

		this.expressServer = sinon.stub();
		this.expectedExpressServer = {
			use: sinon.spy()
		};
		this.expressServer.resolves(this.expectedExpressServer);
		this.apiMiddleware = sinon.stub();
		this.middleware1 = {
			name: sinon.stub(),
			handler: sinon.stub()
		};
		this.middleware2 = {
			name: sinon.stub(),
			handler: sinon.stub()
		};
		this.requireDir = sinon.stub().withArgs('./middlewares').returns({
			'middleware1': this.middleware1,
			'middleware2': this.middleware2
		});
		this.sut = proxy('./../../../src/server/Server', {
			'./createServerConfig': this.createServerConfig,
			'./expressServer': this.expressServer,
			'require-dir': this.requireDir,
			'./middlewares/apiService': this.apiMiddleware
		});
	});

	describe('given a configuration', () => {
		beforeEach(() => {
			this.config = {
				routes: []
			};
			this.serverConfig = {};
			this.createServerConfig.withArgs(this.config).returns(this.serverConfig);
		});

		describe('when starting the server', () => {
			beforeEach(() => {
				this.actual = this.sut(this.config).start();
			});

			it('it should start the express server with the augmented server config', () => {
				this.expressServer.should.have.been.calledWith(this.serverConfig);
			});
			it('it should register each middleware', () => {
				this.actual.then((server) => {
					[this.middleware1, this.middleware2].forEach((middleware) => {
						server.use.should.have.been.calledWith(middleware.route, middleware.handler);
					});
				});
			});
			it('it should eventually return the express server instance', () => {
				this.actual.should.eventually.equal(this.expectedExpressServer);
			});
		});
	});
});
