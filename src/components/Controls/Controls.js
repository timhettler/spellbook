import React, { Fragment } from 'react';

import ResetButton from '../../containers/ResetButton';
import Filter from '../../containers/Filter';
import SubClassFilter from '../../containers/SubClassFilter';
import TextFilter from '../../containers/TextFilter';
import BinaryFilter from '../../containers/BinaryFilter';

const Controls = () => (
  <Fragment>
    <div>
      <ResetButton>Reset</ResetButton>
    </div>
    <div>
      <TextFilter type="name" />
    </div>
    <div>
      <Filter type="classes" />
      <SubClassFilter />
    </div>
    <div>
      <Filter type="school" />
    </div>
    <div>
      <BinaryFilter type="ritual" label="Ritual" />
      <BinaryFilter type="concentration" label="Concentration" />
    </div>
  </Fragment>
);

export default Controls;
