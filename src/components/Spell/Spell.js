import React from 'react';
import PropTypes from 'prop-types';

import getSpellLevel from '../../utilities/getSpellLevel';

const Spell = ({ onClick, name, level }) => (
  <tr onClick={onClick}>
    <td>{name}</td>
    <td>{getSpellLevel(level)}</td>
  </tr>
);

Spell.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
};

export default Spell;
