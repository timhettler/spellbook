import React from 'react';
import PropTypes from 'prop-types';

import getSpellLevel from '../../utilities/getSpellLevel';

import './Spell.css';

const Spell = ({ onClick, name, level }) => (
  <tr className="spell-list-item" onClick={onClick}>
    <th scope="row" className="spell-list-item__name">
      {name}
    </th>
    <td className="spell-list-item__level">{getSpellLevel(level)}</td>
  </tr>
);

Spell.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
};

export default Spell;
