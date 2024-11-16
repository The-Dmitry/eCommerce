import ProductCard from '../features/product-card';
import fetchProducts from '../shared/utils/fetch-products';

export default async function CatalogList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await fetchProducts({ ...searchParams }, 20);

  if (!('results' in data)) {
    return <div>Data is not found</div>;
  }

  if (!data.count) {
    return <div>Nothing found</div>;
  }

  return (
    <ul className='grid grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] gap-2'>
      {data.results.map((card) => (
        <ProductCard data={card} key={card.id} />
      ))}
    </ul>
  );
}
