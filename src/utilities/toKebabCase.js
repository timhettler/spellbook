export default function (string) {
  return string
    .toLowerCase()
    .replace(/[^a-zA-Z\s-]/g, '')
    .replace(/\s/g, '-');
}
