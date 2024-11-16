import convertToUsd from '@/src/shared/utils/convert-to-usd';
import fetchProductById from '@/src/shared/utils/fetch-product-by-id';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: [string, string] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchProductById(slug[1]);

  return {
    title: 'errors' in data ? 'Page not found' : data.name['en-US'],
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const [pageName, productId] = slug;

  if (pageName !== 'catalog') {
    notFound();
  }

  const data = await fetchProductById(productId);
  if ('errors' in data) {
    return (
      <>
        <div>Not FOund</div>
        <Link href='/catalog'>To Catalog</Link>
      </>
    );
  }
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
    <main className='flex'>
      <aside>
        <img src={data.masterVariant.images[0].url} alt={data.name['en-US']} />
        <h1>{data.name['en-US']}</h1>
        <button>Buy</button>
        <p>
          Price: {convertToUsd(data.masterVariant.prices[0].value.centAmount)}
        </p>
        {Object.entries(categories).map(([key, arr]) => {
          return (
            <div key={key}>
              <h3>{key}</h3>
              <ul>
                {arr.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </aside>
      <section>
        <div>
          <iframe
            src={data.masterVariant.attributes[0].value}
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          />
        </div>
        <p>{data.description['en-US']}</p>
      </section>
    </main>
  );
}
