'use strict';

import proxy from 'proxyquire';
import sinon from 'sinon';

describe('stylus middleware', function () {
	beforeEach(() => {
		this.cacheStore = sinon.stub();
	});

	describe('when requiring the middleware', () => {
		beforeEach(() => {
			this.sut = proxy('./../../../../src/server/middlewares/stylus', {});
		});
		it('it should return a frozen object', () => {
			(() => {
				this.sut.route = 'me';
			}).should.throw();
		});
	});

	describe('when getting its route', () => {
		beforeEach(() => {
			this.sut = proxy('./../../../../src/server/middlewares/stylus', {});
			this.actual = this.sut.route;
		});
		it('it should be a route matching any file with a stylus (.styl) extension', () => {
			this.actual.should.be.equal('/**/*.styl');
		});
	});
	describe('given a server\'s request and response for a stylus file', () => {
		beforeEach(() => {
			this.request = {
				url: 'path/to/stylus/file'
			};
			this.response = {};
			this.response.set = sinon.stub().returns(this.response);
			this.response.status = sinon.stub().returns(this.response);
			this.response.send = sinon.stub().returns(this.response);
		});
		describe('given the stylus has not already been translated to css', () => {
			beforeEach(() => {
				this.expectedCss = 'some css';
				this.cacheStore = sinon.stub().withArgs('/path/to/stylus/file').returns(this.expectedCss);
			});
			describe('when executing the middleware', () => {
				beforeEach(() => {
					this.sut = proxy('./../../../../src/server/middlewares/stylus', {
						'./../staticCache/cacheStore': this.cacheStore
					});
					this.sut.execute(this.request, this.response);
				});
				it('it should transpile the stylus to css to send as the response', () => {
					this.response.set.should.have.been.calledWith('content-type', 'text/css');
					this.response.status.should.have.been.calledWith(200);
					this.response.send.should.have.been.calledWith(this.expectedCss);
				});
			});
		});
	});
});
