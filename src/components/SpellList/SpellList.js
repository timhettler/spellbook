import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';

import setCanScroll from '../../utilities/setCanScroll';
import uuidv4 from '../../utilities/uuidv4';
import SpellListItem from '../SpellListItem';

import './SpellList.scss';

class SpellList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canScroll: null,
      containerHeight: 0,
      containerWidth: 0,
      itemHeight: 58,
    };

    this.captionId = uuidv4();
    this.container = React.createRef();
    this.list = React.createRef();
    this.setCanScroll = setCanScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this._updateDimensions);
    this._updateDimensions();
    this.setCanScroll(this.container.current, this.list.current);
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
      this.setCanScroll(this.container.current, this.list.current);
    }

    if (snapshot.focusSpell) {
      const listItem = this._getCurrentItem(prevProps.currentSpellId);
      listItem.focus();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._updateDimensions);
  }

  _updateDimensions = () => {
    const {
      width: containerWidth,
      height: containerHeight,
    } = this.container.current.getBoundingClientRect();

    let itemHeight = this.state.itemHeight;
    const item = this.container.current.querySelector(`[data-id]`);
    if (item) {
      itemHeight = item.getBoundingClientRect().height;
    }

    this.setState({ containerWidth, containerHeight, itemHeight });
  };

  _getCurrentItem(id) {
    return this.container.current.querySelector(`[data-id="${id}"]`);
  }

  _renderNoResults() {
    return (
      <div className="no-results">
        <h2 className="no-results__header">No Spells Found</h2>
      </div>
    );
  }

  render() {
    const { spells, currentSpellId, onSpellClick } = this.props;
    const {
      canScroll,
      containerWidth,
      containerHeight,
      itemHeight,
    } = this.state;

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
          <>
            <div id={this.captionId} className="visuallyHidden">
              <h2>Spells</h2>
              {canScroll && (
                <div>
                  <small>(scroll to see more)</small>
                </div>
              )}
            </div>
            <List
              height={containerHeight}
              itemCount={spells.length}
              itemSize={itemHeight}
              width={containerWidth}
              innerElementType="ol"
              innerRef={this.list}
              itemKey={index => spells[index].id}
              overscanCount={3}
            >
              {({ index, style }) => (
                <li data-id={spells[index].id} style={style}>
                  <SpellListItem
                    theme={index % 2 === 0 ? 'even' : 'odd'}
                    spell={{ ...spells[index] }}
                    isActive={currentSpellId === spells[index].id}
                    onClick={() => onSpellClick(spells[index].id)}
                  />
                </li>
              )}
            </List>
          </>
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
  currentSpellId: PropTypes.string,
  onSpellClick: PropTypes.func.isRequired,
};

export default SpellList;
