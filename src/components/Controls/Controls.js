import React from 'react';
import PropTypes from 'prop-types';

import ResetButton from '../../containers/ResetButton';
import Filter from '../../containers/Filter';
import SubClassFilter from '../../containers/SubClassFilter';
import TextFilter from '../../containers/TextFilter';
import BinaryFilter from '../../containers/BinaryFilter';

import './Controls.css';

const Controls = ({ showSubClassFilter }) => (
  <div className="control-container">
    <div className="control-section">
      <div className="control-item">
        <Filter type="classes" defaultLabel="All Classes" />
      </div>
      <div className="control-item">
        <TextFilter type="name" placeholder="Spell Name" />
      </div>
      <div className="control-item control-item--reset">
        <ResetButton className="reset-button" aria-label="Reset Filters">
          ×
        </ResetButton>
      </div>
    </div>
    {showSubClassFilter && (
      <div className="control-section">
        <div className="control-item">
          <SubClassFilter />
        </div>
      </div>
    )}
    <div className="control-section">
      <div className="control-item">
        <Filter type="school" defaultLabel="All Schools" />
      </div>
    </div>
    <div>
      <BinaryFilter type="ritual" label="Ritual" />
      <BinaryFilter type="concentration" label="Concentration" />
    </div>
  </div>
);

Controls.propTypes = {
  showSubClassFilter: PropTypes.bool,
};

export default Controls;
