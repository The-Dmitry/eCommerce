'use client';

import Button from '@/src/shared/ui/button';
import { useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';

export default function CatalogSideBar({ children }: { children: ReactNode }) {
  const params = useSearchParams();
  const [barVisible, setBarVisible] = useState(false);

  useEffect(() => {
    setBarVisible(false);
  }, [params]);

  const handleFilter = () => setBarVisible((prev) => !prev);

  return (
    <div className='flex flex-col gap-2'>
      <Button
        variant='button'
        onClick={handleFilter}
        className='w-full border-2 border-current bg-transparent text-orange-500 hover:bg-transparent hover:text-orange-400 sm:hidden'
      >
        Filters{' '}
        {
          <IoMdArrowDropdown
            className={twMerge(barVisible && 'rotate-180', 'text-3xl')}
          />
        }
      </Button>
      <div
        className={twMerge(
          'flex max-h-full w-full justify-center overflow-hidden bg-neutral-900 transition-all',
          !barVisible && 'max-h-0 sm:max-h-full'
        )}
      >
        {children}
      </div>
    </div>
  );
}
