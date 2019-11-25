import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import TextInput from 'components/TextInput';
import VisuallyHidden from 'components/VisuallyHidden';

import './SpellSearch.scss';

const SpellSearch = ({ value = '', onChange, onSubmit, ...rest }) => {
  const inputEl = useRef(null);

  const handleSubmit = callback => e => {
    callback();
    // TODO only do this on mobile
    inputEl.current.blur();
    e.preventDefault();
    return false;
  };

  return (
    // the action attribute is required for mobile safari to show the 'go' button
    // instead of 'return' when the keypad is open
    <form onSubmit={handleSubmit(onSubmit)} className="spell-search">
      <TextInput
        label="Search by Spell Name"
        placeholder="Spell Name"
        autoCorrect="off"
        spellCheck={false}
        ref={inputEl}
        {...{ value, onChange, ...rest }}
      />
      <VisuallyHidden>
        <input type="submit" value="View Spell" />
      </VisuallyHidden>
    </form>
  );
};

SpellSearch.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default SpellSearch;
