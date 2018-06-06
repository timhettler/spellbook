import React from 'react';
import PropTypes from 'prop-types';

import './VisuallyHidden.css';

export default function VisuallyHidden(props) {
  return <span className="visuallyHidden">{props.children}</span>;
}

VisuallyHidden.propTypes = {
  children: PropTypes.node.isRequired,
};
