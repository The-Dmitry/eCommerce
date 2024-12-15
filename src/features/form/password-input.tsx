'use client';

import FormInputProps from '@/src/shared/models/form-input-props';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

export default function PasswordInput({
  text,
  labelProps,
  className,
  hasError,
  children,
  ...rest
}: FormInputProps) {
  const [value, setValue] = useState('');
  const [passwordMode, setPasswordMode] = useState(true);

  const switchMode = () => setPasswordMode((prev) => !prev);

  return (
    <div
      className={twMerge('mb-6 w-full last-of-type:mb-3', children && 'mb-1')}
    >
      <label
        className={twMerge(
          'flex flex-col text-center text-current',
          labelProps?.className
        )}
      >
        {text && text}
        <div className='relative'>
          <input
            type={passwordMode ? 'password' : 'text'}
            name='password'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={twMerge(
              'form-input w-full',
              hasError && 'border-red-500',
              className
            )}
            {...rest}
          />
          <button
            type='button'
            onClick={switchMode}
            className='absolute right-0 top-0 h-full pr-1 text-2xl'
          >
            {passwordMode ? <AiFillEye /> : <AiFillEyeInvisible />}
          </button>
        </div>
      </label>
      {children}
    </div>
  );
}
