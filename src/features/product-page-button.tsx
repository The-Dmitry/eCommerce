'use client';

import { startTransition, useContext, useOptimistic } from 'react';
import { CartContext } from '../shared/context/cart-context';
import NewCartItemData from '../shared/models/new-cart-item-data';
import Button from '../shared/ui/button';
import addProductToCart from '@shared/utils/api/cart/add-product-to-cart';

export default function ProductPageButton({
  productId,
  variantId,
}: NewCartItemData) {
  const { cartItems } = useContext(CartContext);
  const [state, addOptimistic] = useOptimistic(cartItems.has(productId));

  async function handleClick() {
    startTransition(() => addOptimistic(true));
    try {
      await addProductToCart({ productId, variantId });
    } catch {
      addOptimistic(false);
    }
  }

  return (
    <>
      <Button
        variant='button'
        disabled={state}
        onClick={handleClick}
        className={`w-full max-w-80 py-2 ${state && 'bg-green-500 text-white hover:bg-green-500 disabled:cursor-default disabled:filter-none'}`}
      >
        {state ? 'In cart!' : 'Add to cart'}
      </Button>
    </>
  );
}
