import React, {Component, PropTypes} from 'react';
import Bio from './../../../components/Bio';

export default class BioContainer extends Component {
  static propTypes = {
    author: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string
    })
  };

  render() {
    const {
      author
      } = this.props;
    return (
      <Bio {...author} />
    );
  }
}
