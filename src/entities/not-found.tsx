import { Routes } from '@/src/shared/constants/routes';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex size-full flex-col items-center justify-center gap-5 text-orange-500'>
      <h2 className='text-4xl'>Not Found</h2>
      <Link
        className='rounded-md bg-orange-500 px-5 py-3 text-2xl font-medium text-black transition-colors hover:bg-orange-400'
        href={Routes.CATALOG}
      >
        Catalog
      </Link>
    </div>
  );
}
