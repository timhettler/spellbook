import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  loadSpells,
  loadCastingTimes,
  loadClasses,
  loadSchools,
  addSubclass,
  viewSpell,
} from 'actions';
import * as data from 'data';
import TCOE from 'data/spells/tcoe';
import XGTE from 'data/spells/xgte';
import LLOK from 'data/spells/llok';
import Artificer from 'data/classes/artificer';
import Bard from 'data/classes/bard';
import Cleric from 'data/classes/cleric';
import Druid from 'data/classes/druid';
import Paladin from 'data/classes/paladin';
import Ranger from 'data/classes/ranger';
import Sorcerer from 'data/classes/sorcerer';
import Warlock from 'data/classes/warlock';
import Wizard from 'data/classes/wizard';
import history from 'utilities/history';
import App from 'components/App';

import VisibleSpellList from 'containers/VisibleSpellList';
import SelectedSpellDetail from 'containers/SelectedSpellDetail';
import VisibleControls from 'containers/VisibleControls';
import OfflineToast from 'containers/OfflineToast';
import NoSelection from 'components/NoSelection';

import toKebabCase from 'utilities/toKebabCase';

const classData = [
  Artificer,
  Bard,
  Cleric,
  Druid,
  Paladin,
  Ranger,
  Sorcerer,
  Warlock,
  Wizard,
];

function transformSpell(spell) {
  return {
    ...spell,
    id: toKebabCase(spell.name),
    cost:
      spell.material &&
      spell.material.search(/[\d\s][csegp]p(?![a-zA-Z])/g) > -1,
  };
}

function mergeSpells() {
  const TashaSpells = TCOE.spells;
  const XanatharSpells = XGTE.spells;
  const KwalishSpells = LLOK.spells;

  const allSpells = data.SPELLS.concat(
    TashaSpells,
    XanatharSpells,
    KwalishSpells
  );

  // Add additional props to spells
  const transformedSpells = allSpells.map(transformSpell);

  const transformedSpellsWithClassInfo = transformedSpells.map((spell) => {
    const newSpell = { ...spell, classes: [] };

    classData.forEach((data) => {
      // Add to class list
      const isClassSpell = data.spell_list.find(
        (dSpell) => spell.id === dSpell
      );
      if (isClassSpell) {
        newSpell.classes.push(data.name);
      }

      // Add subclass list
      if (data.subclasses?.length) {
        console.log(data.subclasses);
        const subclassesWithSpell = data.subclasses.filter((subclass) =>
          subclass.spell_list.find((sSpell) => spell.id === sSpell)
        );

        newSpell[data.subclass_label] = subclassesWithSpell.map(
          (subclass) => subclass.name
        );
      }
    });

    return newSpell;
  });

  return transformedSpellsWithClassInfo;
}

const renderDetail = (currentSpellId) =>
  !!currentSpellId ? <SelectedSpellDetail /> : <NoSelection />;

const ConnectedApp = () => {
  const currentSpellId = useSelector((state) => state.currentSpellId);
  const dispatch = useDispatch();

  // Load in data sources
  useEffect(() => {
    dispatch(loadSpells(mergeSpells()));
    dispatch(loadCastingTimes(data.CASTING_TIMES));
    dispatch(loadSchools(data.SCHOOLS));
    dispatch(loadClasses(classData.map((cData) => cData.name)));

    classData.forEach((cData) => {
      if (cData.subclasses?.length) {
        dispatch(
          addSubclass(
            cData.name,
            cData.subclass_label,
            cData.subclasses.map((sc) => sc.name)
          )
        );
      }
    });
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
