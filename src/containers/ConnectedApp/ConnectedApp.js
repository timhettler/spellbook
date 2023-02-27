import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

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
import FTOD from 'data/spells/ftod';

import Artificer from 'data/classes/artificer';
import Bard from 'data/classes/bard';
import Cleric from 'data/classes/cleric';
import Druid from 'data/classes/druid';
import Paladin from 'data/classes/paladin';
import Ranger from 'data/classes/ranger';
import Sorcerer from 'data/classes/sorcerer';
import Warlock from 'data/classes/warlock';
import Wizard from 'data/classes/wizard';

import App from 'components/App';

import VisibleSpellList from 'containers/VisibleSpellList';
import VisibleControls from 'containers/VisibleControls';
import OfflineToast from 'containers/OfflineToast';

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

const ConnectedApp = () => {
  const currentSpellId = useSelector((state) => state.currentSpellId);
  const dispatch = useDispatch();
  const { spellId } = useParams();

  // Load in data sources
  useEffect(() => {
    dispatch(
      loadSpells(
        mergeSpellbooks(
          [PHB, TCOE, XGTE, LLOK, SACOC, IDROTFM, FTOD],
          CLASS_DATA
        )
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

  useEffect(() => {
    if (spellId !== currentSpellId) {
      dispatch(viewSpell(spellId || null));
    }
  }, [currentSpellId, spellId, dispatch]);

  return (
    <App
      currentSpellId={currentSpellId}
      controls={<VisibleControls />}
      list={<VisibleSpellList />}
      detail={<Outlet />}
      toast={<OfflineToast />}
    />
  );
};

export default ConnectedApp;
