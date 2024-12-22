'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';
import Button from '../shared/ui/button';

interface Props {
  children?: ReactNode;
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

  const handleClick = (value: boolean) => setOpen(value);

  return (
    <>
      <Button
        className={twMerge(
          'bg-transparent p-1 text-orange-500 hover:bg-transparent sm:hidden',
          className
        )}
        onClick={() => handleClick(true)}
      >
        <RxHamburgerMenu className='text-4xl' />
      </Button>
      {open &&
        ref.current &&
        createPortal(
          <div
            onClick={() => handleClick(false)}
            className='fixed inset-0 flex animate-fadeInBackground justify-end overscroll-none bg-black/75 text-orange-500 backdrop-blur-sm sm:hidden'
          >
            <button
              onClick={() => handleClick(false)}
              className='absolute right-2 top-2 z-10 text-4xl text-current'
              disabled={!open}
            >
              <IoMdClose />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className='flex size-full max-w-80 animate-burger flex-col items-center gap-4 bg-neutral-900/95 pt-14 text-2xl'
            >
              {children}
            </div>
          </div>,
          ref.current
        )}
    </>
  );
}
