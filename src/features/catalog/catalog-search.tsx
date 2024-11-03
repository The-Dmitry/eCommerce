'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function CatalogSearch() {
  const router = useRouter();
  const path = usePathname();
  const [value, setValue] = useState('');

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
    <form onSubmit={handleSubmit}>
      <input type='text' value={value} onInput={onChange} />
      <button type='submit'>Search</button>
    </form>
  );
}
