import { SourceType } from '../types';
import { DAMAGE_EFFECT, SCHOOL, SOURCE_TYPE } from '../const';

const data: SourceType = {
  meta: {
    name: 'Spelljammer: Adventures in Space',
    abbreviation: 'sais',
    type: SOURCE_TYPE.SOURCEBOOK,
  },
  spells: [
    {
      name: 'Air Bubble',
      level: 2,
      school: SCHOOL.CONJURATION,
      casting_time: '1 action',
      range: '60 feet',
      components: ['S'],
      material: null,
      concentration: false,
      duration: '24 hours',
      desc: `You create a spectral globe around the head of a willing creature you can see within range. The globe is filled with fresh air that lasts until the spell ends. If the creature has more than one head, the globe of air appears around only one of its heads (which is all the creature needs to avoid suffocation, assuming that all its heads share the same respiratory system).`,
      higher_level: `When you cast this spell using a spell slot of 3rd level or higher, you can create two additional globes of fresh air for each slot level above 2nd.`,
      page: null,
      ritual: false,
      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.UTILITY],
    },
    {
      name: 'Create Spelljamming Helm',
      level: 5,
      school: SCHOOL.TRANSMUTATION,
      casting_time: '1 action',
      range: 'touch',
      components: ['V', 'S', 'M'],
      material: `a crystal rod worth at least 5,000 gp, which the spell consumes`,
      concentration: false,
      duration: 'Instantaneous',
      desc: `Holding the rod used in the casting of the spell, you touch a Large or smaller chair that is unoccupied. The rod disappears, and the chair is transformed into a spelljamming helm.`,
      higher_level: null,
      page: null,
      ritual: false,
      attack_save: null,
      damage_effect: [DAMAGE_EFFECT.UTILITY],
    },
  ],
};

export default data;
