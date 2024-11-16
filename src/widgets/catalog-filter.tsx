'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent } from 'react';
import CatalogSorting from '../features/catalog/catalog-sorting';
import CatalogSubcategory from '../features/catalog/catalog-subcategory';
import PriceRange from '../features/catalog/price-range';
import { ProductCategories } from '../shared/models/ProductCategories';

interface Props {
  data: ProductCategories;
}

export default function CatalogFilter({ data }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const currentParams = new Set(
    Array.from(params.values(), (v) => decodeURIComponent(v))
  );

  const categories = Object.entries(
    data.results.reduce(
      (acc, v) => {
        if (!v.parent?.obj) {
          return acc;
        }
        const inputData = [v.id, v.name['en-US']];
        const { key } = v.parent.obj;
        if (acc[key]) {
          acc[key].push(inputData);
        } else {
          acc[key] = [inputData];
        }
        return acc;
      },
      {} as Record<string, string[][]>
    )
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = Object.fromEntries(form.entries());

    const params = new URLSearchParams();
    data.results.forEach(
      (v) =>
        v.name['en-US'] in result &&
        params.append('filter', encodeURIComponent(v.id))
    );
    if ('sort' in result && result['sort']) {
      params.set('sort', encodeURIComponent(result['sort'] as string));
    }
    if ('from' in result && result['from'])
      params.set('from', result['from'] as string);
    if ('to' in result && result['to'])
      params.set('to', result['to'] as string);
    if ('discount' in result) params.set('discount', 'true');

    router.push(`?${params.toString()}`);
  };

  return (
    <aside className='w-full max-w-52'>
      <form onSubmit={handleSubmit}>
        <CatalogSorting currentSort={params.get('sort')} />
        <label>
          Discount only
          <input
            defaultChecked={!!params.get('discount')}
            type='checkbox'
            name='discount'
          />
        </label>
        {categories.map((v) => (
          <CatalogSubcategory
            currentParams={currentParams}
            data={v}
            key={v[0]}
          />
        ))}
        <PriceRange />
        <button type='submit'>Search</button>
      </form>
    </aside>
  );
}
