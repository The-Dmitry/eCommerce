import CatalogSearch from '@/src/features/catalog/catalog-search';
import fetchProductCategories from '@/src/shared/utils/fetch-product-categories';
import CatalogFilter from '@/src/widgets/catalog-filter';

export default async function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await fetchProductCategories();

  const isDataCorrect = 'results' in data;

  return (
    <>
      {isDataCorrect ? (
        <div className='flex h-full gap-3'>
          <CatalogFilter data={data} />
          <section className='flex size-full h-full flex-col gap-3'>
            <CatalogSearch />
            {children}
          </section>
        </div>
      ) : (
        <div>Incorrect Data</div>
      )}
    </>
  );
}
