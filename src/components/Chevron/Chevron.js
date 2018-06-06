import React from 'react';

export default function Chevron(props) {
  return (
    <svg viewBox="0 0 14 8" {...props}>
      <polyline points="0,1 6,7 7,8 8,7 14,1 13,0 7,6 1,0 " />
    </svg>
  );
}
