import React from 'react';
import { connect } from 'react-redux';

import { toggleFilter } from '../../actions';
import { selectSortedFilter } from './selectors';
import { selectValue } from '../../utilities/selectValue';
import Select from '../../components/Select';

const mapStateToProps = (state, ownProps) => ({
  value: selectValue(ownProps.type)(state),
  options: [{ label: ownProps.defaultLabel, value: '' }].concat(
    selectSortedFilter(ownProps.type)(state)
  ),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: value => {
    dispatch(toggleFilter({ type: ownProps.type, value: value }));
  },
});

const Filter = props => {
  if (!props.options) {
    return null;
  }

  return <Select {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
