'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [modalOpacity, setModalOpacity] = useState(false);
  const ANIMATION_DURATION = 300;

  useEffect(() => {
    document.body.classList.add('modal-block');
    return () => {
      document.body.classList.remove('modal-block');
    };
  }, []);

  const handleClose = () => {
    setModalOpacity(true);
    setTimeout(() => {
      router.back();
    }, ANIMATION_DURATION);
  };

  return (
    <div
      className={twMerge(
        'fixed inset-0 z-10 flex animate-fromTransparent items-center justify-center bg-black/60 p-4 backdrop-blur-md transition-all duration-300 ease-linear',
        modalOpacity && 'opacity-0'
      )}
      onClick={handleClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
      <div className='absolute right-4 top-4 cursor-pointer text-4xl text-orange-500 hover:text-orange-400'>
        <IoMdClose className='text-4xl' />
      </div>
    </div>
  );
}
