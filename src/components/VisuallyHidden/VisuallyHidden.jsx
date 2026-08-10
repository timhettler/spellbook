import React from 'react';

import './VisuallyHidden.scss';

const VisuallyHidden = ({ children, ...rest }) => {
  return (
    <span {...rest} className="visuallyHidden">
      {children}
    </span>
  );
};

export default VisuallyHidden;
