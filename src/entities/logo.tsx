import { Routes } from '@shared/constants/routes';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ size = 50 }: { size?: number }) {
  return (
    <Link href={Routes.MAIN}>
      <Image
        src={'/logo.png'}
        width={size}
        height={size}
        alt='kek'
        className='select-none transition-all hover:brightness-110'
      />
    </Link>
  );
}
