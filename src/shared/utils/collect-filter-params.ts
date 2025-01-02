import { ProductCategories } from '../models/ProductCategories';

export default function collectFilterParams(
  formData: {
    [k: string]: FormDataEntryValue;
  },
  categories: ProductCategories
) {
  const params = new URLSearchParams();
  categories.results.forEach(
    (v) =>
      v.name['en-US'] in formData &&
      params.append('filter', encodeURIComponent(v.id))
  );
  if ('sort' in formData && formData['sort']) {
    params.set('sort', encodeURIComponent(formData['sort'] as string));
  }
  if ('from' in formData && formData['from'])
    params.set('from', formData['from'] as string);
  if ('to' in formData && formData['to'])
    params.set('to', formData['to'] as string);
  if ('discount' in formData) params.set('discount', 'true');
  return params.toString();
}
