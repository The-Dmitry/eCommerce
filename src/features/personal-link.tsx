import Link from 'next/link';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { Routes } from '../shared/constants/routes';
import { LinkProps } from '../shared/models/link-props';
import UserData from '../shared/models/UserData';

interface Props extends LinkProps {
  data: UserData;
  className?: string;
}

export default function PersonalLink({ data, className, icon }: Props) {
  if (!('firstName' in data)) {
    return <></>;
  }

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
