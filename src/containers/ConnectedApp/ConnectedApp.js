import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  loadSpells,
  loadClasses,
  loadSchools,
  addSubclass,
  viewSpell,
} from 'actions';
import * as data from 'data';
import history from 'utilities/history';
import App from 'components/App';

import VisibleSpellList from 'containers/VisibleSpellList';
import SelectedSpellDetail from 'containers/SelectedSpellDetail';
import VisibleControls from 'containers/VisibleControls';
import OfflineToast from 'containers/OfflineToast';
import NoSelection from 'components/NoSelection';

const renderDetail = (currentSpellId) =>
  !!currentSpellId ? <SelectedSpellDetail /> : <NoSelection />;

const ConnectedApp = () => {
  const currentSpellId = useSelector((state) => state.currentSpellId);
  const dispatch = useDispatch();

  // Load in data sources
  useEffect(() => {
    dispatch(loadSpells(data.SPELLS));
    dispatch(loadClasses(data.CLASSES));
    dispatch(loadSchools(data.SCHOOLS));

    dispatch(addSubclass('Ranger', 'archetypes', data.ARCHETYPES));
    dispatch(addSubclass('Druid', 'circles', data.CIRCLES));
    dispatch(addSubclass('Cleric', 'domains', data.DOMAINS));
    dispatch(addSubclass('Paladin', 'oaths', data.OATHS));
    dispatch(addSubclass('Warlock', 'patrons', data.PATRONS));
  }, [dispatch]);

  // If url includes a spell id, load that spell
  useEffect(() => {
    const loc = history.location.pathname.split('/').filter((x) => x);
    if (loc[0] === 'spell') {
      dispatch(viewSpell(loc[1]));
    }
  }, [dispatch]);

  // When spell id changes, update the URL
  useEffect(() => {
    if (!currentSpellId) {
      history.push('');
      return;
    }

    history.push(`/spell/${currentSpellId}`);
  }, [currentSpellId]);

  return (
    <App
      currentSpellId={currentSpellId}
      controls={<VisibleControls />}
      list={<VisibleSpellList />}
      detail={renderDetail(currentSpellId)}
      toast={<OfflineToast />}
    />
  );
};

export default ConnectedApp;
