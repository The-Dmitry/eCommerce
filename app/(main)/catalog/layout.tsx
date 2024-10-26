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
        <>
          <CatalogFilter data={data} />
          {children}
        </>
      ) : (
        <div>Incorrect Data</div>
      )}
    </>
  );
}
