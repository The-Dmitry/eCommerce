import { cookies } from 'next/headers';

export default function getDataFromStorage(key: string) {
  const value = cookies().get(key)?.value;
  return value;
}
