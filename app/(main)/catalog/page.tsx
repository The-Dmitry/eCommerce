import ProductCard from '@/src/features/product-card';
import { ProductProjectionResponse } from '@/src/shared/models/ProductProjection';
import fetchWithToken from '@/src/shared/utils/fetch-with-token';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalog',
};

export default async function Catalog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const data = await fetchWithToken<ProductProjectionResponse>(
    `${process.env.HOST_URL}/${process.env.PROJECT_KEY}/product-projections/search`
  );

  if (!('results' in data)) {
    return <div>Data is not found</div>;
  }
  console.log(data);

  return (
    <div className='flex flex-wrap gap-3'>
      {data.results.map((card) => (
        <ProductCard data={card} key={card.id} />
      ))}
    </div>
  );
}
