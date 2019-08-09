const conditions = [
  'blinded',
  'charmed',
  'deafened',
  'exhaustion',
  'frightened',
  'grappled',
  'incapacitated',
  'invisible',
  'paralyzed',
  'petrified',
  'poisoned',
  'prone',
  'restrained',
  'stunned',
  'unconscious',
];

const senses = ['blindsight', 'darkvision', 'tremorsense', 'truesight'];

const monsters = [
  'skeleton',
  'zombie',
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
];

const monsterGroups = [
  {
    keyword: 'beasts of challenge rating 1/4 or lower',
    url:
      'https://www.dndbeyond.com/monsters?filter-type=2&filter-cr-max=3&sort=-cr',
  },
  {
    keyword: 'beasts of challenge rating 1/2 or lower',
    url:
      'https://www.dndbeyond.com/monsters?filter-type=2&filter-cr-max=4&sort=-cr',
  },
  {
    keyword: 'beasts of challenge rating 1 or lower',
    url:
      'https://www.dndbeyond.com/monsters?filter-type=2&filter-cr-max=5&sort=-cr',
  },
  {
    keyword: 'beast of challenge rating 2 or lower',
    url:
      'https://www.dndbeyond.com/monsters?filter-type=2&filter-cr-max=6&sort=-cr',
  },
  {
    keyword: 'beast of challenge rating 6 or lower',
    url:
      'https://www.dndbeyond.com/monsters?filter-type=2&filter-cr-max=10&sort=-cr',
  },
  {
    keyword: 'celestial of challenge rating 4 or lower',
    url:
      'https://www.dndbeyond.com/monsters?filter-type=3&filter-cr-max=8&sort=-cr',
  },
  {
    keyword: 'elemental of challenge rating 5 or lower',
    url:
      'https://www.dndbeyond.com/monsters?filter-type=7&filter-cr-max=9&sort=-cr',
  },
  {
    keyword: 'fey creature of challenge rating 6 or lower',
    url:
      'https://www.dndbeyond.com/monsters?filter-type=8&filter-cr-max=10&sort=-cr',
  },
  {
    keyword: 'devil of challenge rating 6 or lower',
    url:
      'https://www.dndbeyond.com/monsters?filter-type=9&filter-cr-max=10&filter-sub-types=10&sort=-cr',
  },
  {
    keyword: 'demon of challenge rating 5 or lower',
    url:
      'https://www.dndbeyond.com/monsters?filter-type=9&filter-cr-max=9&filter-sub-types=9&sort=-cr',
  },
];

const planes = ['Astral Plane', 'Ethereal Plane', 'Feywild', 'Shadowfell'];

function formatStringForUrl(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).replace(' ', '-');
}

function getHyperlink(full, before, keyword, after) {
  const urls = {
    conditions:
      'https://www.dndbeyond.com/sources/basic-rules/appendix-a-conditions#',
    senses: 'https://www.dndbeyond.com/sources/basic-rules/monsters#',
    monsters: 'https://www.dndbeyond.com/monsters/',
    planes: 'https://www.dndbeyond.com/sources/dmg/creating-a-multiverse#',
  };

  let url = '';

  if (conditions.includes(keyword)) {
    url = urls.conditions;
  } else if (senses.includes(keyword)) {
    url = urls.senses;
  } else if (monsters.includes(keyword)) {
    url = urls.monsters;
  } else if (planes.includes(keyword)) {
    url = urls.planes;
  }

  if (url) {
    url = `${url}${formatStringForUrl(keyword)}`;
  } else if (monsterGroups.map(i => i.keyword).includes(keyword)) {
    url = monsterGroups.find(i => i.keyword === keyword).url;
  }

  if (!url) {
    return full;
  }

  return `${before}<a href="${url}" target="_blank">${keyword}</a>${after}`;
}

function getHyperlinkedString(string) {
  const allKeywords = [].concat(
    conditions,
    senses,
    monsters,
    monsterGroups.map(i => i.keyword),
    planes
  );

  const replacer = (match, p1, p2, p3) => {
    return `<i class="keyword">${getHyperlink(match, p1, p2, p3)}</i>`;
  };

  var re = new RegExp(`(\\s)(${allKeywords.join('|')})(\\s|\\.|,)`, 'gi');

  return string.replace(re, replacer);
}

export default getHyperlinkedString;
