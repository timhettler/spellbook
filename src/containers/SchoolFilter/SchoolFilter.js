import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleFilter } from 'actions';
import { selectSchoolFilter } from './selectors';
import Check from 'components/Check';
import { ICONS } from 'constants/icons';

const SchoolFilter = props => {
  const selected = useSelector(state =>
    selectSchoolFilter(props.school)(state)
  );
  const dispatch = useDispatch();
  const handleChange = useCallback(
    value => dispatch(toggleFilter({ type: 'school', value: value }, true)),
    [dispatch]
  );

  return (
    <Check
      icon={ICONS[props.school.toLowerCase()]}
      label={props.school}
      checked={selected}
      type="school"
      onChange={() => handleChange(props.school)}
      theme="large"
    />
  );
};

SchoolFilter.propTypes = {
  school: PropTypes.string,
};

export default SchoolFilter;
