import { ATTACK_SAVE, DAMAGE_EFFECT, SCHOOL, SOURCE_TYPE } from './const';

export interface SpellType {
  name: string;
  desc: string;
  higher_level?: string | null;
  page: string | null;
  range: string;
  components: string[];
  material?: string | null;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  casting_time_modifier?: string;
  level: number;
  school: SCHOOL | string; // TODO gotta refactor old sources
  attack_save?: ATTACK_SAVE | ATTACK_SAVE[] | null;
  saving_throw?: string; // TODO refactor to be attack_save
  damage_effect?: DAMAGE_EFFECT[] | null;
}

export interface SubclassType {
  name: string;
  spell_list: string[] | [];
}

export interface ClassType {
  name: string;
  subclass_label: string;
  subclasses: SubclassType[];
  spell_list: string[] | [];
  additional_spells?: string[] | [];
}

export interface SourceType {
  meta: {
    name: string;
    abbreviation: string;
    type: SOURCE_TYPE;
  };
  spells: SpellType[];
}
