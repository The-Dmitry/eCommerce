import { ProductProjectionResponse } from '../../models/ProductProjection';
import getAnonymousToken from './get-anonymous-token';

export default async function fetchStaticParams(): Promise<ProductProjectionResponse> {
  let token = '';
  const anonym = await getAnonymousToken();
  if ('access_token' in anonym) {
    token = anonym.access_token;
  }

  const url = `${process.env.HOST_URL}/${process.env.PROJECT_KEY}`;

  const response = await fetch(`${url}/product-projections/search?limit=499`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data: ProductProjectionResponse = await response.json();

  return data;
}
