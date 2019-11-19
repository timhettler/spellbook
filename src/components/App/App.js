import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import './App.scss';

const App = ({ currentSpellId, controls, list, detail, toast }) => {
  const [isSpellSelected, setIsSpellSelected] = useState(false);

  useEffect(() => {
    setIsSpellSelected(!!currentSpellId);
  }, [currentSpellId]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Spellbook</h1>
      </header>
      <main className="App-main">
        <div className="App-main-container">
          <section className="App-section App-section--list">
            <nav className="App-spell-list-nav">{controls}</nav>
            <div className="App-spell-list">
              <div className="App-spell-list-container">{list}</div>
            </div>
          </section>
          <section
            className={classNames('App-section App-section--detail', {
              'is-active': isSpellSelected,
            })}
          >
            {detail}
          </section>
        </div>
      </main>
      <aside className="App-toast">{toast}</aside>
    </div>
  );
};

App.propTypes = {
  currentSpellId: PropTypes.string,
  controls: PropTypes.element,
  list: PropTypes.element,
  detail: PropTypes.element,
  toast: PropTypes.element,
};

export default App;
