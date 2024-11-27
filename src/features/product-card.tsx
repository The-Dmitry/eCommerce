import Link from 'next/link';
import { ProductProjection } from '../shared/models/ProductProjection';
import Price from './price';

interface Props {
  data: ProductProjection;
}

export default function ProductCard({ data }: Props) {
  const { name, masterVariant } = data;

  return (
    <li className='group relative'>
      <img
        src={masterVariant.images[0].url}
        alt={name['en-US']}
        className='aspect-[1/1.15] w-full rounded-xl object-cover duration-150 hover:transition-all group-hover:brightness-110'
      />
      <h3 className='line-clamp-2'>{name['en-US']}</h3>
      <Price
        discountedPrice={
          data.masterVariant.prices[0].discounted?.value.centAmount
        }
        price={data.masterVariant.prices[0].value.centAmount}
      />
      <Link className='absolute inset-0' href={`./${data.id}`} />
    </li>
  );
}
