import { ATTACK_SAVE, DAMAGE_EFFECT, SCHOOL } from 'data/const';

const data = {
  meta: {
    name: "Tasha's Cauldron of Everything",
    abbreviation: 'tcoe',
  },
  spells: [
    {
      name: 'Booming Blade',
      desc: `As part of the action used the cast this spell, you must make a melee attack with a weapon against one create within the spell's range otherwise the spell fails. On a hit, the target suffers the attack's normal effects, and it becomes sheathed in booming energy until the start of your next turn. If the target willingly moves before then, it immediately takes 1d8 thunder damage, and the spell ends.

This spell's damage increases when you reach higher levels. At 5th level, the melee attack deals an extra 1d8 thunder damage to the target, and the damage the target take for moving increases to 2d8. Both damage rolls increase by 1d8 at 11th level and 17th level.`,
      page: '',
      range: '5 feet',
      components: ['V', 'M'],
      material: 'a melee weapon worth at least 1 sp',
      ritual: false,
      duration: '1 round',
      concentration: false,
      casting_time: '1 action',
      level: 0,
      school: SCHOOL.EVOCATION,

      attack_save: ATTACK_SAVE.MELEE,
      damage_effect: [DAMAGE_EFFECT.THUNDER],
    },
    {
      name: 'Green-Flame Blade',
      desc: `As part of the action used the cast this spell, you must make a melee attack with a weapon against one create within the spell's range otherwise the spell fails. On a hit, the target suffers the attack's normal effects, and green fire leaps from the target to a different creature of your choice that you can see within 5 feet of it. The second creature take fire damage equal to your spellcasting modifier.

This spell's damage increases when you reach higher levels. At 5th level, the melee attack deals an extra 1d8 fire damage to the target, and the fire damage to the second creature increases to 18d + your spellcasting ability modifier. Both damage rolls increase by 1d8 at 11th level and 17th level.`,
      page: '',
      range: '5 feet',
      components: ['V', 'M'],
      material: 'a melee weapon worth at least 1 sp',
      ritual: false,
      duration: 'Instantaneous',
      concentration: false,
      casting_time: '1 action',
      level: 0,
      school: SCHOOL.EVOCATION,

      attack_save: ATTACK_SAVE.MELEE,
      damage_effect: [DAMAGE_EFFECT.FIRE],
    },
    {
      name: 'Lightning Lure',
      desc: `You create a lash of lightning energy that strikes at one creature of your choice that you can see within range. The target must succeed on a Strength saving throw or be pulled up to 10 feet in a straight line toward you and then take 1d8 lightning damage if it is within 5 feet of you.

This spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).`,
      page: '',
      range: '15 feet',
      components: ['V'],
      ritual: false,
      duration: 'Instantaneous',
      concentration: false,
      casting_time: '1 action',
      level: 0,
      school: SCHOOL.EVOCATION,

      attack_save: ATTACK_SAVE.STRENGTH,
      damage_effect: [DAMAGE_EFFECT.LIGHTNING],
    },
    {
      name: 'Mind Sliver',
      desc: `You drive a disorienting spike of psychic energy into the mind of one creature you can see within range. The target must succeed on an Intelligence saving throw or take 1d6 psychic damage and subtract 1d4 from the next saving throw it makes before the end of your next turn.

This spell’s damage increases by 1d6 when you reach certain levels: 5th level (2d6), 11th level (3d6), and 17th level (4d6).`,
      page: '',
      range: '60 feet',
      components: ['V'],
      ritual: false,
      duration: 'Instantaneous',
      concentration: false,
      casting_time: '1 action',
      level: 0,
      school: SCHOOL.ENCHANTMENT,

      attack_save: ATTACK_SAVE.INTELLIGENCE,
      damage_effect: [DAMAGE_EFFECT.PSYCHIC],
    },
    {
      name: 'Sword Burst',
      desc: `You create a momentary circle of spectral blades that sweep around you. Each creature within range, other than you, must succeed on a Dexterity saving throw or take 1d6 force damage.

This spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).`,
      page: '',
      range: '5 feet',
      components: ['V'],
      ritual: false,
      duration: 'Instantaneous',
      concentration: false,
      casting_time: '1 action',
      level: 0,
      school: SCHOOL.CONJURATION,

      attack_save: ATTACK_SAVE.DEXTERITY,
      damage_effect: [DAMAGE_EFFECT.FORCE],
    },
    {
      name: `Tasha's Caustic Brew`,
      desc: `A stream of acid emanates from you in a line 30 feet long and 5 feet wide in a direction you choose. Each creature in the line must succeed on a Dexterity saving throw or be covered in acid for the spell’s duration or until a creature uses its action to scrape or wash the acid off itself or another creature. A creature covered in the acid takes 2d4 acid damage at start of each of its turns.`,
      higher_level: `When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 2d4 for each slot level above 1st.`,
      page: '',
      range: 'Self',
      components: ['V', 'S', 'M'],
      material: 'a bit of rotten food',
      ritual: false,
      duration: '1 minute',
      concentration: true,
      casting_time: '1 action',
      level: 1,
      school: SCHOOL.EVOCATION,

      attack_save: ATTACK_SAVE.DEXTERITY,
      damage_effect: [DAMAGE_EFFECT.ACID],
    },
    {
      name: `Summon Beast`,
      desc: `You call forth a bestial spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Bestial Spirit stat block. When you cast the spell, choose an environment: Air, Land, or Water. The creature resembles an animal of your choice that is native to the chosen environment, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.

The creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger.`,
      higher_level: `When you cast this spell using a spell slot of 3rd level or higher, use the higher level wherever the spell’s level appears in the stat block.`,
      page: '',
      range: '90 ft',
      components: ['V', 'S', 'M'],
      material:
        'a feather, tuft of fur, and fish tail inside a gilded acorn worth at least 200 gp',
      ritual: false,
      duration: '1 hour',
      concentration: true,
      casting_time: '1 action',
      level: 2,
      school: SCHOOL.CONJURATION,

      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.SUMMONING],
    },
    {
      name: `Tasha's Mind Whip`,
      desc: `You psychically lash out at one creature you can see within range. The target must make an Intelligence saving throw. On a failed save, the target takes 3d6 psychic damage, and it can’t take a reaction until the end of its next turn. Moreover, on its next turn, it must choose whether it gets a move, an action, or a bonus action; it gets only one of the three. On a successful save, the target takes half as much damage and suffers none of the spell’s other effects.`,
      higher_level: `When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd. The creatures must be within 30 feet of each other when you target them.`,
      page: '',
      range: '90 ft',
      components: ['V'],
      material: null,
      ritual: false,
      duration: '1 round',
      concentration: false,
      casting_time: '1 action',
      level: 2,
      school: SCHOOL.CONJURATION,

      attack_save: ATTACK_SAVE.INTELLIGENCE,
      damage_effect: [DAMAGE_EFFECT.PSYCHIC],
    },
    {
      name: `Intellect Fortress`,
      desc: `For the duration, you or one willing creature you can see within range has resistance to psychic damage, as well as advantage on Intelligence, Wisdom, and Charisma saving throws.`,
      higher_level: `When you cast this spell using a spell slot of 4th level or higher, you can target one additional creature for each slot level above 3rd. The creatures must be within 30 feet of each other when you target them.`,
      page: '',
      range: '90 ft',
      components: ['V'],
      material: null,
      ritual: false,
      duration: '1 hour',
      concentration: true,
      casting_time: '1 action',
      level: 3,
      school: SCHOOL.ABJURATION,
      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.BUFF],
    },
    {
      name: `Spirit Shroud`,
      desc: `You call forth spirits of the dead, which flit around you for the spell’s duration. The spirits are intangible and invulnerable.

Until the spell ends, any attack you make deals 1d8 extra damage when you hit a creature within 10 feet of you. This damage is radiant, necrotic, or cold (your choice when you cast the spell). Any creature that takes this damage can’t regain hit points until the start of your next turn.

In addition, any creature of your choice that you can see that starts its turn within 10 feet of you has its speed reduced by 10 feet until the start of your next turn.`,
      higher_level: `When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d8 for every two slot levels above 3rd.`,
      page: '',
      range: 'Self',
      components: ['V', 'S'],
      material: null,
      ritual: false,
      duration: '1 minute',
      concentration: true,
      casting_time: '1 bonus action',
      level: 3,
      school: SCHOOL.NECROMANCY,
      attack_save: null,
      damage_effect: [
        DAMAGE_EFFECT.COLD,
        DAMAGE_EFFECT.NECROTIC,
        DAMAGE_EFFECT.RADIANT,
      ],
    },
    {
      name: `Summon Fey`,
      desc: `You call forth a fey spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Fey Spirit stat block. When you cast the spell, choose a mood: Fuming, Mirthful, or Tricksy. The creature resembles a fey creature of your choice marked by the chosen mood, which determines one of the traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.

The creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger.`,
      higher_level: `When you cast this spell using a spell slot of 4th level or higher, use the higher level wherever the spell’s level appears in the stat block.`,
      page: '',
      range: '90 ft',
      components: ['V', 'S', 'M'],
      material: 'a gilded flower worth at least 300 gp',
      ritual: false,
      duration: '1 hour',
      concentration: true,
      casting_time: '1 action',
      level: 3,
      school: SCHOOL.CONJURATION,

      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.SUMMONING],
    },
    {
      name: `Summon Shadowspawn`,
      desc: `You call forth a shadowy spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Shadow Spirit stat block. When you cast the spell, choose an emotion: Fury, Despair, or Fear. The creature resembles a misshapen biped marked by the chosen emotion, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.

The creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger.`,
      higher_level: `When you cast this spell using a spell slot of 4th level or higher, use the higher level wherever the spell’s level appears in the stat block.`,
      page: '',
      range: '90 ft',
      components: ['V', 'S', 'M'],
      material: 'tears inside a gem worth at least 300 gp',
      ritual: false,
      duration: '1 hour',
      concentration: true,
      casting_time: '1 action',
      level: 3,
      school: SCHOOL.CONJURATION,

      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.SUMMONING],
    },
    {
      name: `Summon Undead`,
      desc: `You call forth an undead spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Undead Spirit stat block. When you cast the spell, choose the creature’s form: Ghostly, Putrid, or Skeletal. The spirit resembles an undead creature with the chosen form, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.

The creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger.`,
      higher_level: `When you cast this spell using a spell slot of 4th level or higher, use the higher level wherever the spell’s level appears in the stat block.`,
      page: '',
      range: '90 ft',
      components: ['V', 'S', 'M'],
      material: 'a gilded skull worth at least 300 gp',
      ritual: false,
      duration: '1 hour',
      concentration: true,
      casting_time: '1 action',
      level: 3,
      school: SCHOOL.NECROMANCY,

      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.SUMMONING],
    },
    {
      name: `Summon Abberation`,
      desc: `You call forth an aberrant spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Aberrant Spirit stat block. When you cast the spell, choose Beholderkin, Slaad, or Star Spawn. The creature resembles an aberration of that kind, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.

The creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger.`,
      higher_level: `When you cast this spell using a spell slot of 4th level or higher, use the higher level wherever the spell’s level appears in the stat block.`,
      page: '',
      range: '90 ft',
      components: ['V', 'S', 'M'],
      material:
        'a pickled tentacle and an eyeball in a platinum-inlaid vial worth at least 400 gp',
      ritual: false,
      duration: '1 hour',
      concentration: true,
      casting_time: '1 action',
      level: 4,
      school: SCHOOL.CONJURATION,

      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.SUMMONING],
    },
    {
      name: `Summon Construct`,
      desc: `You call forth the spirit of a construct. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Construct Spirit stat block. When you cast the spell, choose a material: Clay, Metal, or Stone. The creature resembles a golem or a modron (your choice) made of the chosen material, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.

The creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger.`,
      higher_level: `When you cast this spell using a spell slot of 4th level or higher, use the higher level wherever the spell’s level appears in the stat block.`,
      page: '',
      range: '90 ft',
      components: ['V', 'S', 'M'],
      material: 'an ornate stone and metal lockbox worth at least 400 gp',
      ritual: false,
      duration: '1 hour',
      concentration: true,
      casting_time: '1 action',
      level: 4,
      school: SCHOOL.CONJURATION,

      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.SUMMONING],
    },
    {
      name: `Summon Elemental`,
      desc: `You call forth an elemental spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Elemental Spirit stat block. When you cast the spell, choose an element: Air, Earth, Fire, or Water. The creature resembles a bipedal form wreathed in the chosen element, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.

The creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger.`,
      higher_level: `When you cast this spell using a spell slot of 4th level or higher, use the higher level wherever the spell’s level appears in the stat block.`,
      page: '',
      range: '90 ft',
      components: ['V', 'S', 'M'],
      material:
        'air, a pebble, ash, and water inside a gold-inlaid vial worth at least 400 gp',
      ritual: false,
      duration: '1 hour',
      concentration: true,
      casting_time: '1 action',
      level: 4,
      school: SCHOOL.CONJURATION,
      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.SUMMONING],
    },
    {
      name: `Summon Celestial`,
      desc: `You call forth a celestial spirit. It manifests in an angelic form in an unoccupied space that you can see within range. This corporeal form uses the Celestial Spirit stat block. When you cast the spell, choose Avenger or Defender. Your choice determines the creature’s attack in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.

The creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger.`,
      higher_level: `When you cast this spell using a spell slot of 4th level or higher, use the higher level wherever the spell’s level appears in the stat block.`,
      page: '',
      range: '90 ft',
      components: ['V', 'S', 'M'],
      material: 'a golden reliquary worth at least 500 gp',
      ritual: false,
      duration: '1 hour',
      concentration: true,
      casting_time: '1 action',
      level: 5,
      school: SCHOOL.CONJURATION,

      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.SUMMONING],
    },
    {
      name: `Summon Fiend`,
      desc: `You call forth a fiendish spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Fiendish Spirit stat block. When you cast the spell, choose Demon, Devil, or Yugoloth. The creature resembles a fiend of the chosen type, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.

The creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger.`,
      higher_level: `When you cast this spell using a spell slot of 4th level or higher, use the higher level wherever the spell’s level appears in the stat block.`,
      page: '',
      range: '90 ft',
      components: ['V', 'S', 'M'],
      material: 'humanoid blood inside a ruby vial worth at least 600 gp',
      ritual: false,
      duration: '1 hour',
      concentration: true,
      casting_time: '1 action',
      level: 6,
      school: SCHOOL.CONJURATION,

      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.SUMMONING],
    },
    {
      name: `Tasha's Otherwordly Guide`,
      desc: `Uttering an incantation, you draw on the magic of the Lower Planes or Upper Planes (your choice) to transform yourself. You gain the following benefits until the spell ends:

* You are immune to fire and poison damage (Lower Planes) or radiant and necrotic damage (Upper Planes).
* You are immune to the poisoned condition (Lower Planes) or the charmed condition (Upper Planes).
* Spectral wings appear on your back, giving you a flying speed of 40 feet.
* You have a +2 bonus to AC.
* All your weapon attacks are magical, and when you make a weapon attack, you can use your spellcasting ability modifier, instead of Strength or Dexterity, for the attack and damage rolls.
* You can attack twice, instead of once, when you take the Attack action on your turn. You ignore this benefit if you already have a feature, like Extra Attack, that lets you attack more than once when you take the Attack action on your turn.`,
      higher_level: null,
      page: '',
      range: 'Self',
      components: ['V', 'S', 'M'],
      material:
        'an object engraved with a symbol of the Outer Planes, worth at least 500 gp',
      ritual: false,
      duration: '1 minute',
      concentration: true,
      casting_time: '1 bonus action',
      level: 6,
      school: SCHOOL.TRANSMUTATION,

      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.BUFF],
    },
    {
      name: `Dream of the Blue Veil`,
      desc: `You and up to eight willing creatures within range fall unconscious for the spell’s duration and experience visions of another world on the Material Plane, such as Oerth, Toril, Krynn, or Eberron. If the spell reaches its full duration, the visions conclude with each of you encountering and pulling back a mysterious blue curtain. The spell then ends with you mentally and physically transported to the world that was in the visions.

To cast this spell, you must have a magic item that originated on the world you wish to reach, and you must be aware of the world’s existence, even if you don’t know the world’s name. Your destination in the other world is a safe location within 1 mile of where the magic item was created. Alternatively, you can cast the spell if one of the affected creatures was born on the other world, which causes your destination to be a safe location within 1 mile of where that creature was born.

The spell ends early on a creature if that creature takes any damage, and the creature isn’t transported. If you take any damage, the spell ends for you and all the other creatures, with none of you being transported.`,
      higher_level: null,
      page: '',
      range: '20 ft',
      components: ['V', 'S', 'M'],
      material: 'a magic item or a willing creature from the destination world',
      ritual: false,
      duration: '6 hours',
      concentration: true,
      casting_time: '10 minutes',
      level: 7,
      school: SCHOOL.CONJURATION,
      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.TELEPORTATION],
    },
    {
      name: `Blade of Disaster`,
      desc: `You create a blade-shaped planar rift about 3 feet long in an unoccupied space you can see within range. The blade lasts for the duration. When you cast this spell, you can make up to two melee spell attacks with the blade, each one against a creature, loose object, or structure within 5 feet of the blade. On a hit, the target takes 4d12 force damage. This attack scores a critical hit if the number on the d20 is 18 or higher. On a critical hit, the blade deals an extra 8d12 force damage (for a total of 12d12 force damage).

As a bonus action on your turn, you can move the blade up to 30 feet to an unoccupied space you can see and then make up to two melee spell attacks with it again.

The blade can harmlessly pass through any barrier, including a wall of force.`,
      higher_level: null,
      page: '',
      range: '60 ft',
      components: ['V', 'S'],
      material: null,
      ritual: false,
      duration: '1 minute',
      concentration: true,
      casting_time: '1 bonus action',
      level: 9,
      school: SCHOOL.CONJURATION,

      attack_save: ATTACK_SAVE.MELEE,
      damage_effect: [DAMAGE_EFFECT.FORCE],
    },
  ],
};

export default data;
