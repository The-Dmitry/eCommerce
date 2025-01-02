'use client';

import Button from '@/src/shared/ui/button';
import deleteCart from '@shared/utils/api/cart/delete-cart';
import { ButtonHTMLAttributes } from 'react';

export default function ClearCart({
  ...rest
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>) {
  return (
    <Button variant='button' onClick={() => deleteCart()} {...rest}>
      Clear Cart
    </Button>
  );
}
