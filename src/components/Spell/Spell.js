import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import getSpellLevel from '../../utilities/getSpellLevel';
import FavoriteButton from '../../containers/FavoriteButton';
import PropIcon from '../PropIcon';

import './Spell.scss';

export class Spell extends Component {
  constructor(props) {
    super(props);

    this.button = React.createRef();
    this._keyboardEvents = this._keyboardEvents.bind(this);
  }

  componentDidMount() {
    this.button.current.addEventListener('keydown', this._keyboardEvents);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.isActive !== nextProps.isActive;
  }

  _keyboardEvents(e) {
    switch (e.keyCode) {
      case 13:
        this.props.onClick();
        break;
      default:
        break;
    }

    return;
  }

  render() {
    const {
      onClick,
      id,
      name,
      ritual,
      concentration,
      cost,
      level,
      isActive,
    } = this.props;

    return (
      <tr
        ref={this.button}
        className={classNames('spell-list-item', { 'is-active': isActive })}
        role="link"
        tabIndex="0"
        data-id={id}
        onClick={onClick}
      >
        <td>{<FavoriteButton spellId={id} />}</td>
        <th scope="row" className="spell-list-item__name">
          {name}
          {(ritual || concentration || cost) && (
            <div className="spell-icons">
              {ritual && <PropIcon type="ritual" />}
              {concentration && <PropIcon type="concentration" />}
              {cost && <PropIcon type="cost" />}
            </div>
          )}
        </th>
        <td className="spell-list-item__level">{getSpellLevel(level)}</td>
      </tr>
    );
  }
}

Spell.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ritual: PropTypes.bool,
  concentration: PropTypes.bool,
  cost: PropTypes.bool,
  level: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
};

export default Spell;
