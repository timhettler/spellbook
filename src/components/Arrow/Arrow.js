import React from 'react';

export default function Arrow(props) {
  let ascending = props.sortDir === 'ascending';
  return (
    <svg viewBox="0 0 100 200" width="100" height="200">
      {!(!ascending && props.isCurrent) && (
        <polyline points="20 50, 50 20, 80 50" />
      )}
      <line x1="50" y1="20" x2="50" y2="180" />
      {!(ascending && props.isCurrent) && (
        <polyline points="20 150, 50 180, 80 150" />
      )}
    </svg>
  );
}
