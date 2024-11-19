import sortingTypes from '@/src/shared/constants/sorting-types';

interface Props {
  currentSort: string | null;
}

export default function CatalogSorting({ currentSort }: Props) {
  return (
    <div className='flex gap-1 text-orange-500'>
      <p>Sorting:</p>
      <select
        name='sort'
        defaultValue={currentSort ? decodeURIComponent(currentSort) : ''}
        className='bg-transparent'
      >
        {Object.entries(sortingTypes).map(([value, data], index) => (
          <option key={index} value={value} className='bg-neutral-900'>
            {data.text}
          </option>
        ))}
      </select>
    </div>
  );
}
