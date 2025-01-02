import Link from 'next/link';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { Routes } from '../shared/constants/routes';
import { LinkProps } from '../shared/models/link-props';

interface Props extends LinkProps {
  className?: string;
}

export default function PersonalLink({ className, icon }: Props) {
  return (
    <Link className={className} href={Routes.PERSONAL}>
      {icon ? (
        <IoPersonCircleOutline className='text-4xl' title='Personal' />
      ) : (
        'Personal'
      )}
    </Link>
  );
}
