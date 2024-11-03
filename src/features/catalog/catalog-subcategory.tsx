interface Props {
  data: [string, string[][]];
  currentParams: Set<string>;
}

export default function CatalogSubcategory({ data, currentParams }: Props) {
  const [category, list] = data;
  return (
    <fieldset className='flex flex-col'>
      <legend>{category}</legend>
      {list.map(([id, name]) => (
        <label key={id}>
          <input
            defaultChecked={currentParams.has(id)}
            type='checkbox'
            name={name}
          />
          {name}
        </label>
      ))}
    </fieldset>
  );
}
