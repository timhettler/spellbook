import React from 'react';

import ResetButton from 'containers/ResetButton';
import Filter from 'containers/Filter';
import SubClassFilter from 'containers/SubClassFilter';
import SpellFilter from 'containers/SpellFilter';
import BinaryFilter from 'containers/BinaryFilter';
import SortingButton from 'containers/SortingButton';
import SchoolFilter from 'containers/SchoolFilter';
import VisuallyHidden from 'components/VisuallyHidden';
import { ICONS } from 'constants/icons';
import { SCHOOLS } from 'data';

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
        <SpellFilter />
      </div>
      <div className="control-item control-item--input control-item--reset">
        <ResetButton className="reset-button">
          <span role="presentation">×</span>
          <VisuallyHidden>Reset Filters</VisuallyHidden>
        </ResetButton>
      </div>
    </div>
    {showSubClassFilter && (
      <div className="control-section">
        <div className="control-item control-item--input">
          <SubClassFilter />
        </div>
      </div>
    )}
    <div className="control-section">
      <div className="control-item control-item--input">
        <Filter
          type="castingTimes"
          label="Casting Time Filter"
          allLabel="All Casting Times"
        />
      </div>
    </div>
    <div className="control-section">
      <div className="control-item">
        <details className="control-toggle">
          <summary className="control-toggle__heading">
            Filter by school
          </summary>
          <div className="control-toggle__content">
            {SCHOOLS.map((school) => (
              <div className="control-toggle__item" key={school}>
                <SchoolFilter school={school} />
              </div>
            ))}
          </div>
        </details>
      </div>
    </div>
    <div className="control-section control-section--evenly-spaced">
      <div className="control-item control-item--check">
        <BinaryFilter type="ritual" icon={ICONS.ritual} label="Ritual" />
      </div>
      <div className="control-item control-item--check">
        <BinaryFilter
          type="concentration"
          icon={ICONS.concentration}
          label="Concentraton"
        />
      </div>
      <div className="control-item control-item--check">
        <BinaryFilter type="cost" icon={ICONS.cost} label="Material Cost" />
      </div>
      <div className="control-item control-item--check">
        <BinaryFilter
          type="higher_level"
          icon={ICONS.higher_level}
          label="Can Upcast"
        />
      </div>
      <div className="control-item control-item--check">
        <BinaryFilter
          type="favorites"
          icon={ICONS.favorites}
          label="Favorites"
        />
      </div>
      <div className="control-item control-item--check">
        <BinaryFilter type="history" icon={ICONS.history} label="History" />
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

export default Controls;
