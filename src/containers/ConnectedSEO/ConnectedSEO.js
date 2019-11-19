import { connect } from 'react-redux';

import { selectCurrentSpell } from '../SelectedSpellDetail/selectors';
import getSpellLevel from '../../utilities/getSpellLevel';
import SEO from '../../components/SEO';

const CHAR_LIMIT = 70;

function mapStateToProps(state) {
  const spell = { ...selectCurrentSpell(state) };

  if (!spell.name) {
    return {
      title: undefined,
      description: undefined,
    };
  }

  const description = `${getSpellLevel(spell.level)} ${spell.school}. ${
    spell.casting_time
  }, ${spell.range.toLowerCase()}, ${spell.duration}${
    spell.concentration ? ' (concentration)' : ''
  }.`;

  const metaDescription =
    description.length > CHAR_LIMIT
      ? `${description.substring(0, CHAR_LIMIT - 3)}...`
      : description;

  return {
    title: spell.name,
    description: metaDescription,
  };
}

export default connect(mapStateToProps)(SEO);
