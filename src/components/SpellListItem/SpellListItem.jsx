import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import getSpellLevel from 'utilities/getSpellLevel';
import FavoriteButton from 'containers/FavoriteButton';
import PropIcon from 'components/PropIcon';

import './SpellListItem.scss';

const SpellIcons = ({
  ritual,
  concentration,
  cost,
  higher_level,
  isSubClassSpell,
}) => {
  return ritual || concentration || cost || higher_level || isSubClassSpell ? (
    <div className="spell-icons">
      {ritual && <PropIcon type="ritual" />}
      {concentration && <PropIcon type="concentration" />}
      {cost && <PropIcon type="cost" />}
      {higher_level && <PropIcon type="higher_level" />}
      {isSubClassSpell && <PropIcon type="subclass_spell" />}
    </div>
  ) : null;
};

const SpellIconsPropTypes = {
  ritual: PropTypes.bool,
  concentration: PropTypes.bool,
  cost: PropTypes.bool,
  higher_level: PropTypes.string,
};

SpellIcons.propTypes = SpellIconsPropTypes;

const SpellListItem = ({ onClick, spell, isActive, theme, ...rest }) => {
  const {
    id,
    name,
    higher_level,
    ritual,
    concentration,
    cost,
    level,
    isSubClassSpell,
  } = spell;

  return (
    <Link
      className={classNames('spell-list-item', `is-${theme}`, {
        'is-active': isActive,
      })}
      to={`/spell/${id}`}
      {...rest}
    >
      <span>{<FavoriteButton spellId={id} />}</span>
      <span className="spell-list-item__name">
        {name}
        <SpellIcons
          {...{ ritual, concentration, cost, higher_level, isSubClassSpell }}
        />
      </span>
      <span className="spell-list-item__level">{getSpellLevel(level)}</span>
    </Link>
  );
};

SpellListItem.propTypes = {
  spell: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ritual: PropTypes.bool,
    concentration: PropTypes.bool,
    cost: PropTypes.bool,
    level: PropTypes.number.isRequired,
  }).isRequired,
  isActive: PropTypes.bool,
  theme: PropTypes.oneOf(['odd', 'even']),
};

export default SpellListItem;
