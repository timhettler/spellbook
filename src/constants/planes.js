export const PLANES = {
  url: (id) =>
    `https://www.dndbeyond.com/sources/dmg/creating-a-multiverse#${id}`,
  keywords: [
    {
      regex: 'astral plane',
      id: 'AstralPlane',
    },
    {
      regex: 'ethereal plane',
      id: 'EtherealPlane',
    },
    'Feywild',
    'Shadowfell',
    {
      regex: 'plane of fire',
      id: 'PlaneOfFire',
    },
    {
      regex: 'outer planes',
      id: 'OuterPlanes',
    },
    {
      regex: 'the abyss',
      id: 'TheAbyss',
    },
    {
      regex: 'the nine hells',
      id: 'TheNineHells',
    },
  ],
};
