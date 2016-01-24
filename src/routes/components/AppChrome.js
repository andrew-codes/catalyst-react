import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class AppChrome extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const {
      children
      } = this.props;
    return (
      <div>
        <Link to="bio">About Me</Link>
        {children}
      </div>
    );
  }
}
