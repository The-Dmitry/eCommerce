import Image from 'next/image';
import Link from 'next/link';
import { Routes } from '../shared/constants/routes';

export default function Logo({ size = 50 }: { size?: number }) {
  return (
    <Link href={Routes.MAIN}>
      <Image src={'/logo.png'} width={size} height={size} alt='kek' />
    </Link>
  );
}
