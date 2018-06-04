import { connect } from 'react-redux';

import { toggleFilter } from '../../actions';
import { selectValue } from '../../utilities/selectValue';
import Check from '../../components/Check';

const mapStateToProps = (state, ownProps) => ({
  checked: selectValue(ownProps.type, 'bool')(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: value => {
    dispatch(toggleFilter({ type: ownProps.type, value: value }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Check);
