import Pagination from '@/src/features/pagination';
import Spinner from '@/src/shared/ui/spinner';
import fetchProducts from '@/src/shared/utils/api/fetch-products';
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
    <>
      <div className='h-full'>
        <Suspense
          key={JSON.stringify(params)}
          fallback={
            <div className='flex h-full items-center justify-center'>
              <Spinner />
            </div>
          }
        >
          <CatalogList searchParams={params} />
        </Suspense>
      </div>

      <Pagination limit={data.limit} total={data.total} />
    </>
  );
}
