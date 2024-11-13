import Link from 'next/link';
import { ProductProjection } from '../shared/models/ProductProjection';
import convertToUsd from '../shared/utils/convert-to-usd';

interface Props {
  data: ProductProjection;
}

export default function ProductCard({ data }: Props) {
  const { name, masterVariant } = data;
  const price = convertToUsd(data.masterVariant.prices[0].value.centAmount);
  return (
    <article className='flex w-60 flex-col'>
      <img src={masterVariant.images[0].url} alt={name['en-US']} />
      <h3>{name['en-US']}</h3>
      <p>Price: {price}</p>
      <Link href={`./${data.id}`}>Page</Link>
      <button>Buy</button>
    </article>
  );
}
