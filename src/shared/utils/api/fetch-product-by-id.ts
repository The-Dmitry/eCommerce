'use server';

import { BASE_URL } from '../../constants/base-url';
import { ProductProjection } from '../../models/ProductProjection';
import fetchWithToken from './fetch-with-token';

export default async function fetchProductById(productId: string) {
  try {
    const params = new URLSearchParams({
      staged: 'true',
      expand: 'categories[*].parent',
    });
    const data = await fetchWithToken<ProductProjection>(
      `${BASE_URL.HOST}/product-projections/${productId}?${params.toString()}`
    );
    return data;
  } catch {
    return null;
  }
}
