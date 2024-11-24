import { ProductProjection } from '../../models/ProductProjection';
import fetchWithToken from './fetch-with-token';

export default async function fetchProductById(productId: string) {
  const params = new URLSearchParams({
    staged: 'true',
    expand: 'categories[*].parent',
  });
  const data = await fetchWithToken<ProductProjection>(
    `${process.env.HOST_URL}/${process.env.PROJECT_KEY}/product-projections/${productId}?${params.toString()}`
  );
  return data;
}
