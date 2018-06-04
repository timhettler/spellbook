import React from 'react';
import PropTypes from 'prop-types';

import Spell from '../Spell';

const SpellList = ({ spells, onSpellClick }) => (
  <table>
    <tbody>
      {spells.map((spell, index) => (
        <Spell
          key={spell.id}
          {...spell}
          onClick={() => onSpellClick(spell.id)}
        />
      ))}
    </tbody>
  </table>
);

SpellList.propTypes = {
  spells: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onSpellClick: PropTypes.func.isRequired,
};

export default SpellList;
