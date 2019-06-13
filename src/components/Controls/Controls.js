import React from 'react';
import PropTypes from 'prop-types';

import ResetButton from '../../containers/ResetButton';
import Filter from '../../containers/Filter';
import SubClassFilter from '../../containers/SubClassFilter';
import TextFilter from '../../containers/TextFilter';
import BinaryFilter from '../../containers/BinaryFilter';
import SortingButton from '../../containers/SortingButton';
import SchoolFilter from '../../containers/SchoolFilter';
import VisuallyHidden from '../VisuallyHidden';
import getIcon from '../../utilities/getIcon';
import { SCHOOLS } from '../../data';

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
      <details className="control-item">
        <summary>Filters by school</summary>
        <div className="control-section control-section--button">
          {SCHOOLS.map(school => (
            <div className="control-item control-item--button" key={school}>
              <SchoolFilter school={school} />
            </div>
          ))}
        </div>
      </details>
    </div>
    {showSubClassFilter && (
      <div className="control-section">
        <div className="control-item control-item--input">
          <SubClassFilter />
        </div>
      </div>
    )}
    <div className="control-section control-section--button">
      <div className="control-item control-item--check">
        <BinaryFilter type="ritual" label={getIcon['ritual']} title="Ritual" />
      </div>
      <div className="control-item control-item--check">
        <BinaryFilter
          type="concentration"
          label={getIcon['concentration']}
          title="Concentraton"
        />
      </div>
      <div className="control-item control-item--check">
        <BinaryFilter
          type="cost"
          label={getIcon['cost']}
          title="Material Cost"
        />
      </div>
      <div className="control-item control-item--check">
        <BinaryFilter
          type="favorites"
          label={getIcon['favorites']}
          title="Favorites Only"
        />
      </div>
    </div>
    <div className="control-section control-section--full" aria-hidden={true}>
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
