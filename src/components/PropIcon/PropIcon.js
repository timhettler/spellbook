import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from '../../utilities/uuidv4';
import { ICONS } from '../../constants/icons';

import VisuallyHidden from '../VisuallyHidden';

import './PropIcon.scss';

const label = {
  ritual: 'Can be cast as a ritual',
  concentration: 'Requires concentration',
  cost: 'Has a material cost',
  higher_level: 'Can be cast at a higher level',
};

const PropIcon = props => {
  const [id] = useState(uuidv4());
  const { type } = props;

  return (
    <div className="prop-icon">
      <span aria-hidden={true}>
        <span title={label[type]}>{ICONS[type]}</span>
      </span>
      <VisuallyHidden id={id}>{label[type]}</VisuallyHidden>
    </div>
  );
};

PropIcon.propTypes = {
  type: PropTypes.oneOf(['ritual', 'concentration', 'cost', 'higher_level'])
    .isRequired,
};

export default PropIcon;
