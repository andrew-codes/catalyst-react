sinon = require 'sinon'
proxy = require 'proxyquire'

Describe 'createServerConfig', ->
	pkg = {
		version: '0.0.1'
	}
	ignoredExtensions = {
		extensionsRegExp: /some-reg-expresion/
	}
	sut = proxy './../../../src/server/createServerConfig', {
			'./../../package.json': pkg,
			'./ignoredExtensions': ignoredExtensions
		}

	Describe 'creating server config', ->
		Given 'an empty user-defined configuration', ->
			@userConfig = {}
		When 'creating the configuration for the server', ->
			@actual = sut @userConfig
		Then 'it should return a configuration with the version', ->
			@actual.version.should.be.equal pkg.version
		Then 'it should return a frozen configuraton object', ->
			@actual.version = '1'
			@actual.version.should.not.be.equal '1'


	Describe 'creating server config with a provided user-defined configuration', ->
		Given 'a user-defined configuration', ->
			@userConfig = {}
		And 'user configuration contains assets object', ->
			@userConfig.assets = {
					public: 'my-assets/path'
					src: 'my-assets/'
				}
		And 'user configuration contains buildAssets object', ->
			@userConfig.buildAssets = {
				public: 'build',
				src: 'build'
			}
		When 'creating the configuration for the server', ->
			@actual = sut @userConfig
		Then 'it should return a configuration containing the user-defined configuration for assets', ->
			@actual.assets.should.be.equal @userConfig.assets
		Then 'it should return a configuration containing the user-defined configuration for buildAssets', ->
			@actual.buildAssets.should.be.equal @userConfig.buildAssets

	Describe 'creating server config with a user-defined configuration containing non-overridable properties', ->
		Given 'a user-defined configuration', ->
			@userConfig = {}
		And 'user configuration contains non-overridable properties', ->
			@userConfig.version = '2.0.0'
			@userConfig.isProduction = 'it is production'
			@userConfig.port = 4309
			@userConfig.piping = {
				ignore: ['all','of','these'],
				hook: false
			}
		When 'creating the configuration for the server', ->
			@actual = sut @userConfig
		Then 'it should not override the non-overridable properies', ->
			@actual.version.should.not.be.equal @userConfig.version
			@actual.isProduction.should.not.be.equal @userConfig.isProduction
			@actual.port.should.not.be.equal @userConfig.port
			@actual.piping.should.not.be.equal @userConfig.piping
