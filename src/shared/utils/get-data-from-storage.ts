import { cookies, headers } from 'next/headers';

export default function getDataFromStorage(key: string) {
  const value = cookies().get(key)?.value || headers().get(key);
  return value;
}
