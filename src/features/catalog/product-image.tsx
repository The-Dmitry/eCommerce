'use client';

import Skeleton from '@shared/ui/skeleton';
import { useEffect, useState } from 'react';

export default function ProductImage({
  url,
  alt,
}: {
  url: string;
  alt: string;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = url;
    image.onload = () => setLoaded(true);
  }, [url]);

  return (
    <div className={'aspect-[1/1.15] bg-neutral-900'}>
      {loaded ? (
        <img
          src={url}
          alt={alt}
          className={
            'size-full animate-fromTransparent rounded-xl object-cover duration-150 hover:transition-all group-hover:brightness-110'
          }
        />
      ) : (
        <Skeleton />
      )}
    </div>
  );
}
