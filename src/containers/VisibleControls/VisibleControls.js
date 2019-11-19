import { connect } from 'react-redux';

import { viewSpell } from '../../actions';
import { selectSubClassFilter } from '../SubClassFilter/selectors';
import Controls from '../../components/Controls';

function mapStateToProps(state) {
  return {
    sorting: state.sorting,
    showSubClassFilter: !!selectSubClassFilter(state),
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSpellClick: id => {
    dispatch(viewSpell(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
