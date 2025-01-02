import PromocodeSelector from '@features/promocode-selector';
import QueryPromocodes from '@shared/utils/api/cart/query-promocodes';
import Image from 'next/image';

export default async function PromocodeSuggestion() {
  const promocodes = await QueryPromocodes();
  if ('results' in promocodes && promocodes.results.length) {
    return (
      <section className='grid gap-5 md:grid-cols-2 md:gap-0'>
        <div className='flex flex-col items-center justify-evenly gap-5 text-orange-500'>
          <h2
            className='text-center'
            style={{ fontSize: 'clamp(1.25rem, 2vw + 0.5rem, 2.25rem)' }}
          >
            Take your Promo Code!!!
          </h2>
          <p
            className='text-center text-xl'
            style={{ fontSize: 'clamp(0.875rem, 2vw + 0.25rem, 1.75rem)' }}
          >
            Get 20% discount for total cart price and remember my github
            nickname :D
          </p>
          <PromocodeSelector code={promocodes.results[0].code} />
        </div>
        <div className='relative pb-[63%]'>
          <Image
            src={'/bunch.png'}
            alt='heroes'
            fill
            className='absolute select-none object-cover'
          />
        </div>
      </section>
    );
  }
  return <></>;
}
