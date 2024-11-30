'use client';

import { addProductToCart } from '@/app/actions';
import NewCartItemData from '../shared/models/new-cart-item-data';
import Button from '../shared/ui/button';

export default function ProductPageButton({
  productId,
  variantId,
}: NewCartItemData) {
  return (
    <Button onClick={() => addProductToCart({ productId, variantId })}>
      Add to cart
    </Button>
  );
}
