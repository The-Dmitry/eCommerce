import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
}

export default function Skeleton({ className = '' }: Props) {
  return (
    <div
      className={`relative size-full overflow-hidden rounded-md bg-neutral-900 ${className} `}
    >
      <div className='absolute inset-0'>
        <div
          className={twMerge(
            'animate-shimmer',
            'absolute inset-0 -translate-x-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900'
          )}
        />
      </div>
    </div>
  );
}
