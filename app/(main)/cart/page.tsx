import { fetchCartData } from '@/src/shared/utils/api/cart/fetch-cart-data';

export default async function CartPage() {
  const data = await fetchCartData();
  if (!data || 'errors' in data) {
    return <div>Cart is empty</div>;
  }
  const { lineItems } = data;
  return (
    <div>
      <ul>
        {lineItems.map((v) => (
          <li key={v.id}>{v.name['en-US']}</li>
        ))}
      </ul>
    </div>
  );
}
