interface Props {
  from: string | null;
  to: string | null;
}

export default function PriceRange({ from, to }: Props) {
  return (
    <fieldset className='flex flex-col gap-2 text-orange-500'>
      <legend className='mb-2 text-center text-lg capitalize text-orange-500'>
        Price
      </legend>
      <input
        defaultValue={from || undefined}
        type='number'
        name='from'
        placeholder='From'
        min={0}
        className='form-input bg-transparent'
      />
      <input
        defaultValue={to || undefined}
        type='number'
        name='to'
        placeholder='To'
        max={100}
        className='form-input bg-transparent'
      />
    </fieldset>
  );
}
