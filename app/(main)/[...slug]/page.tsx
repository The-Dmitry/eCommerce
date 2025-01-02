import NotFound from '@entities/not-found';
import Rating from '@entities/rating';
import Price from '@features/price';
import ProductPageButton from '@features/product-page-button';
import fetchProductById from '@shared/utils/api/fetch-product-by-id';
import fetchStaticParams from '@shared/utils/api/fetch-static-params';
import ImageSlider from '@widgets/image-slider';
import Video from '@widgets/video';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: [string, string] }>;
}

export async function generateStaticParams() {
  const products = await fetchStaticParams();

  return products.results.map((product) => ({
    slug: ['catalog', product.id],
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = (await params).slug[1];
  const data = await fetchProductById(product);

  return {
    title: !data || 'errors' in data ? 'Page not found' : data.name['en-US'],
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const [pageName, productId] = slug;

  if (pageName !== 'catalog') {
    notFound();
  }

  const data = await fetchProductById(productId);

  if (!data || 'errors' in data) {
    return <NotFound />;
  }

  const { images, id, attributes } = data.masterVariant;
  const [video, rating] = attributes;

  const categories = data.categories.reduce(
    (acc, v) => {
      const [title, subTitle] = [
        v.obj.parent.obj.name['en-US'],
        v.obj.name['en-US'],
      ];
      if (title in acc) {
        acc[title].push(subTitle);
      } else {
        acc[title] = [subTitle];
      }
      return acc;
    },
    {} as Record<string, string[]>
  );

  return (
    <div className='flex flex-col gap-4 md:flex-row'>
      <aside className='flex shrink-0 flex-col items-center gap-4 md:w-80'>
        <div className='relative aspect-square w-full max-w-80 select-none'>
          <img
            src={images[0].url}
            alt={data.name['en-US']}
            className='inset-0 size-full object-cover'
          />
          <Rating rating={rating.value} className='bottom-2 left-2 scale-125' />
        </div>
        <h1 className='text-center text-2xl text-orange-500'>
          {data.name['en-US']}
        </h1>

        <Price
          discountedPrice={
            data.masterVariant.prices[0].discounted?.value.centAmount
          }
          price={data.masterVariant.prices[0].value.centAmount}
          variant='large'
        />
        <ProductPageButton productId={data.id} variantId={id} />
        {Object.entries(categories).map(([key, arr]) => {
          return (
            <div className='w-full' key={key}>
              <h3 className='mb-2 text-center text-lg'>{key}:</h3>
              <ul className='flex flex-wrap justify-center gap-3 md:justify-start'>
                {arr.map((v) => (
                  <li
                    className='rounded-md bg-orange-500 px-2 py-1 text-black'
                    key={v}
                  >
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </aside>
      <section className='grid gap-4'>
        <Video src={video.value} />
        <article>{data.description['en-US']}</article>
        <ImageSlider list={images} />
      </section>
    </div>
  );
}
