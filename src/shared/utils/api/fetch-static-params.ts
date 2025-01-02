import { BASE_URL } from '../../constants/base-url';
import { ProductProjectionResponse } from '../../models/ProductProjection';
import getAnonymousToken from './get-anonymous-token';

export default async function fetchStaticParams(): Promise<ProductProjectionResponse> {
  let token = '';
  const anonym = await getAnonymousToken();
  if ('access_token' in anonym) {
    token = anonym.access_token;
  }

  const response = await fetch(
    `${BASE_URL.HOST}/product-projections/search?limit=499`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data: ProductProjectionResponse = await response.json();

  return data;
}
