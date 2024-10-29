'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import modifySearchParams from '../shared/utils/modify-search-params';

interface Props {
  total: number;
  limit: number;
}

export default function Pagination({ total, limit }: Props) {
  const params = useSearchParams();
  const router = useRouter();

  const currentPage = +(params.get('page') || 1);
  const totalPages = new Array(Math.ceil(total / limit)).fill(1);

  const switchPage = (pageNum: number) => {
    const newParams = modifySearchParams(
      Array.from(params.entries()),
      'page',
      `${pageNum}`
    );
    router.push(`?${newParams}`);
  };

  return (
    <nav className='flex gap-4'>
      {totalPages.map((_, index) => (
        <button
          key={index}
          onClick={() => switchPage(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}
    </nav>
  );
}
