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

import PHB from 'data/spells/phb';
import XGTE from 'data/spells/xgte';
import LLOK from 'data/spells/llok';
import TCOE from 'data/spells/tcoe';
import SACOC from 'data/spells/sacoc';
import IDROTFM from 'data/spells/idrotfm';

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

function transformSpell(spell, meta) {
  return {
    ...spell,
    id: toKebabCase(spell.name),
    cost:
      spell.material &&
      spell.material.search(/[\d\s][csegp]p(?![a-zA-Z])/g) > -1,
    source: meta.name,
  };
}

function checkForDuplicateSpells(spells) {
  spells.reduce((acc, spell) => {
    const isDup = acc.find((aSpell) => spell.id === aSpell.id);
    if (isDup) {
      console.warn(`Duplicate spell found: ${spell.name}`, spell);
    }
    return [...acc, spell];
  }, []);

  return void 0;
}

function mergeSpellbooks(spellbooks, CLASS_DATA) {
  // Add additional props to spells
  const allSpells = spellbooks
    .map((book) => book.spells.map((spell) => transformSpell(spell, book.meta)))
    .flat();

  // Check for duplicate spells
  // TODO prefer SOURCEBOOK over ADVENTURE spells when there's a duplicate
  checkForDuplicateSpells(allSpells);

  const spellsWithClassInfo = allSpells.map((spell) => {
    const newSpell = { ...spell, classes: [] };

    CLASS_DATA.forEach((data) => {
      // Add to class list
      const isClassSpell = data.spell_list
        .concat(data.additional_spells)
        .find((dSpell) => spell.id === dSpell);
      if (isClassSpell) {
        newSpell.classes.push(data.name);
      }

      // Add subclass list
      if (data.subclasses?.length) {
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

  return spellsWithClassInfo;
}

const CLASS_DATA = [
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

const renderDetail = (currentSpellId) =>
  !!currentSpellId ? <SelectedSpellDetail /> : <NoSelection />;

const ConnectedApp = () => {
  const currentSpellId = useSelector((state) => state.currentSpellId);
  const dispatch = useDispatch();

  // Load in data sources
  useEffect(() => {
    dispatch(
      loadSpells(
        mergeSpellbooks([PHB, TCOE, XGTE, LLOK, SACOC, IDROTFM], CLASS_DATA)
      )
    );
    dispatch(loadCastingTimes(data.CASTING_TIMES));
    dispatch(loadSchools(data.SCHOOLS));
    dispatch(loadClasses(CLASS_DATA.map((cData) => cData.name)));

    CLASS_DATA.forEach((cData) => {
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
