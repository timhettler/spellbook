import React from 'react';
import { useSelector } from 'react-redux';

import { selectSubClassFilter } from 'containers/SubClassFilter/selectors';
import Controls from 'components/Controls';

const VisibleControls = () => {
  const sorting = useSelector(state => state.sorting);
  const showSubClassFilter = !!useSelector(selectSubClassFilter);
  //const dispatch = useDispatch();
  // Todo need a selector to get visible spells and return id of first one
  // this should b ein SpellFilter
  //const onSpellClick = useCallback(id => dispatch(viewSpell(id)), [dispatch]);

  return <Controls {...{ showSubClassFilter, sorting }} />;
};

export default VisibleControls;
