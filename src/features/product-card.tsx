import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Rating from '../entities/rating';
import { ProductProjection } from '../shared/models/ProductProjection';
import Price from './price';

interface Props {
  data: ProductProjection;
  className?: string;
  href: string;
}

export default function ProductCard({ data, className, href }: Props) {
  const { name, masterVariant } = data;

  const rating = masterVariant.attributes[1].value;

  return (
    <li className={twMerge('group relative', className)}>
      <div className='relative'>
        <img
          src={masterVariant.images[0].url}
          alt={name['en-US']}
          className='aspect-[1/1.15] w-full rounded-xl object-cover duration-150 hover:transition-all group-hover:brightness-110'
        />
        <Rating rating={rating} className='bottom-1 right-1' />
      </div>
      <h3 className='line-clamp-2'>{name['en-US']}</h3>
      <Price
        discountedPrice={
          data.masterVariant.prices[0].discounted?.value.centAmount
        }
        price={data.masterVariant.prices[0].value.centAmount}
      />
      <Link className='absolute inset-0' href={`${href}/${data.id}`} />
    </li>
  );
}
