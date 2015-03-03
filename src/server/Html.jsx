'use strict';

import React from 'react';

export default React.createClass({
	render() {
		// Only for production. For dev, it's handled by webpack with livereload.
		let linkStyles = this.props.isProduction &&
			<link
				href={`/${this.props.assets.public}/app.css?v=${this.props.version}`}
				rel="stylesheet"
				ref="appStyles"
			/>;

		return (
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<title ref="title">{this.props.title}</title>
					{linkStyles}
					<meta name="viewport" content="width=device-width, user-scalable=no" />
					<meta name="HandheldFriendly" content="True" />
					<link rel="canonical" href={ this.props.blog.url } ref="canonical" />
					<link rel="alternate" type="application/rss+xml" title={ this.props.blog.title } href={ this.props.blog.url + '/rss' } ref="rss" />
				</head>
				<body dangerouslySetInnerHTML={{__html: this.props.bodyHtml}} ref="bodyEl" />
			</html>
		);
	}
});
