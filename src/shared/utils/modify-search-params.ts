export default function modifySearchParams(
  currentParams: [string, string][],
  paramKey: string,
  paramValue: string
) {
  const newParams = new URLSearchParams();
  currentParams.forEach(([key, value]) => newParams.append(key, value));
  newParams.set(paramKey, paramValue);
  return newParams.toString();
}
