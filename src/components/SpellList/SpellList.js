import React, { Component } from 'react';
import PropTypes from 'prop-types';

import setTabIndex from '../../utilities/setTabIndex';
import uuidv4 from '../../utilities/uuidv4';
import SortingButton from '../../containers/SortingButton';
import SpellListItem from '../SpellListItem';

import './SpellList.scss';

class SpellList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canScroll: null,
    };

    this.captionId = uuidv4();
    this.container = React.createRef();
    this.setTabIndex = setTabIndex.bind(this);
  }

  componentDidMount() {
    this.setTabIndex(this.container.current);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return {
      focusSpell:
        prevProps.currentSpellId !== null && this.props.currentSpellId === null,
      spellListChanged: prevProps.spells.length !== this.props.spells.length,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot.spellListChanged) {
      this.setTabIndex(this.container.current);
    }

    if (snapshot.focusSpell) {
      const listItem = this._getCurrentItem(prevProps.currentSpellId);
      listItem.focus();
    }
  }

  _getCurrentItem(id) {
    return this.container.current.querySelector(`tbody > tr[data-id="${id}"]`);
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
        aria-sort={this._getAriaSort(field, sorting)}
        className={`spell-list__header spell-list__header--${field}`}
      >
        <SortingButton field={field} aria-label={this._getAriaLabel(label)}>
          {label}
        </SortingButton>
      </th>
    );
  }

  _renderNoResults() {
    return (
      <div className="no-results">
        <h2 className="no-results__header">No Spells Found</h2>
      </div>
    );
  }

  render() {
    const { spells, sorting, currentSpellId, onSpellClick } = this.props;
    const { canScroll } = this.state;

    return (
      <div
        ref={this.container}
        className="spell-list-container"
        role="group"
        aria-labelledby={this.captionId}
        tabIndex={canScroll ? 0 : null}
        data-can-scroll={canScroll ? true : null}
      >
        {!spells.length && this._renderNoResults()}
        {!!spells.length && (
          <table className="spell-list">
            <caption id={this.captionId} className="visuallyHidden">
              <h2>Spells</h2>
              {canScroll && (
                <div>
                  <small>(scroll to see more)</small>
                </div>
              )}
            </caption>
            <thead className="visuallyHidden">
              <tr>
                {this._renderHeader('name', 'Name', sorting)}
                {this._renderHeader('level', 'Level', sorting)}
              </tr>
            </thead>
            <tbody>
              {spells.map((spell, index) => (
                <SpellListItem
                  key={spell.id}
                  {...spell}
                  isActive={currentSpellId === spell.id}
                  onClick={() => onSpellClick(spell.id)}
                />
              ))}
            </tbody>
          </table>
        )}
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
  currentSpellId: PropTypes.string,
  onSpellClick: PropTypes.func.isRequired,
};

export default SpellList;
