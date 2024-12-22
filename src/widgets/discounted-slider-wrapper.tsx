import CardsSlider from '../features/cards-slider';
import ProductCard from '../features/product-card';
import fetchProducts from '../shared/utils/api/fetch-products';

export default async function DiscountedSliderWrapper() {
  const products = await fetchProducts({ discount: 'true' }, 10);

  if ('errors' in products) {
    return <div>not found</div>;
  }

  return (
    <CardsSlider>
      {products.results.map((product) => (
        <ProductCard key={product.id} data={product} href='catalog' />
      ))}
    </CardsSlider>
  );
}
