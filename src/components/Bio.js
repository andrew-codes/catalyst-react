import React, {Component, PropTypes} from 'react';

export default class Bio extends Component {
  static propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string
  };

  render() {
    const {
      firstName,
      lastName
      } = this.props;
    return (
      <div><h1>{firstName} {lastName} is Awesome!</h1></div>
    );
  }
}
