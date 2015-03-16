'use strict';

import React from 'react';

export default React.createClass({
	render() {
		let linkStyles = this.props.isProduction &&
			<link
				href={`/assets/bundle/bundle.css?v=${this.props.version}`}
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
				<body dangerouslySetInnerHTML={{__html: this.props.bodyHtml}} />
			</html>
		);
	}
});
