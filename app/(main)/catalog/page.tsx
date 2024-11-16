import CatalogSearch from '@/src/features/catalog/catalog-search';
import Pagination from '@/src/features/pagination';
import fetchProducts from '@/src/shared/utils/fetch-products';
import CatalogList from '@/src/widgets/catalog-list';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Catalog',
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const data = await fetchProducts({ ...params }, 20);

  if (!('results' in data)) {
    return <div>Data is not found</div>;
  }

  return (
    <section className='flex size-full flex-col'>
      <CatalogSearch />
      <div className='flex w-full flex-col'>
        <Suspense
          key={JSON.stringify(params)}
          fallback={<div>Loading ...</div>}
        >
          <CatalogList searchParams={params} />
        </Suspense>
      </div>
      <Pagination limit={data.limit} total={data.total} />
    </section>
  );
}
