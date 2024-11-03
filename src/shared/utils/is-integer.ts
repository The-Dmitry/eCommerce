export default function isInteger(value: string | undefined) {
  if (!value) return false;
  return /^\d+$/.test(value) ? +value : false;
}
