'use client';

import { CartContext } from '@/src/shared/context/cart-context';
import { useContext, useEffect } from 'react';

export default function CartItemsCollector({ data }: { data: string[] }) {
  const { collectItems } = useContext(CartContext);
  useEffect(() => {
    collectItems(data);
  }, [collectItems, data]);
  return <></>;
}
