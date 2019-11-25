// @flow

import React, { useRef } from 'react';

import TextInput from 'components/TextInput';
import VisuallyHidden from 'components/VisuallyHidden';

import './SpellSearch.scss';

type Props = {
  value: string,
  onChange: Function,
  onSubmit: Function,
};

const SpellSearch = ({ value = '', onChange, onSubmit, ...rest }: Props) => {
  const inputEl = useRef(null);

  const handleSubmit = callback => e => {
    callback();
    // TODO only do this on mobile
    if (inputEl.current) {
      inputEl.current.blur();
    }
    e.preventDefault();
    return false;
  };

  return (
    // the action attribute is required for mobile safari to show the 'go' button
    // instead of 'return' when the keypad is open
    <form onSubmit={handleSubmit(onSubmit)} className="spell-search">
      <TextInput
        {...{ ...rest, value, onChange }}
        label="Search by Spell Name"
        placeholder="Spell Name"
        autoCorrect="off"
        spellCheck={false}
        ref={inputEl}
      />
      <VisuallyHidden>
        <input type="submit" value="View Spell" />
      </VisuallyHidden>
    </form>
  );
};

export default SpellSearch;
