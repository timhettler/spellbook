import { useSelector } from 'react-redux';

import { selectSortedResults } from './selectors';
import SpellList from 'components/SpellList';

const VisibleSpellList = () => {
  const spells = useSelector(selectSortedResults);
  const currentSpellId = useSelector((state) => state.currentSpellId);

  return <SpellList {...{ spells, currentSpellId }} />;
};

export default VisibleSpellList;
