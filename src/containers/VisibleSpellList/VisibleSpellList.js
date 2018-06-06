import { connect } from 'react-redux';

import { viewSpell } from '../../actions';
import { selectSortedResults } from './selectors';
import SpellList from '../../components/SpellList';

function mapStateToProps(state) {
  return {
    sorting: state.sorting,
    spells: selectSortedResults(state),
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSpellClick: id => {
    dispatch(viewSpell(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpellList);
