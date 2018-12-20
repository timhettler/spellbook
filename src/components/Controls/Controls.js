import React from 'react';
import PropTypes from 'prop-types';

import ResetButton from '../../containers/ResetButton';
import Filter from '../../containers/Filter';
import SubClassFilter from '../../containers/SubClassFilter';
import TextFilter from '../../containers/TextFilter';
import BinaryFilter from '../../containers/BinaryFilter';
import SortingButton from '../../containers/SortingButton';
import VisuallyHidden from '../VisuallyHidden';

import './Controls.scss';

function _getSortIcon(field, sorting) {
  if (field !== sorting.field) {
    return null;
  }

  return sorting.reverse ? '↓' : '↑';
}

function _getAriaLabel(label) {
  return `sort by ${label}`;
}

const Controls = ({ sorting, showSubClassFilter }) => (
  <div className="control-container">
    <div className="control-section">
      <div className="control-item control-item--input">
        <Filter type="classes" label="All Classes" />
      </div>
      <div className="control-item control-item--input">
        <TextFilter type="name" placeholder="Spell Name" />
      </div>
      <div className="control-item control-item--input control-item--reset">
        <ResetButton className="reset-button">
          <span role="presentation">×</span>
          <VisuallyHidden>Reset Filters</VisuallyHidden>
        </ResetButton>
      </div>
    </div>
    <div className="control-section">
      <div className="control-item control-item--input">
        <Filter type="school" label="All Schools" />
      </div>
      {showSubClassFilter && (
        <div className="control-item control-item--input">
          <SubClassFilter />
        </div>
      )}
    </div>
    <div className="control-section">
      <BinaryFilter type="ritual" label="Rituals Only" />
      <BinaryFilter type="concentration" label="Requires Concentration" />
    </div>
    <div className="control-section control-section--full">
      <div className="control-item control-item--sort">
        <SortingButton
          role="presentation"
          field="name"
          aria-label={_getAriaLabel('Name')}
        >
          {_getSortIcon('name', sorting)}
          Name
        </SortingButton>
      </div>
      <div className="control-item control-item--sort control-item--level">
        <SortingButton
          role="presentation"
          field="level"
          aria-label={_getAriaLabel('Level')}
        >
          {_getSortIcon('level', sorting)}
          Level
        </SortingButton>
      </div>
    </div>
  </div>
);

Controls.propTypes = {
  showSubClassFilter: PropTypes.bool,
};

export default Controls;
