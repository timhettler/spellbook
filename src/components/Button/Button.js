import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import './Button.scss';

class Button extends PureComponent {
  render() {
    const { children, className, ...rest } = this.props;
    return (
      <button className={classNames('button', className)} {...rest}>
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default Button;
