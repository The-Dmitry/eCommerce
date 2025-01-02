'use server';

import { BASE_URL } from '../../constants/base-url';
import { ProductCategories } from '../../models/ProductCategories';
import fetchWithToken from './fetch-with-token';

export default async function fetchProductCategories() {
  return await fetchWithToken<ProductCategories>(
    `${BASE_URL.HOST}/categories?expand=parent`,
    {
      cache: 'force-cache',
    }
  );
}
