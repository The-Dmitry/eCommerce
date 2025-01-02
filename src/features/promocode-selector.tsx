'use client';

import { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { IoIosCheckmark } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';

interface Props {
  code: string;
}

export default function PromocodeSelector({ code }: Props) {
  const [isPending, setIsPending] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
    }, 4000);
  };

  return (
    <div
      className={twMerge(
        'flex w-fit items-center border border-dashed border-current text-3xl text-orange-500 transition-all',
        isPending && 'text-green-400'
      )}
    >
      <p className='flex items-center justify-center px-3'>{code}</p>
      <button
        onClick={copyCode}
        disabled={isPending}
        className='flex aspect-square h-14 items-center justify-center bg-current'
      >
        <span className='text-xl text-black'>
          {isPending ? (
            <IoIosCheckmark className='text-5xl text-white' />
          ) : (
            <FaRegCopy className='text-2xl text-white' />
          )}
        </span>
      </button>
    </div>
  );
}
