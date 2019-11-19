import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleFilter } from '../../actions';
import { selectSubClassFilter } from './selectors';
import { selectStringValue } from '../../utilities/selectValue';
import Select from '../../components/Select';

const mapStateToProps = (state, ownProps) => {
  const filter = selectSubClassFilter(state);

  if (!filter) {
    return {};
  }

  return {
    type: filter.type,
    value: selectStringValue(filter.type)(state),
    options: filter.options,
    label: filter.label,
    allLabel: filter.allLabel,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (value, type) => {
    dispatch(toggleFilter({ type: type, value: value }));
  },
});

class SubClassFilter extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.type) {
      return;
    }

    // TODO should this be done in the reducer?
    if (this.props.type !== prevProps.type) {
      this.props.onChange(false, prevProps.type);
    }
  }

  render() {
    if (!this.props.options) {
      return null;
    }

    return <Select {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubClassFilter);
