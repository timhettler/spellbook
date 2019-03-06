import React, { PureComponent } from 'react';

export default class Chevron extends PureComponent {
  render() {
    return (
      <svg viewBox="0 0 14 8" {...this.props}>
        <polyline points="0,1 6,7 7,8 8,7 14,1 13,0 7,6 1,0 " />
      </svg>
    );
  }
}
