import { connect } from 'react-redux';

import { toggleFilter } from '../../actions';
import { selectValue } from '../../utilities/selectValue';
import TextInput from '../../components/TextInput';

const mapStateToProps = (state, ownProps) => ({
  value: selectValue(ownProps.type)(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: value => {
    dispatch(toggleFilter({ type: ownProps.type, value: value }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextInput);
