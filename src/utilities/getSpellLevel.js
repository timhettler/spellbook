export default function getSpellLevel(number) {
  switch (number) {
    case 0:
      return 'Cantrip';
    case 1:
      return '1st-level';
    case 2:
      return '2nd-level';
    case 3:
      return '3rd-level';
    default:
      return `${number}th-level`;
  }
}
