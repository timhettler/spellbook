import { SourceType } from '../types';
import { ATTACK_SAVE, DAMAGE_EFFECT, SCHOOL, SOURCE_TYPE } from '../const';

const data: SourceType = {
  meta: {
    name: "Fizban's Treasury of Dragons",
    abbreviation: 'ftod',
    type: SOURCE_TYPE.SOURCEBOOK,
  },
  spells: [
    {
      name: "Ashardalon's Stride",
      level: 3,
      school: SCHOOL.TRANSMUTATION,
      casting_time: '1 bonus action',
      material: null,
      range: 'Self',
      components: ['V', 'S'],
      concentration: true,
      duration: '1 minute',
      desc: `The billowing flames of a dragon blast from your feet, granting you explosive speed. For the duration, your speed increases by 20 feet and moving doesn\'t provoke opportunity attacks.

When you move within 5 feet of a creature or an object that isn\'t being worn or carried, it takes 1d6 fire damage from your trail of heat. A creature or object can take this damage only once during a turn.`,
      higher_level: `When you cast this spell using a spell slot of 4th level or higher, increase your speed by 5 feet for each spell slot level above 3rd. The spell deals an additional 1d6 fire damage for each slot level above 3rd.`,
      page: null,
      ritual: false,
      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.FIRE, DAMAGE_EFFECT.MOVEMENT],
    },
    {
      name: 'Draconic Transformation',
      level: 7,
      school: SCHOOL.TRANSMUTATION,
      casting_time: '1 bonus action',
      range: 'Self',
      components: ['V', 'S', 'M'],
      material: 'a statuette of a dragon, worth at least 500 gp',
      concentration: true,
      duration: '1 minute',
      desc: `With a roar, you draw on the magic of dragons to transform yourself, taking on draconic features. You gain the following benefits until the spell ends:
      
### Blindsight

You have blindsight with a range of 30 feet. Within that range, you can effectively see anything that isn\'t behind total cover, even if you\'re blinded or in darkness. Moreover, you can see an invisible creature, unless the creature successfully hides from you.

### Breath Weapon

When you cast this spell, and as a bonus action on subsequent turns for the duration, you can exhale shimmering energy in a 60-foot cone. Each creature in that area must make a Dexterity saving throw, taking 6d8 force damage on a failed save, or half as much damage on a successful one.

### Wings

Incorporeal wings sprout from your back, giving you a flying speed of 60 feet.`,
      higher_level: null,
      page: null,
      ritual: false,
      attack_save: ATTACK_SAVE.DEXTERITY,
      damage_effect: [DAMAGE_EFFECT.FORCE, DAMAGE_EFFECT.MOVEMENT],
    },
    {
      name: "Fizban's Platinum Shield",
      level: 6,
      school: SCHOOL.ABJURATION,
      casting_time: '1 bonus action',
      range: '60 feet',
      components: ['V', 'S', 'M'],
      material: 'a platinum-plated dragon scale, worth at least 500 gp',
      concentration: true,
      duration: '1 minute',
      desc: `You create a field of silvery light that surrounds a creature of your choice within range (you can choose yourself). The field sheds dim light out to 5 feet. While surrounded by the field, a creature gains the following benefits:

### Cover

The creature has half cover.

### Damage Resistance

The creature has resistance to acid, cold, fire, lightning, and poison damage.

### Evasion

If the creature is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the creature instead takes no damage if it succeeds on the saving throw, and only half damage if it fails.

As a bonus action on subsequent turns, you can move the field to another creature within 60 feet of the field.`,
      higher_level: null,
      page: null,
      ritual: false,
      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.BUFF],
    },
    {
      name: "Nathair's Mischief",
      level: 2,
      school: SCHOOL.ILLUSION,
      casting_time: '1 action',
      range: '60 feet',
      components: ['S', 'M'],
      material: 'a piece of crust from an apple pie',
      concentration: true,
      duration: '1 minute',
      desc: `You fill a 20-foot cube you can see within range with fey and draconic magic. Roll on the Mischievous Surge table to determine the magical effect produced, and roll again at the start of each of your turns until the spell ends. You can move the cube up to 10 feet before you roll.

<table><thead><tr><th>4</th><th>Effect</th></thead><tbody><tr><td>1</td><td>The smell of apple pie fills the air, and each creature in the cube must succeed on a Wisdom saving throw or become charmed by you until the start of your next turn.</td></tr>
<tr><td>2</td><td>Bouquets of flowers appear all around, and each creature in the cube must succeed on a Dexterity saving throw or be blinded until the start of your next turn as the flowers spray water in their faces.</td></tr>
<tr><td>3</td><td>Each creature in the cube must succeed on a Wisdom saving throw or begin giggling until the start of your next turn. A giggling creature is incapacitated and uses all its movement to move in a random direction.</td></tr>
<tr><td>4</td><td>Drops of molasses hover in the cube, making it difficult terrain until the start of your next turn.</td></tr></tbody></table>`,
      higher_level: null,
      page: null,
      ritual: false,
      attack_save: [ATTACK_SAVE.WISDOM, ATTACK_SAVE.DEXTERITY],
      damage_effect: [
        DAMAGE_EFFECT.CHARMED,
        DAMAGE_EFFECT.BLINDED,
        DAMAGE_EFFECT.INCAPACITATED,
      ],
    },
    {
      name: "Raulothim's Psychic Lance",
      level: 4,
      school: SCHOOL.ENCHANTMENT,
      casting_time: '1 action',
      range: '120 feet',
      components: ['V'],
      material: null,
      concentration: true,
      duration: 'Instantaneous',
      desc: `You unleash a shimmering lance of psychic power from your forehead at a creature that you can see within range. Alternatively, you can utter a creature\'s name. If the named target is within range, it becomes the spell\'s target even if you can\'t see it. If the named target isn\'t within range, the lance dissipates without effect.

The target must make an Intelligence saving throw. On a failed save, the target takes 7d6 psychic damage and is incapacitated until the start of your next turn. On a successful save, the creature takes half as much damage and isn\'t incapacitated.`,
      higher_level: `When you cast this spell using a spell slot of 5th level or higher, the damage increases by 1d6 for each slot level above 4th.`,
      page: null,
      ritual: false,
      attack_save: ATTACK_SAVE.INTELLIGENCE,
      damage_effect: [DAMAGE_EFFECT.PSYCHIC, DAMAGE_EFFECT.INCAPACITATED],
    },
    {
      name: "Rime's Binding Ice",
      level: 2,
      school: SCHOOL.EVOCATION,
      casting_time: '1 action',
      range: 'Self (30-foot cone)',
      components: ['S', 'M'],
      material: 'a vial of meltwater',
      concentration: false,
      duration: 'Instantaneous',
      desc: `A burst of cold energy emanates from you in a 30-foot cone. Each creature in that area must make a Constitution saving throw. On a failed save, a creature takes 3d8 cold damage and is hindered by ice formations for 1 minute, or until it or another creature within reach of it uses an action to break away the ice. A creature hindered by ice has its speed reduced to 0. On a successful save, a creature takes half as much damage and isn\'t hindered by ice.`,
      higher_level: `When you cast this spell using a spell slot of 3rd level or higher, increase the cold damage by 1d8 for each slot level above 2nd.`,
      page: null,
      ritual: false,
      attack_save: ATTACK_SAVE.CONSTITUTION,
      damage_effect: [DAMAGE_EFFECT.COLD, DAMAGE_EFFECT.MOVEMENT],
    },
    {
      name: 'Summon Draconic Spirit',
      level: 5,
      school: SCHOOL.CONJURATION,
      casting_time: '1 action',
      range: '60 feet',
      components: ['V', 'S', 'M'],
      material: `an object with the image of a dragon engraved on it, worth at least 500 gp`,
      concentration: true,
      duration: '1 hour',
      desc: `You call forth a draconic spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Draconic Spirit stat block. When you cast this spell, choose a family of dragon: chromatic, gem, or metallic. The creature resembles a dragon of the chosen family, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.

The creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don\'t issue any, it takes the Dodge action and uses its move to avoid danger.`,
      higher_level: `When you cast this spell using a spell slot of 6th level or higher, use the higher level wherever the spell\'s level appears in the stat block.`,
      page: null,
      ritual: false,
      attack_save: ATTACK_SAVE.DEXTERITY,
      damage_effect: [
        DAMAGE_EFFECT.SUMMONING,
        DAMAGE_EFFECT.BUFF,
        DAMAGE_EFFECT.PIERCING,
        DAMAGE_EFFECT.ACID,
        DAMAGE_EFFECT.COLD,
        DAMAGE_EFFECT.FIRE,
        DAMAGE_EFFECT.LIGHTNING,
        DAMAGE_EFFECT.POISON,
        DAMAGE_EFFECT.FORCE,
        DAMAGE_EFFECT.NECROTIC,
        DAMAGE_EFFECT.PSYCHIC,
        DAMAGE_EFFECT.RADIANT,
        DAMAGE_EFFECT.THUNDER,
      ],
    },
  ],
};

export default data;
