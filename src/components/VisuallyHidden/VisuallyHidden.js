// @flow

import React from 'react';
import type { Node } from 'react';

import './VisuallyHidden.scss';

type Props = {
  children?: Node,
};

const VisuallyHidden = ({ children, ...rest }: Props) => {
  return (
    <span {...rest} className="visuallyHidden">
      {children}
    </span>
  );
};

export default VisuallyHidden;
