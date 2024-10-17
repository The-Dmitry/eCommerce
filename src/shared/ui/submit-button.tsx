import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type='submit' disabled={pending} className='disabled:text-red-700'>
      Submit
    </button>
  );
}
