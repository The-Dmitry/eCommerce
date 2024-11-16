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
        <div className='flex gap-3'>
          <CatalogFilter data={data} />
          {children}
        </div>
      ) : (
        <div>Incorrect Data</div>
      )}
    </>
  );
}
