'use strict';

import proxy from 'proxyquire';
import sinon from 'sinon';

describe('createServerConfig', function () {
	beforeEach(() => {
		this.pkg = {
			version: '1.0.0'
		};
		this.ignoredExtensions = {
			extensionsRegExp: /some-reg-expression/
		};
		this.sut = proxy('./../../../src/server/createServerConfig', {
			'./../../package.json': this.pkg,
			'./ignoredExtensions': this.ignoredExtensions
		});
	});
	describe('given an empty user-defined configuration', () => {
		beforeEach(() => {
			this.userConfig = {};
		});
		describe('when creating the configuration for the server', () => {
			beforeEach(() => {
				this.actual = this.sut(this.userConfig);
			});
			it('it should return a configuration with the version', () => {
				this.actual.version.should.be.equal(this.pkg.version);
			});
			it('it should return a frozen configuration object', () => {
				(() => {
					this.actual.version = 1;
				}).should.throw();
			});
		});
	});

	describe('given a user config with assets and buildAssets defined', () => {
		beforeEach(() => {
			this.userConfig = {
				assets: {
					public: 'assets/public',
					src: 'assets/src'
				},
				buildAssets: {
					public: 'build/public',
					src: 'build/src'
				}
			};
		});
		describe('when creating the configuration for the server', () => {
			beforeEach(() => {
				this.actual = this.sut(this.userConfig);
			});
			it('it should return a configuration containing the user-defined configuration for assets', () => {
				this.actual.assets.should.be.equal(this.userConfig.assets);
			});
			it('it should return a configuration containing the user-defined configuration for buildAssets', () => {
				this.actual.buildAssets.should.be.equal(this.userConfig.buildAssets);
			});
		});
	});

	describe('given user configuration that contains non-overridable properties', () => {
		beforeEach(() => {
			this.userConfig = {
				version: '1',
				isProduction: 'production time',
				port: 'my port',
				piping: {
					ignore: ['all', 'the', 'things'],
					hook: false
				}
			};
		});
		describe('when creating this configuration for the server', () => {
			beforeEach(() => {
				this.actual = this.sut(this.userConfig);
			});
			it('it should not override the non-overridable properties', () => {
				this.actual.version.should.not.be.equal(this.userConfig.version);
				this.actual.isProduction.should.not.be.equal(this.userConfig.isProduction);
				this.actual.port.should.not.be.equal(this.userConfig.port);
				this.actual.piping.should.not.be.equal(this.userConfig.piping);
			});
		});
	});
});
