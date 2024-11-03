import sortingTypes from '../constants/sorting-types';
import { ProductProjectionResponse } from '../models/ProductProjection';
import fetchWithToken from './fetch-with-token';
import isInteger from './is-integer';

function isStringNumeric(str: string | string[] | undefined) {
  return !isNaN(Number(str));
}

export default async function fetchProducts(
  {
    filter,
    page,
    text,
    sort,
    from,
    to,
  }: Record<string, string | string[] | undefined>,
  limit: number
) {
  const query = new URLSearchParams();
  query.set('limit', `${limit}`);
  if (page) {
    query.set('offset', `${isStringNumeric(page) ? (+page - 1) * limit : '0'}`);
  }
  if (text && typeof text === 'string') {
    query.set('text.en-us', text);
  }
  if (filter) {
    const category = (Array.isArray(filter) ? filter : [filter])
      .map((v) => `"${v}"`)
      .join(',');
    query.append('filter', `categories.id:${category}`);
  }
  const stringSort = Array.isArray(sort) ? sort[0] : sort;
  const decodedSort = stringSort ? decodeURIComponent(stringSort) : null;

  if (decodedSort) {
    if (decodedSort in sortingTypes) {
      query.set('sort', sortingTypes[decodedSort].param);
    }
  }
  const priceFrom = isInteger(Array.isArray(from) ? from[0] : from);
  const priceTo = isInteger(Array.isArray(to) ? to[0] : to);
  if (priceFrom || priceTo)
    query.append(
      'filter',
      `variants.price.centAmount:range (${priceFrom ? +priceFrom * 100 : 0} to ${priceTo ? +priceTo * 100 : 9999999})`
    );
  const data = await fetchWithToken<ProductProjectionResponse>(
    `${process.env.HOST_URL}/${process.env.PROJECT_KEY}/product-projections/search?${query.toString()}`
  );

  return data;
}
