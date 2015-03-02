proxy = require 'proxyquire'

Describe 'ignoredExtensions', ->
	sut = require './../../../src/server/ignoredExtensions'
	expectedExtensions = ['css', 'less', 'sass', 'scss', 'styl']

	When 'getting the extensions to ignore from production build via webpack', ->

	Then 'it should only contain the expected extensions', ->
		sut.extensions.should.have.members expectedExtensions
		(sut.extensions.length == 5).should.be.true
	Then 'it should contain a regular expression matching the returned extensions', ->
		expectedExtensions.forEach (ext) ->
				sut.extensionsRegExp.test('index.' + ext).should.be.true
	Then 'it should return a frozen object', ->
		sut.extensions = []
		sut.extensions.should.have.members expectedExtensions
		(sut.extensions.length == 5).should.be.true
