import { CONDITIONS } from 'constants/conditions';
import { SENSES } from 'constants/senses';
import { MONSTERS, MONSTER_GROUPS, MONSTER_SPIRITS } from 'constants/monsters';
import { PLANES } from 'constants/planes';

function formatStringForUrl(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).replace(' ', '-');
}

function getHyperlink(keyword, url, p1, p2, otherMatches) {
  const fullUrl = url(
    otherMatches.length
      ? [...otherMatches]
      : keyword.id || formatStringForUrl(keyword)
  );

  return `${p1}<a href="${fullUrl}" target="_blank" rel="noopener noreferrer">${p2}</a>`;
}

function getHyperlinkedString(string) {
  let linkedString = string;

  const replacer = (keyword, url) => {
    return (match, p1, p2, ...otherMatches) => {
      otherMatches.splice(-2); // remove offset and string arguments
      return `<i class="keyword">${getHyperlink(keyword, url, p1, p2, [
        ...otherMatches,
      ])}</i>`;
    };
  };

  const generateLinkedString = (url) => {
    return (keyword) => {
      let searchTerm = keyword.regex || keyword;
      // Only Chrome supports look behinds
      var re = new RegExp(
        `([^a-zA-Z0-9])(${searchTerm})(?=[^a-zA-Z0-9])`,
        keyword.flag ?? 'i'
      );

      linkedString = linkedString.replace(re, replacer(keyword, url));
    };
  };

  const keywordGroups = [
    CONDITIONS,
    SENSES,
    MONSTERS,
    MONSTER_GROUPS,
    MONSTER_SPIRITS,
    PLANES,
  ];

  keywordGroups.forEach((group) =>
    group.keywords.forEach(generateLinkedString(group.url))
  );

  return linkedString;
}

export default getHyperlinkedString;
