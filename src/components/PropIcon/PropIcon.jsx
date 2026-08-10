import React from 'react';
import { ICONS } from 'constants/icons';

import VisuallyHidden from 'components/VisuallyHidden';

import './PropIcon.scss';

const label = {
  ritual: 'Can be cast as a ritual',
  concentration: 'Requires concentration',
  cost: 'Has a material cost',
  higher_level: 'Can be cast at a higher level',
  favorites: 'A favorite spell',
};

const PropIcon = ({ type, hideLabel }) => {
  return (
    <div className="prop-icon">
      <span aria-hidden={true}>
        <span title={hideLabel ? label[type] : null}>{ICONS[type]}</span>
      </span>
      {hideLabel && <VisuallyHidden>{label[type]}</VisuallyHidden>}
    </div>
  );
};

export default PropIcon;
