'use strict';

import proxy from 'proxyquire';
import sinon from 'sinon';

describe('cacheStore', function () {
	beforeEach(() => {
		this.path = sinon.stub();
	});
	describe('given a url path', () => {
		beforeEach(() => {
			this.urlPath = '/url/path';
		});
		describe('when requesting the contents of the cache for the path', () => {
			beforeEach(() => {
				this.expected = 'transformed content';
				this.transform2 = {
					isAMatch: sinon.stub().returns(true),
					transform: sinon.stub().withArgs(this.urlPath).returns(this.expected)
				};
				this.transform3 = {
					isAMatch: sinon.stub().returns(true),
					transform: sinon.spy()
				};
				this.requireDir = sinon.stub()
					.withArgs('./cacheTransforms')
					.returns({
						'transform1': {
							isAMatch: sinon.stub().returns(false)
						},
						'transform2': this.transform2,
						'transform3': this.transform3
					});
				this.sut = proxy('./../../../../src/server/staticCache/cacheStore', {
					'require-dir': this.requireDir
				});
				this.actual = this.sut(this.urlPath);
			});
			it('it should return the first cache transform matching the provided url path', () => {
				this.transform3.transform.should.not.have.been.called;
				this.actual.should.be.equal(this.expected);
			});
		});
	});
});
