import { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';

import { modifyScrollContainer } from 'utilities/setCanScroll';
import uuidv4 from 'utilities/uuidv4';
import { usePrevious } from 'utilities/hooks/usePrevious';
import SpellListItem from 'components/SpellListItem';

import './SpellList.scss';

const NoResults = () => {
  return (
    <div className="no-results">
      <h2 className="no-results__header">No Spells Found</h2>
    </div>
  );
};

const SpellList = ({ spells, currentSpellId }) => {
  const [canScroll, setCanScroll] = useState(null);
  const [dimensions, setDimensions] = useState({
    containerHeight: 0,
    containerWidth: 0,
    itemHeight: 51,
  });
  const [captionId] = useState(uuidv4());
  const container = useRef();
  const list = useRef();
  const prevSpellId = usePrevious(currentSpellId);
  const prevSpellLength = usePrevious(spells.length);

  useLayoutEffect(() => {
    // Update dimension sizes so virtualized window renders correctly
    function handleResize() {
      const { width: containerWidth, height: containerHeight } =
        container.current.getBoundingClientRect();

      let itemHeight = dimensions.itemHeight;
      const item = container.current.querySelector(`[data-id]`);
      if (item) {
        itemHeight = item.getBoundingClientRect().height;
      }

      setDimensions({ containerWidth, containerHeight, itemHeight });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    if (prevSpellLength !== spells.length) {
      setCanScroll(modifyScrollContainer(container.current, list.current));
    }

    if (prevSpellId !== null && currentSpellId === null) {
      container.current
        ?.querySelector(`[data-id="${currentSpellId}"]`)
        ?.focus();
    }
  }, [currentSpellId, spells.length, prevSpellId, prevSpellLength]);

  return (
    <div
      ref={container}
      className="spell-list-container"
      role="group"
      aria-labelledby={captionId}
      tabIndex={canScroll ? 0 : null}
      data-can-scroll={canScroll ? true : null}
    >
      {!spells.length && <NoResults />}
      {!!spells.length && (
        <>
          <div id={captionId} className="visuallyHidden">
            <h2>Spells</h2>
            {canScroll && (
              <div>
                <small>(scroll to see more)</small>
              </div>
            )}
          </div>
          <List
            height={dimensions.containerHeight}
            itemCount={spells.length}
            itemSize={dimensions.itemHeight}
            width={dimensions.containerWidth}
            innerElementType="ol"
            innerRef={list}
            itemKey={(index) => spells[index].id}
            overscanCount={3}
          >
            {({ index, style }) => (
              <li data-id={spells[index].id} style={style}>
                <SpellListItem
                  theme={index % 2 === 0 ? 'even' : 'odd'}
                  spell={{ ...spells[index] }}
                  isActive={currentSpellId === spells[index].id}
                />
              </li>
            )}
          </List>
        </>
      )}
    </div>
  );
};
SpellList.propTypes = {
  spells: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  currentSpellId: PropTypes.string,
};

export default SpellList;
