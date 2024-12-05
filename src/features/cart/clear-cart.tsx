'use client';

import { deleteCart } from '@/app/actions';
import Button from '@/src/shared/ui/button';
import { ButtonHTMLAttributes } from 'react';

export default function ClearCart({
  ...rest
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>) {
  return (
    <Button onClick={() => deleteCart()} {...rest}>
      Clear Cart
    </Button>
  );
}
