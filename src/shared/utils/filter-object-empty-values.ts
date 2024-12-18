export default function filterObjectEmptyValues<
  T extends Record<string, string>,
>(obj: T) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value));
}
