React = require 'react'
ReactAddOns = require 'react/addons'
ReactTestUtils = ReactAddOns.addons.TestUtils

Describe 'HTML Component', ->
	sut = require './../../../src/server/Html'

	Given 'props with production set to true', ->
		@props = {
			isProduction: true,
			version: '0.2.1',
			assets: {
				public: 'public'
			},
			title: 'page title',
			blog: {
				title: 'title',
				url: 'url'
			},
			bodyHtml: '<h1>Hello World</h1>'
		}
	When 'rendering the HTML component', ->
		@sut = ReactTestUtils.renderIntoDocument sut(@props)
	Then 'it should render a link to the built styles', ->
		@sut.refs.appStyles.getDOMNode().href.should.be.equal '/' + @props.assets.public + '/app.css?v=' + @props.version
	Then 'it should render the page title', ->
		@sut.refs.title.getDOMNode().innerHTML.should.be.equal @props.title
	Then 'it should render a canonical link', ->
		@sut.refs.canonical.getDOMNode().href.should.be.equal @props.blog.url
	Then 'it should render a RSS link', ->
		@sut.refs.rss.getDOMNode().href.should.be.equal @props.blog.url + '/rss'
