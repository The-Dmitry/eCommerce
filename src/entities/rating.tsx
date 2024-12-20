import { twMerge } from 'tailwind-merge';

interface Props {
  rating: string;
  className?: string;
}

export default function Rating({ rating, className }: Props) {
  const color =
    +rating >= 80
      ? ' text-green-500'
      : +rating >= 60
        ? 'text-yellow-500'
        : 'text-orange-500';
  return (
    <div
      title='Rating'
      className={twMerge(
        'absolute flex aspect-square w-8 items-center justify-center rounded-md border-4 border-current bg-black/50',
        color,
        className
      )}
    >
      {rating}
    </div>
  );
}
