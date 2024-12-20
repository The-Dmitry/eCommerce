import NotFound from '@/src/entities/not-found';
import CatalogSearch from '@/src/features/catalog/catalog-search';
import CatalogSideBar from '@/src/features/catalog/catalog-side-bar';
import fetchProductCategories from '@/src/shared/utils/api/fetch-product-categories';
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
        <div className='flex h-full flex-col gap-3 sm:flex-row'>
          <CatalogSideBar>
            <CatalogFilter data={data} />
          </CatalogSideBar>
          <section className='flex size-full h-full flex-col gap-3'>
            <CatalogSearch />
            {children}
          </section>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}
