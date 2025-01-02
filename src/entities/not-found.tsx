import { Routes } from '@/src/shared/constants/routes';
import Button from '@shared/ui/button';

export default function NotFound() {
  return (
    <div className='flex size-full flex-col items-center justify-center gap-5 text-orange-500'>
      <h2 className='text-4xl'>Not Found</h2>
      <Button variant='link' href={Routes.CATALOG}>
        Catalog
      </Button>
    </div>
  );
}
