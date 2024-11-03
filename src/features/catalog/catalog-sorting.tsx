import sortingTypes from '@/src/shared/constants/sorting-types';

interface Props {
  currentSort: string | null;
}

export default function CatalogSorting({ currentSort }: Props) {
  return (
    <select
      name='sort'
      defaultValue={currentSort ? decodeURIComponent(currentSort) : ''}
    >
      {Object.entries(sortingTypes).map(([value, data], index) => (
        <option key={index} value={value}>
          {data.text}
        </option>
      ))}
    </select>
  );
}
