export const MONSTERS = {
  url: (id) => `https://www.dndbeyond.com/monsters/${id}`,
  keywords: [
    'skeleton',
    'zombie',
    {
      regex: 'ghoul(?:s)?',
      id: 'Ghoul',
    },
    {
      regex: 'ghast(?:s)?',
      id: 'Ghast',
    },
    {
      regex: 'wight(?:s)?',
      id: 'Wight',
    },
    {
      regex: 'mumm(?:y|ies)',
      id: 'Mummy',
    },
    'homunculus',
    'awakened shrub',
    'awakened tree',
    'bat',
    'cat',
    'crab',
    'frog',
    'hawk',
    'lizard',
    'octopus',
    'owl',
    'poisonous snake',
    'quipper',
    'rat',
    'raven',
    'spider',
    'weasel',
    'griffon',
    'pegasus',
    'peryton',
    'dire wolf',
    'rhinoceros',
    'saber-toothed tiger',
    'warhorse',
    'pony',
    'camel',
    'elk',
    'mastiff',
    'air elemental',
    'barbed devil',
    'bearded devil',
    'shadow demon',
    'barlgura',
    'manes',
    {
      regex: 'dretch(?:es)?',
      id: 'Dretch',
    },
    'lich',
    'minotaur',
    'goristro',
  ],
};

function getTypeId(type) {
  const ids = {
    beast: 2,
    celestial: 3,
    demon: 9,
    devil: 10,
    elemental: 7,
    'fey creature': 8,
  };

  return ids[type];
}

function getCrId(cr) {
  const ids = {
    '1/4': 3,
    '1/2': 4,
    '1': 5,
    '2': 6,
    '3': 7,
    '4': 8,
    '5': 9,
    '6': 10,
  };

  return ids[cr];
}

export const MONSTER_GROUPS = {
  url: ([type, cr]) => {
    const typeId = getTypeId(type);
    const crId = getCrId(cr);

    return `https://www.dndbeyond.com/monsters?filter-type=${typeId}&filter-cr-max=${crId}&sort=-cr`;
  },
  keywords: [
    {
      regex:
        '(beast|celestial|demon|devil|elemental|fey creature)(?:s)? of challenge rating (\\d\\/?\\d?)',
      flag: 'gi',
    },
  ],
};
