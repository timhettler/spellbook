import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from '../../utilities/uuidv4';

import './PropIcon.scss';

export default function PropIcon({ type }) {
  let id;

  switch (type) {
    case 'ritual':
      id = uuidv4();
      return (
        <div className="prop-icon">
          <span role="img" aria-labelledby={id}>
            🕯
          </span>
          <span id={id} className="visuallyHidden">
            ritual
          </span>
        </div>
      );
    case 'concentration':
      id = uuidv4();
      return (
        <div className="prop-icon">
          <span role="img" aria-labelledby={id}>
            🌀
          </span>
          <span id={id} className="visuallyHidden">
            concentration
          </span>
        </div>
      );
    default:
      return null;
  }
}

PropIcon.propTypes = {
  type: PropTypes.oneOf(['ritual', 'concentration']).isRequired,
};
