interface Props {
  className?: string;
  height?: string;
  width?: string;
}

export default function Skeleton({
  className = '',
  height = 'h-full',
  width = 'w-full',
}: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-neutral-900 ${height} ${width} ${className} `}
    >
      <div className='absolute inset-0'>
        <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900' />
      </div>
    </div>
  );
}
