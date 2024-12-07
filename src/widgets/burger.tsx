'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';
import Button from '../shared/ui/button';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Burger({ children, className }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    ref.current = document.body;
  }, []);

  const handleClick = () => setOpen((prev) => !prev);

  return (
    <>
      <Button
        className={twMerge(
          'bg-transparent p-1 text-orange-500 hover:bg-transparent sm:hidden',
          className
        )}
        onClick={handleClick}
      >
        <RxHamburgerMenu className='text-4xl' />
      </Button>
      {open &&
        ref.current &&
        createPortal(
          <div className='inset fixed z-10 flex h-lvh w-full flex-col justify-end overscroll-none bg-black/75 sm:hidden'>
            <button onClick={handleClick}>Close</button>
            <div className='flex size-full max-w-80 flex-col items-center gap-2 bg-neutral-900 text-2xl text-orange-500'>
              {children}
            </div>
          </div>,
          ref.current
        )}
    </>
  );
}
