import Checkbox from './checkbox';
interface Props {
  data: [string, string[][]];
  currentParams: Set<string>;
}

export default function CatalogSubcategory({ data, currentParams }: Props) {
  const [category, list] = data;

  return (
    <fieldset className='flex flex-col'>
      <legend className='text-center text-lg capitalize text-orange-500'>
        {category}
      </legend>
      {list.map(([id, name]) => (
        <Checkbox key={id} name={name} isChecked={currentParams.has(id)} />
      ))}
    </fieldset>
  );
}
