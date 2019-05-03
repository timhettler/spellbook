import React from 'react';
import PropTypes from 'prop-types';

import ResetButton from '../../containers/ResetButton';
import Filter from '../../containers/Filter';
import SubClassFilter from '../../containers/SubClassFilter';
import TextFilter from '../../containers/TextFilter';
import BinaryFilter from '../../containers/BinaryFilter';
import SortingButton from '../../containers/SortingButton';
import VisuallyHidden from '../VisuallyHidden';
import getIcon from '../../utilities/getIcon';

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
        <Filter type="classes" label="Class Filter" allLabel="All Classes" />
      </div>
      <div className="control-item control-item--input">
        <TextFilter
          type="name"
          label="Search by Spell Name"
          placeholder="Spell Name"
        />
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
        <Filter type="school" label="School Filter" allLabel="All Schools" />
      </div>
      {showSubClassFilter && (
        <div className="control-item control-item--input">
          <SubClassFilter />
        </div>
      )}
    </div>
    <div className="control-section">
      <BinaryFilter
        type="ritual"
        label={getIcon['ritual']}
        title="Rituals Only"
      />
      <BinaryFilter
        type="concentration"
        label={getIcon['concentration']}
        title="Concentraton Only"
      />
      <BinaryFilter
        type="cost"
        label={getIcon['cost']}
        title="Material Cost Only"
      />
      <BinaryFilter
        type="favorites"
        label={getIcon['favorites']}
        title="Favorites Only"
      />
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
