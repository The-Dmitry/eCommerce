'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from 'react-icons/ai';

import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../shared/ui/button';
import calculatePagination from '../shared/utils/calculate-pagination';
import modifySearchParams from '../shared/utils/modify-search-params';

interface Props {
  total: number;
  limit: number;
}

const BUTTON_STYLE = 'aspect-square h-8 p-0';

export default function Pagination({ total, limit }: Props) {
  const params = useSearchParams();
  const router = useRouter();

  const currentPage = +(params.get('page') || 1);
  const totalPages = new Array(Math.ceil(total / limit)).fill(1);

  const pagesForRender = useMemo(
    () => calculatePagination(totalPages.length, currentPage),
    [totalPages, currentPage]
  );

  const switchPage = (pageNum: number) => {
    const newParams = modifySearchParams(
      Array.from(params.entries()),
      'page',
      `${pageNum}`
    );
    router.push(`?${newParams}`);
  };

  if (!total) {
    return <></>;
  }

  return (
    <nav className='mx-auto mt-3 flex gap-4'>
      <Button
        variant='button'
        className={BUTTON_STYLE}
        disabled={currentPage === 1}
        onClick={() => switchPage(1)}
      >
        <AiOutlineDoubleLeft />
      </Button>
      <Button
        variant='button'
        className={twMerge(BUTTON_STYLE, 'hidden sm:flex')}
        disabled={currentPage === 1}
        onClick={() => switchPage(currentPage - 1)}
      >
        <AiOutlineLeft />
      </Button>

      {pagesForRender.map((v) => (
        <Button
          variant='button'
          key={v}
          onClick={() => switchPage(v)}
          disabled={currentPage === v}
          className={BUTTON_STYLE}
        >
          {v}
        </Button>
      ))}
      <Button
        variant='button'
        className={twMerge(BUTTON_STYLE, 'hidden sm:flex')}
        disabled={currentPage === totalPages.length}
        onClick={() => switchPage(currentPage + 1)}
      >
        <AiOutlineRight />
      </Button>
      <Button
        variant='button'
        className={BUTTON_STYLE}
        disabled={currentPage === totalPages.length}
        onClick={() => switchPage(totalPages.length)}
      >
        <AiOutlineDoubleRight />
      </Button>
    </nav>
  );
}
