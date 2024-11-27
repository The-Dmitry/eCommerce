'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useMemo, useRef } from 'react';
import CatalogSorting from '../features/catalog/catalog-sorting';
import CatalogSubcategory from '../features/catalog/catalog-subcategory';
import Checkbox from '../features/catalog/checkbox';
import PriceRange from '../features/catalog/price-range';
import { ProductCategories } from '../shared/models/ProductCategories';
import Button from '../shared/ui/button';
import SubmitButton from '../shared/ui/submit-button';
import collectFilterParams from '../shared/utils/collect-filter-params';
import defineCategories from '../shared/utils/define-categories';

interface Props {
  data: ProductCategories;
}

export default function CatalogFilter({ data }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const currentParams = new Set(
    Array.from(params.values(), (v) => decodeURIComponent(v))
  );

  const formRef = useRef<HTMLFormElement | null>(null);

  const [genres, platforms] = useMemo(
    () => defineCategories(data.results),
    [data.results]
  );

  const resetForm = () => {
    formRef.current?.reset();
    router.replace('./');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const formData = Object.fromEntries(form.entries());
    const params = collectFilterParams(formData, data);
    router.push(`?${params}`);
  };

  return (
    <aside className='h-fit w-full max-w-56 rounded-lg bg-neutral-900 p-2 pb-8'>
      <form
        ref={formRef}
        key={crypto.randomUUID()}
        onSubmit={handleSubmit}
        className='flex flex-col gap-4'
      >
        <CatalogSorting currentSort={params.get('sort')} />
        <Checkbox
          isChecked={!!params.get('discount')}
          name='discount'
          text='Discount only'
        />
        <CatalogSubcategory currentParams={currentParams} data={genres} />
        <CatalogSubcategory currentParams={currentParams} data={platforms} />
        <PriceRange from={params.get('from')} to={params.get('to')} />
        <SubmitButton className='w-full border-2 border-orange-500 bg-transparent text-orange-500 hover:text-black'>
          Search
        </SubmitButton>
      </form>
      <Button className='mt-4 w-full' type='button' onClick={resetForm}>
        Reset
      </Button>
    </aside>
  );
}
