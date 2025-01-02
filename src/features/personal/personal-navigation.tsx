'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import { IoPersonOutline } from 'react-icons/io5';
import { LuKeyRound } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';

const tabs: { text: string; href: string; Icon: IconType; active: string }[] = [
  {
    text: 'Personal data',
    href: '/personal',
    Icon: IoPersonOutline,
    active: '',
  },
  {
    text: 'Password',
    href: './password',
    Icon: LuKeyRound,
    active: 'password',
  },
];

export default function PersonalNavigation() {
  const activePath = usePathname();
  const activeTab = activePath.split('/')[2];

  return (
    <div className='flex space-x-1 rounded-lg bg-neutral-800 px-1'>
      {tabs.map(({ text, href, active, Icon }) => (
        <Link
          key={text}
          className={twMerge(
            `flex items-center space-x-2 rounded-lg px-1 py-2 text-sm font-medium transition-colors sm:px-4`,
            active === activeTab
              ? 'bg-orange-500 text-white shadow'
              : 'text-gray-200 hover:bg-neutral-700'
          )}
          href={href}
        >
          <Icon className='text-lg' />
          <span>{text}</span>
        </Link>
      ))}
    </div>
  );
}
