import ProductCard from '../features/product-card';
import fetchProducts from '../shared/utils/api/fetch-products';

export default async function CatalogList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await fetchProducts({ ...searchParams }, 20);

  if (!('results' in data) || !data.count) {
    return (
      <p className='flex size-full items-center justify-center text-3xl text-orange-500'>
        Nothing Found
      </p>
    );
  }

  return (
    <ul className='grid grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] gap-2'>
      {data.results.map((card) => (
        <ProductCard data={card} key={card.id} href='catalog' />
      ))}
    </ul>
  );
}
