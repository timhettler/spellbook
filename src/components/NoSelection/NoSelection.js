// @flow

import React from 'react';

import './NoSelection.scss';

const NoSelection = () => (
  <div className="no-selection">
    <h2 className="no-selection__header">No Spell Selected</h2>
    <p className="no-selection__copy">
      Select a spell from the list to see its details
    </p>
  </div>
);

export default NoSelection;
