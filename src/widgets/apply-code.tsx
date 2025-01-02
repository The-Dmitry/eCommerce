'use client';

import { useFormState } from 'react-dom';
import { IoCheckmark } from 'react-icons/io5';
import { CartData } from '../shared/models/CartData';
import SubmitButton from '../shared/ui/submit-button';
import applyPromoCode from '@shared/utils/api/cart/apply-promocode';

export default function ApplyCode({
  discount,
}: {
  discount: CartData['discountCodes'];
}) {
  const [error, func] = useFormState(applyPromoCode, '');

  const isDiscount = !!discount.length;

  return isDiscount ? (
    <div className='flex h-11 w-full max-w-80 select-none items-center justify-center gap-1 rounded-lg bg-green-600 text-lg'>
      <IoCheckmark className='text-3xl' />
      <p>Discount is applied!</p>
    </div>
  ) : (
    <form
      action={func}
      className='rounded-lg border border-current text-orange-500 transition-all'
    >
      <div className='flex'>
        <input
          name='code'
          type='text'
          placeholder='Your promocode'
          className='box-border w-full border-none bg-transparent p-2 text-lg uppercase text-current focus:outline-none'
          autoComplete='off'
        />
        <SubmitButton className='rounded-l-none px-4'>OK</SubmitButton>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
}
