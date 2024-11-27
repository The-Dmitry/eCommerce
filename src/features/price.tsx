import { twMerge } from 'tailwind-merge';
import convertToUsd from '../shared/utils/convert-to-usd';

interface Props {
  price: number;
  discountedPrice?: number;
  variant?: 'small' | 'large';
}

export default function Price({
  discountedPrice,
  price,
  variant = 'small',
}: Props) {
  const usdPrice = convertToUsd(price);

  const usdDiscount = convertToUsd(discountedPrice);

  return (
    <div className='flex items-center gap-2'>
      <span
        className={twMerge(
          usdDiscount && 'text-gray-400 line-through',
          variant === 'small' ? 'text-sm' : 'text-2xl'
        )}
      >
        {usdPrice}
      </span>
      {usdDiscount && (
        <span
          className={twMerge(
            'text-orange-400',
            variant === 'small' ? 'text-base' : 'text-3xl'
          )}
        >
          {usdDiscount}
        </span>
      )}
    </div>
  );
}
