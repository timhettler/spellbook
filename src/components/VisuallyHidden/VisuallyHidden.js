import React from 'react';
import PropTypes from 'prop-types';

import './VisuallyHidden.scss';

const VisuallyHidden = ({ children, ...rest }) => {
  return (
    <span className="visuallyHidden" {...rest}>
      {children}
    </span>
  );
};

VisuallyHidden.propTypes = {
  children: PropTypes.node.isRequired,
};

export default VisuallyHidden;
