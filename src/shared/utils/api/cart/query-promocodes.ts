import { BASE_URL } from '@/src/shared/constants/base-url';
import { PromoCodes } from '@/src/shared/models/promo-codes';
import fetchWithToken from '../fetch-with-token';

export default async function QueryPromocodes() {
  const data = await fetchWithToken<PromoCodes>(
    `${BASE_URL.HOST}/discount-codes`
  );
  return data;
}
