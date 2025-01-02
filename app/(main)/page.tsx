import Spinner from '@shared/ui/spinner';
import DiscountedSliderWrapper from '@widgets/discounted-slider-wrapper';
import Greeting from '@widgets/greeting';
import PromocodeSuggestion from '@widgets/promocode-suggestion';
import { Suspense } from 'react';

export default function Home() {
  return (
    <>
      <Greeting />
      <PromocodeSuggestion />
      <section>
        <h2
          className='my-4 text-center uppercase text-orange-500'
          style={{ fontSize: 'clamp(1.375rem, 2vw + 1rem, 2.25rem)' }}
        >
          On discount right now!
        </h2>
        <Suspense
          fallback={
            <div className='flex h-96 items-center justify-center'>
              <Spinner />
            </div>
          }
        >
          <DiscountedSliderWrapper />
        </Suspense>
      </section>
    </>
  );
}
