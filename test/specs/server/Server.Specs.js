'use strict';

import sinon from 'sinon';
import proxy from 'proxyquire';

describe('Server', function () {
	beforeEach(() => {
		this.createServerConfig = sinon.stub();

		this.expressServer = sinon.stub();
		this.expectedExpressServer = sinon.stub();
		this.expressServer.resolves(this.expectedExpressServer);
		this.apiMiddleware = sinon.stub();
		this.service1 = sinon.spy();
		this.requireDir = sinon.stub().withArgs('./services').returns({
			'service1': this.service1
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
			it('it should register the API middleware', () => {
				this.actual.then((server) => {
					this.apiMiddleware.should.have.been.calledWith(server, [this.service1]);
				});
			});
			it('it should eventually return the express server instance', () => {
				this.actual.should.eventually.equal(this.expectedExpressServer);
			});
		});
	});
});
