import React, {Component, PropTypes} from 'react';

export default class Html extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    scripts: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  render() {
    const {
      title,
      url,
      body,
      scripts
      } = this.props;
    return (
      <html>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title ref="title">{ title }</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <meta name="HandheldFriendly" content="True" />
        <link rel="canonical" href={ url } ref="canonical" />
        <link rel="alternate" type="application/rss+xml" title={ title } href={ `${url}/rss` } ref="rss" />
      </head>
      <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: body }}></div>
      {scripts.map((script, index) => <script src={ script } key={ index }></script>)}
      </body>
      </html>
    );
  }
}
