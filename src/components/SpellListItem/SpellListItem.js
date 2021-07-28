import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import getSpellLevel from 'utilities/getSpellLevel';
import FavoriteButton from 'containers/FavoriteButton';
import PropIcon from 'components/PropIcon';

import './SpellListItem.scss';

const SpellIcons = ({ ritual, concentration, cost, higher_level }) => {
  return ritual || concentration || cost || higher_level ? (
    <div className="spell-icons">
      {ritual && <PropIcon type="ritual" />}
      {concentration && <PropIcon type="concentration" />}
      {cost && <PropIcon type="cost" />}
      {higher_level && <PropIcon type="higher_level" />}
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

export class SpellListItem extends Component {
  constructor(props) {
    super(props);

    this.interactiveEl = React.createRef();
    this._keyboardEvents = this._keyboardEvents.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  componentDidMount() {
    this.interactiveEl.current.addEventListener(
      'keydown',
      this._keyboardEvents
    );
  }

  componentWillUnmount() {
    this.interactiveEl.current.removeEventListener(
      'keydown',
      this._keyboardEvents
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.isActive !== nextProps.isActive;
  }

  _keyboardEvents(e) {
    switch (e.keyCode) {
      case 13:
        this._handleClick(this.props.onClick)(e);
        break;
      default:
        break;
    }

    return;
  }

  _handleClick(callback) {
    return (e) => {
      callback(e);
      e.stopPropagation();
    };
  }

  render() {
    const { onClick, spell, isActive, theme, ...rest } = this.props;

    const { id, name, higher_level, ritual, concentration, cost, level } =
      spell;

    return (
      <div
        ref={this.interactiveEl}
        className={classNames('spell-list-item', `is-${theme}`, {
          'is-active': isActive,
        })}
        role="link"
        tabIndex="0"
        onClick={this._handleClick(onClick)}
        {...rest}
      >
        <span>{<FavoriteButton spellId={id} />}</span>
        <span className="spell-list-item__name">
          {name}
          <SpellIcons {...{ ritual, concentration, cost, higher_level }} />
        </span>
        <span className="spell-list-item__level">{getSpellLevel(level)}</span>
      </div>
    );
  }
}

SpellListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
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
