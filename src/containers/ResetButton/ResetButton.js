import { connect } from 'react-redux';
import { resetFilters } from '../../actions';
import Button from '../../components/Button';

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(resetFilters());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);
