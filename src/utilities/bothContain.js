export default function bothContain(a1, a2) {
  return a1.some(i => a2.includes(i));
}
