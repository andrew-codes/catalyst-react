'use strict';

import proxy from 'proxyquire';
import sinon from 'sinon';

describe('stylus middleware', function () {
	beforeEach(() => {
		this.sut = proxy('./../../../../src/server/middlewares/stylus', {});
	});

	describe('when requiring the middleware', () => {
		it('it should return a frozen object', () => {
			(() => {
				this.sut.route = 'me';
			}).should.throw();
		});
	});

	describe('when getting its route', () => {
		beforeEach(() => {
			this.actual = this.sut.route;
		});
		it('it should be a route matching any file with a stylus (.styl) extension', () => {
			this.actual.should.be.equal('/**/*.styl');
		});
	});
});
