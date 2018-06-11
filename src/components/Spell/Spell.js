import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import getSpellLevel from '../../utilities/getSpellLevel';

import './Spell.css';

export class Spell extends Component {
  constructor(props) {
    super(props);

    this.button = React.createRef();
  }

  componentDidMount() {
    this._createEventListeners(this.button.current);
  }

  _createEventListeners(node) {
    node.addEventListener('keydown', this._keyboardEvents.bind(this));
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
    const { onClick, id, name, level, isActive } = this.props;

    return (
      <tr
        ref={this.button}
        className={classNames('spell-list-item', { 'is-active': isActive })}
        role="link"
        tabIndex="0"
        data-id={id}
        onClick={onClick}
      >
        <th scope="row" className="spell-list-item__name">
          {name}
        </th>
        <td className="spell-list-item__level">{getSpellLevel(level)}</td>
      </tr>
    );
  }
}

Spell.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
};

export default Spell;
