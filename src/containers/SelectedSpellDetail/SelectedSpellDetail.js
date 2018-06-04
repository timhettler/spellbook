import React from 'react';
import { connect } from 'react-redux';

import { selectCurrentSpell } from './selectors';
import SpellDetail from '../../components/SpellDetail';

function mapStateToProps(state) {
  return {
    ...selectCurrentSpell(state)
  };
}

const SelectedSpellDetail = props => {
  if (!props.name) {
    return null;
  }

  return <SpellDetail {...props} />;
};

export default connect(mapStateToProps)(SelectedSpellDetail);
