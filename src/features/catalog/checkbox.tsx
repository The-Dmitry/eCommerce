import { AiOutlineCheck } from 'react-icons/ai';

interface Props {
  name: string;
  isChecked: boolean;
  text?: string;
}

export default function Checkbox({ isChecked, name, text }: Props) {
  return (
    <label className='flex cursor-pointer select-none items-center justify-between text-lg text-zinc-400 transition-all hover:text-zinc-200'>
      <input
        defaultChecked={isChecked}
        type='checkbox'
        className='peer hidden'
        name={name}
      />
      <span className='peer-checked:text-orange-500'>{text ? text : name}</span>
      <AiOutlineCheck className='text-transparent peer-checked:text-orange-500' />
    </label>
  );
}
