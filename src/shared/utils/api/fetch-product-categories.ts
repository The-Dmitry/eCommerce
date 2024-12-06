'use server';

import { ProductCategories } from '../../models/ProductCategories';
import fetchWithToken from './fetch-with-token';

export default async function fetchProductCategories() {
  return await fetchWithToken<ProductCategories>(
    `${process.env.HOST_URL}/${process.env.PROJECT_KEY}/categories?expand=parent`,
    {
      cache: 'force-cache',
    }
  );
}
