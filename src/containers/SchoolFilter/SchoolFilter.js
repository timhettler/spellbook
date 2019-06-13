import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { toggleFilter } from '../../actions';
import { selectSchoolFilter } from './selectors';
import Button from '../../components/Button';
import VisuallyHidden from '../../components/VisuallyHidden';
import getIcon from '../../utilities/getIcon';

import './SchoolFilter.scss';

const SchoolFilter = props => {
  const selected = useSelector(state =>
    selectSchoolFilter(props.school)(state)
  );
  const dispatch = useDispatch();
  const handleClick = useCallback(
    value => dispatch(toggleFilter({ type: 'school', value: value })),
    [dispatch]
  );

  return (
    <Button
      className={classNames('school-filter', { 'is-selected': selected })}
      onClick={() => handleClick(props.school)}
    >
      <span className="icon" role="presentation">
        {getIcon[props.school.toLowerCase()]}
      </span>
      <VisuallyHidden>{props.school}</VisuallyHidden>
    </Button>
  );
};

SchoolFilter.propTypes = {
  school: PropTypes.string,
};

export default SchoolFilter;
