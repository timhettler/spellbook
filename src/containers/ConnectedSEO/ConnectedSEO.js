import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentSpell } from 'containers/SelectedSpellDetail/selectors';
import getSpellLevel from 'utilities/getSpellLevel';
import SEO from 'components/SEO';

const CHAR_LIMIT = 70;

const getProps = (spell = {}) => {
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
};

const ConnectedSEO = (props) => {
  const spell = useSelector(selectCurrentSpell);

  return <SEO {...getProps(spell)} />;
};

export default ConnectedSEO;
