'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';
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
  const path = usePathname();

  useEffect(() => {
    ref.current = document.body;
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [open]);

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
          <div
            onClick={handleClick}
            className='fixed inset-0 z-10 flex justify-end overscroll-none bg-black/75 text-orange-500 sm:hidden'
          >
            <button onClick={handleClick}>
              <IoMdClose className='absolute right-2 top-2 text-4xl text-current' />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className='flex size-full max-w-80 flex-col items-center gap-2 overscroll-none bg-neutral-900/95 pt-14 text-2xl'
            >
              {children}
            </div>
          </div>,
          ref.current
        )}
    </>
  );
}
