import { connect } from 'react-redux';
import App from '../../components/App';

function mapStateToProps(state) {
  return {
    currentSpellId: state.currentSpellId,
  };
}

export default connect(mapStateToProps)(App);
