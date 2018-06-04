import { connect } from 'react-redux';
import { setSorting } from '../../actions';
import Button from '../../components/Button';

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.field === state.sorting.field,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setSorting({ field: ownProps.field }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);
