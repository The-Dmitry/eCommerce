'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

export default function CatalogSearch() {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const [value, setValue] = useState(params.get('text') || '');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (value) {
      router.push(`?text=${value}`);
      return;
    }
    router.push(path);
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  return (
    <form
      onSubmit={handleSubmit}
      className='flex gap-2 rounded-md bg-neutral-900 text-orange-500'
    >
      <input
        type='search'
        value={value}
        onInput={onChange}
        className={twMerge('form-input border-none p-2 text-start')}
        placeholder='Search...'
      />
      <button type='submit' className='px-2 text-4xl'>
        <AiOutlineSearch />
      </button>
    </form>
  );
}
