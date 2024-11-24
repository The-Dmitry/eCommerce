import Link from 'next/link';
import { ProductProjection } from '../shared/models/ProductProjection';
import convertToUsd from '../shared/utils/convert-to-usd';

interface Props {
  data: ProductProjection;
}

export default function ProductCard({ data }: Props) {
  const { name, masterVariant } = data;
  const price = convertToUsd(data.masterVariant.prices[0].value.centAmount);
  const discountedPrice = convertToUsd(
    data.masterVariant.prices[0].discounted?.value.centAmount
  );

  return (
    <li className='group relative'>
      <img
        src={masterVariant.images[0].url}
        alt={name['en-US']}
        className='aspect-[1/1.15] w-full rounded-xl object-cover duration-150 hover:transition-all group-hover:brightness-110'
      />
      <h3 className='line-clamp-2'>{name['en-US']}</h3>
      <div className='flex items-center gap-2'>
        <p
          className={`${discountedPrice ? 'text-sm text-gray-400 line-through' : ''}`}
        >
          {price}
        </p>
        {discountedPrice && (
          <p className='text-orange-400'>{discountedPrice}</p>
        )}
      </div>
      <Link className='absolute inset-0' href={`./${data.id}`} />
    </li>
  );
}
