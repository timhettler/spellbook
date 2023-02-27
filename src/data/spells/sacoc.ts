import { ATTACK_SAVE, DAMAGE_EFFECT, SCHOOL, SOURCE_TYPE } from '../const';
import { SourceType } from '../types';

const data: SourceType = {
  meta: {
    name: 'Strixhaven: A Curriculum of Chaos',
    abbreviation: 'sacoc',
    type: SOURCE_TYPE.ADVENTURE,
  },
  spells: [
    {
      name: 'Borrowed Knowledge',
      desc: `You draw on knowledge from spirits of the past. Choose one skill in which you lack proficiency. For the spell’s duration, you have proficiency in the chosen skill. The spell ends early if you cast it again.`,
      page: '',
      range: 'Self',
      components: ['V', 'S', 'M'],
      material: 'a book worth at least 25 gp',
      ritual: false,
      duration: '1 hour',
      concentration: false,
      casting_time: '1 action',
      level: 2,
      school: SCHOOL.DIVINATION,
      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.BUFF],
    },
    {
      name: 'Kinetic Jaunt',
      desc: `You magically empower your movement with dance-like steps, giving yourself the following benefits for the duration:

* Your walking speed increases by 10 feet.
* You don’t provoke opportunity attacks.
* You can move through the space of another creature, and it doesn’t count as difficult terrain. If you end your turn in another creature’s space, you are shunted to the last unoccupied space you occupied, and you take 1d8 force damage.`,
      page: '',
      range: 'Self',
      components: ['S'],
      material: null,
      ritual: false,
      duration: '1 minute',
      concentration: true,
      casting_time: '1 bonus action',
      level: 2,
      school: SCHOOL.TRANSMUTATION,
      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.BUFF, DAMAGE_EFFECT.MOVEMENT],
    },
    {
      name: 'Silvery Barbs',
      desc: `You magically distract the triggering creature and turn its momentary uncertainty into encouragement for another creature. The triggering creature must reroll the d20 and use the lower roll.

You can then choose a different creature you can see within range (you can choose yourself). The chosen creature has advantage on the next attack roll, ability check, or saving throw it makes within 1 minute. A creature can be empowered by only one use of this spell at a time.`,
      page: '',
      range: '60 feet',
      components: ['V'],
      material: null,
      ritual: false,
      duration: 'Instantaneous',
      concentration: true,
      casting_time: '1 reaction',
      casting_time_modifier:
        'a creature you can see within 60 feet of yourself succeeds on an attack roll, an ability check, or a saving throw',
      level: 1,
      school: SCHOOL.ENCHANTMENT,
      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.BUFF, DAMAGE_EFFECT.DEBUFF],
    },
    {
      name: 'Vortex Warp',
      desc: `You magically twist space around another creature you can see within range. The target must succeed on a Constitution saving throw (the target can choose to fail), or the target is teleported to an unoccupied space of your choice that you can see within range. The chosen space must be on a surface or in a liquid that can support the target without the target having to squeeze.`,
      higher_level:
        'When you cast this spell using a spell slot of 3rd level or higher, the range of the spell increases by 30 feet for each slot level above 2nd.',
      page: '',
      range: '90 feet',
      components: ['V', 'S'],
      material: null,
      ritual: false,
      duration: 'Instantaneous',
      concentration: false,
      casting_time: '1 action',
      level: 2,
      school: SCHOOL.CONJURATION,
      attack_save: [ATTACK_SAVE.CONSTITUTION],
      damage_effect: [DAMAGE_EFFECT.TELEPORTATION],
    },
    {
      name: 'Wither and Bloom',
      desc: `You invoke both death and life upon a 10-foot-radius sphere centered on a point within range. Each creature of your choice in that area must make a Constitution saving throw, taking 2d6 necrotic damage on a failed save, or half as much damage on a successful one. Nonmagical vegetation in that area withers.

In addition, one creature of your choice in that area can spend and roll one of its unspent Hit Dice and regain a number of hit points equal to the roll plus your spellcasting ability modifier.`,
      higher_level:
        'When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6 for each slot above 2nd, and the number of Hit Dice that can be spent and added to the healing roll increases by one for each slot above 2nd.',
      page: '',
      range: '60 feet',
      components: ['V', 'S', 'M'],
      material: 'A withered vine twisted into a loop',
      ritual: false,
      duration: 'Instantaneous',
      concentration: false,
      casting_time: '1 action',
      level: 2,
      school: SCHOOL.NECROMANCY,
      attack_save: [ATTACK_SAVE.CONSTITUTION],
      damage_effect: [DAMAGE_EFFECT.NECROTIC, DAMAGE_EFFECT.HEALING],
    },
  ],
};

export default data;
