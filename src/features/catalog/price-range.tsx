export default function PriceRange() {
  return (
    <fieldset className='flex flex-col'>
      <legend>Price</legend>
      <input type='number' name='from' placeholder='From' min={0} />
      <input type='number' name='to' placeholder='To' max={100} />
    </fieldset>
  );
}
