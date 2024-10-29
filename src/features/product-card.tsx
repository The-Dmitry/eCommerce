import { ProductProjection } from '../shared/models/ProductProjection';

interface Props {
  data: ProductProjection;
}

export default function ProductCard({ data }: Props) {
  const { name, masterVariant } = data;
  const price = (
    data.masterVariant.prices[0].value.centAmount / 100
  ).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  return (
    <article className='flex w-60 flex-col'>
      <img src={masterVariant.images[0].url} alt={name['en-US']} />

      <h3>{name['en-US']}</h3>
      <p>Price: {price}</p>
      <button>Buy</button>
    </article>
  );
}
