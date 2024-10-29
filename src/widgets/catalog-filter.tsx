'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent } from 'react';
import CatalogSubcategory from '../features/catalog-subcategory';
import { ProductCategories } from '../shared/models/ProductCategories';

interface Props {
  data: ProductCategories;
}

export default function CatalogFilter({ data }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const currentParams = new Set(Array.from(params.values()));

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
    router.push(`?${params.toString()}`);
  };

  return (
    <aside className='min-w-52'>
      <form onSubmit={handleSubmit}>
        {categories.map((v) => (
          <CatalogSubcategory
            currentParams={currentParams}
            data={v}
            key={v[0]}
          />
        ))}
        <button type='submit'>Search</button>
      </form>
    </aside>
  );
}
