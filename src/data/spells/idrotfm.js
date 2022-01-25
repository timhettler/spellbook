import { ATTACK_SAVE, DAMAGE_EFFECT, SCHOOL, SOURCE_TYPE } from '../const';

const data = {
  meta: {
    name: 'Icewind Dale: Rime of the Frost Maiden',
    abbreviation: 'idrotfm',
    type: SOURCE_TYPE.ADVENTURE,
  },
  spells: [
    // TODO also represented in TCOE - should distinguish between adventures and sources
    //     {
    //       name: 'Blade of Disaster',
    //       desc: `You create a blade-shaped planar rift about 3 feet long in an unoccupied space you can see within range. The blade lasts for the duration. When you cast this spell, you can make up to two melee spell attacks with the blade, each one against a creature, loose object, or structure within 5 feet of the blade. On a hit, the target takes 4d12 force damage. This attack scores a critical hit if the number on the d20 is 18 or higher. On a critical hit, the blade deals an extra 8d12 force damage (for a total of 12d12 force damage).

    // As a bonus action on your turn, you can move the blade up to 30 feet to an unoccupied space you can see and then make up to two melee spell attacks with it again.

    // The blade can harmlessly pass through any barrier, including a wall of force.`,
    //       higher_level: null,
    //       page: null,
    //       range: '60 ft',
    //       components: ['V', 'S'],
    //       ritual: false,
    //       duration: '1 minute',
    //       concentration: true,
    //       casting_time: '1 bonus action',
    //       level: 9,
    //       school: SCHOOL.CONJURATION,
    //       attack_save: [ATTACK_SAVE.MELEE],
    //       damage_effect: [DAMAGE_EFFECT.FORCE],
    //     },
    {
      name: 'Create Magen',
      desc: `While casting the spell, you place a vial of quicksilver in the chest of a life-sized human doll stuffed with ash or dust. You then stitch up the doll and drip your blood on it. At the end of the casting, you tap the doll with a crystal rod, transforming it into a magen clothed in whatever the doll was wearing. The type of magen is chosen by you during the casting of the spell.

*  Demos Magen
*  Galvan Magen
*  Hypnos Magen

When the magen appears, your hit point maximum decreases by an amount equal to the magen's challenge rating (minimum reduction of 1). Only a wish spell can undo this reduction to your hit point maximum.

Any magen you create with this spell obeys your commands without question.`,
      higher_level: null,
      page: null,
      range: 'Touch',
      components: ['V', 'S', 'M'],
      material:
        'a vial of quicksilver worth 500 gp and a life-sized human doll, both of which the spell consumes, and an intricate crystal rod worth at least 1,500 gp that is not consumed',
      ritual: false,
      duration: 'Instantaneous',
      concentration: false,
      casting_time: '1 hour',
      level: 7,
      school: SCHOOL.TRANSMUTATION,
      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.UTILITY],
    },
    {
      name: 'Frost Fingers',
      desc: `Freezing cold blasts from your fingertips in a 15-foot cone. Each creature in that area must make a Constitution saving throw, taking 2d8 cold damage on a failed save, or half as much damage on a successful one.

The cold freezes nonmagical liquids in the area that aren’t being worn or carried.`,
      higher_level: `When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.`,
      page: null,
      range: 'Self',
      components: ['V', 'S'],
      material: null,
      ritual: false,
      duration: 'Instantaneous',
      concentration: false,
      casting_time: '1 action',
      level: 1,
      school: SCHOOL.EVOCATION,
      attack_save: [ATTACK_SAVE.CONSTITUTION],
      damage_effect: [DAMAGE_EFFECT.COLD],
    },
  ],
};

export default data;
