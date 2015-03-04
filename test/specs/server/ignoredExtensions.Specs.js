'use strict';

import proxy from 'proxyquire';

describe('ignoredExtensions', function () {
	beforeEach(() => {
		this.expectedExtensions = ['css', 'less', 'sass', 'scss', 'styl'];
	});

	describe('when requiring the extensions to ignore from a production build via webpack', () => {
		beforeEach(() => {
			this.sut = proxy('./../../../src/server/ignoredExtensions', {});
		});
		it('it should only contain the expected extensions to be ignored', () => {
			this.sut.extensions.should.have.members(this.expectedExtensions);
		});
		it('it should contain a regular expression matching the returned extensions', () => {
			this.expectedExtensions.forEach((ext) => {
				this.sut.extensionsRegExp.test(`index.${ext}`).should.be.equal(true);
			});
		});
		it('it should return a frozen object', () => {
			(() => {
				this.sut.extensions = [];
			}).should.throw();
		});
	});
});
