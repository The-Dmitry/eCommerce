import Spinner from '@/src/shared/ui/spinner';
import DiscountedSliderWrapper from '@/src/widgets/discounted-slider-wrapper';
import Greeting from '@/src/widgets/greeting';
import { Suspense } from 'react';

export default function Home() {
  return (
    <>
      <Greeting />
      <section>
        <h2 className='my-4 text-center text-4xl uppercase text-orange-500'>
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
