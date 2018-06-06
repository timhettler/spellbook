import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadSpells, loadClasses, loadSchools, addSubclass } from './actions';
import * as data from './data';
import VisibleSpellList from './containers/VisibleSpellList';
import SelectedSpellDetail from './containers/SelectedSpellDetail';
import Controls from './components/Controls';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(loadSpells(data.SPELLS));
    this.props.dispatch(loadClasses(data.CLASSES));
    this.props.dispatch(loadSchools(data.SCHOOLS));

    this.props.dispatch(addSubclass('Druid', 'circles', data.CIRCLES));
    this.props.dispatch(addSubclass('Cleric', 'domains', data.DOMAINS));
    this.props.dispatch(addSubclass('Paladin', 'oaths', data.OATHS));
    this.props.dispatch(addSubclass('Warlock', 'patrons', data.PATRONS));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Spellbook</h1>
        </header>
        <main className="App-main">
          <div>
            <nav>
              <Controls />
            </nav>
            <VisibleSpellList />
          </div>
          <div>
            <SelectedSpellDetail />
          </div>
        </main>
      </div>
    );
  }
}

export default connect()(App);
