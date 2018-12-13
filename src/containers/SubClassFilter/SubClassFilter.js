import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleFilter } from '../../actions';
import { selectSubClassFilter } from './selectors';
import { selectValue } from '../../utilities/selectValue';
import Select from '../../components/Select';

const mapStateToProps = (state, ownProps) => {
  const filter = selectSubClassFilter(state);

  if (!filter) {
    return {};
  }

  return {
    type: filter.type,
    value: selectValue(filter.type)(state),
    options: [{ label: filter.label, value: '' }].concat(filter.options),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (value, type) => {
    dispatch(toggleFilter({ type: type, value: value }));
  },
});

class SubClassFilter extends Component {
  // componentDidUpdate(prevProps, prevState) {
  //   if (!prevProps.type) {
  //     return;
  //   }

  //   if (this.props.type !== prevProps.type) {
  //     this.props.dispatch(toggleFilter({ type: prevProps.type }));
  //   }
  // }

  render() {
    if (!this.props.options) {
      return null;
    }

    return <Select {...this.props} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubClassFilter);
