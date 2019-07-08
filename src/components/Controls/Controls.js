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
      <div className="control-item">
        <details className="control-toggle">
          <summary className="control-toggle__heading">
            Filters by school
          </summary>
          <div className="control-toggle__content">
            {SCHOOLS.map(school => (
              <div className="control-toggle__item" key={school}>
                <SchoolFilter school={school} />
              </div>
            ))}
          </div>
        </details>
      </div>
    </div>
    {showSubClassFilter && (
      <div className="control-section">
        <div className="control-item control-item--input">
          <SubClassFilter />
        </div>
      </div>
    )}
    {/*<div className="control-section control-section--evenly-spaced">
      <div className="control-item control-item--check">
        <BinaryFilter type="ritual" icon={getIcon['ritual']} label="Ritual" />
      </div>
      <div className="control-item control-item--check">
        <BinaryFilter
          type="concentration"
          icon={getIcon['concentration']}
          label="Concentraton"
        />
      </div>
      <div className="control-item control-item--check">
        <BinaryFilter
          type="cost"
          icon={getIcon['cost']}
          label="Material Cost"
        />
      </div>
      <div className="control-item control-item--check">
        <BinaryFilter
          type="favorites"
          icon={getIcon['favorites']}
          label="Favorites"
        />
      </div>
    </div>*/}
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
