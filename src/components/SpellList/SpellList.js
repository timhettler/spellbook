import React, { Component } from 'react';
import PropTypes from 'prop-types';

import uuidv4 from '../../utilities/uuidv4';
import SortingButton from '../../containers/SortingButton';
import Spell from '../Spell';

import './SpellList.css';

class SpellList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabindex: null,
    };

    this.captionId = uuidv4();
    this.container = React.createRef();
  }

  componentDidMount() {
    const { scrollWidth, clientWidth } = this.container;

    let scrollable = scrollWidth > clientWidth;

    this.setState({
      tabindex: scrollable ? '0' : null,
    });
  }

  _getAriaSort(field, sorting) {
    if (field !== sorting.field) {
      return 'none';
    }

    return sorting.reverse ? 'descending' : 'ascending';
  }

  _getAriaLabel(label) {
    return `sort by ${label}`;
  }

  _renderHeader(field, label, sorting) {
    return (
      <th
        scope="col"
        role="columnheader"
        aria-sort={this._getAriaSort(field, sorting)}
        className={`spell-list__header spell-list__header--${field}`}
      >
        <SortingButton field={field} aria-label={this._getAriaLabel(label)}>
          {label}
        </SortingButton>
      </th>
    );
  }

  render() {
    const { spells, sorting, onSpellClick } = this.props;

    return (
      <div
        ref={this.container}
        className="spell-list-container"
        tabIndex={this.state.tabindex}
        role="group"
        aria-labelledby={this.captionId}
      >
        <table className="spell-list">
          <caption id={this.captionId} className="visuallyHidden">
            <h2>Spells</h2>
          </caption>
          <thead>
            <tr>
              {this._renderHeader('name', 'Name', sorting)}
              {this._renderHeader('level', 'Level', sorting)}
            </tr>
          </thead>
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
      </div>
    );
  }
}

SpellList.propTypes = {
  spells: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  sorting: PropTypes.shape({
    field: PropTypes.string,
    reverse: PropTypes.bool,
  }).isRequired,
  onSpellClick: PropTypes.func.isRequired,
};

export default SpellList;
