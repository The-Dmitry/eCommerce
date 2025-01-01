import Image from 'next/image';
import Button from '../shared/ui/button';

export default function Greeting() {
  return (
    <section className='relative grid grid-cols-[minmax(auto,600px)_1fr] items-center p-[2%]'>
      <Image
        src={'/greeting.webp'}
        alt='stray'
        layout='fill'
        objectFit='cover'
        className='absolute z-[-1] size-full rounded-2xl object-right'
      />
      <h1
        className='text-shadow col-[1_/_2] pb-[14%] text-orange-500'
        style={{ fontSize: 'clamp(1.5rem, (1rem + 4vw), 3.5rem)' }}
      >
        Discover. Play. Conquer.
      </h1>
      <p
        className='text-shadow col-[1_/_2] pb-[14%] text-orange-400'
        style={{ fontSize: 'clamp(0.875rem, 2vw + 0.25rem, 1.875rem)' }}
      >
        Dive into a world where every game tells a story, every moment is an
        adventure, and every player finds their perfect match. Explore our
        collection, level up your library, and embark on your next epic quest!
      </p>
      <div className='col-[1_/_2] flex justify-evenly gap-8 sm:justify-normal'>
        <Button variant='link' href={'/catalog'}>
          Catalog
        </Button>
        <Button
          variant='link'
          href={'/catalog/5d59027b-0bbd-4629-b905-c90dc595533c'}
        >
          Stray
        </Button>
      </div>
    </section>
  );
}
