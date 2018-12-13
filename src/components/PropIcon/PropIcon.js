import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from '../../utilities/uuidv4';

import VisuallyHidden from '../VisuallyHidden';

import './PropIcon.scss';

const icon = {
  ritual: '🕯',
  concentration: '🌀',
  cost: '💰',
};

const label = {
  ritual: 'Can be cast as a ritual',
  concentration: 'Requires concentration',
  cost: 'Has a material cost',
};

export default function PropIcon({ type }) {
  const id = uuidv4();

  if (!type) {
    return null;
  }

  return (
    <div className="prop-icon">
      <span role="img" title={label[type]} aria-hidden={true}>
        {icon[type]}
      </span>
      <VisuallyHidden id={id}>{label[type]}</VisuallyHidden>
    </div>
  );
}

PropIcon.propTypes = {
  type: PropTypes.oneOf(['ritual', 'concentration', 'cost']).isRequired,
};
