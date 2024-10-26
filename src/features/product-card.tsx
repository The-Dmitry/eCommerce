import { ProductProjection } from '../shared/models/ProductProjection';

interface Props {
  data: ProductProjection;
}

export default function ProductCard({ data }: Props) {
  const { name, masterVariant } = data;
  return (
    <article className='flex w-60 flex-col'>
      <img src={masterVariant.images[0].url} alt={name['en-US']} />

      <h3>{name['en-US']}</h3>
      <button>Buy</button>
    </article>
  );
}
