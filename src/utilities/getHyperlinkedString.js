import { CONDITIONS, CONDITIONS_URL } from '../constants/conditions';
import { SENSES, SENSES_URL } from '../constants/senses';
import { MONSTERS, MONSTERS_URL, MONSTER_GROUPS } from '../constants/monsters';
import { PLANES, PLANES_URL } from '../constants/planes';

function formatStringForUrl(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).replace(' ', '-');
}

function getHyperlink(full, before, keyword, after) {
  let url = '';

  if (CONDITIONS.includes(keyword)) {
    url = CONDITIONS_URL;
  } else if (SENSES.includes(keyword)) {
    url = SENSES_URL;
  } else if (MONSTERS.includes(keyword)) {
    url = MONSTERS_URL;
  } else if (PLANES.includes(keyword)) {
    url = PLANES_URL;
  }

  if (url) {
    url = `${url}${formatStringForUrl(keyword)}`;
  } else if (MONSTER_GROUPS.map(i => i.keyword).includes(keyword)) {
    url = MONSTER_GROUPS.find(i => i.keyword === keyword).url;
  }

  if (!url) {
    return full;
  }

  return `${before}<a href="${url}" target="_blank">${keyword}</a>${after}`;
}

function getHyperlinkedString(string) {
  const allKeywords = [].concat(
    CONDITIONS,
    SENSES,
    MONSTERS,
    MONSTER_GROUPS.map(i => i.keyword),
    PLANES
  );

  const replacer = (match, p1, p2, p3) => {
    return `<i class="keyword">${getHyperlink(match, p1, p2, p3)}</i>`;
  };

  var re = new RegExp(`(\\s)(${allKeywords.join('|')})(\\s|\\.|,)`, 'gi');

  return string.replace(re, replacer);
}

export default getHyperlinkedString;
