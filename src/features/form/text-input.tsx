import FormInputProps from '@/src/shared/models/form-input-props';
import { twMerge } from 'tailwind-merge';

export default function TextInput({
  text,
  labelProps,
  className,
  hasError,
  children,
  ...rest
}: FormInputProps) {
  return (
    <div className={twMerge(children && 'pb-7', 'w-full')}>
      <label
        className={twMerge(
          'flex flex-col text-center text-current',
          labelProps?.className
        )}
        {...labelProps}
      >
        {text && text}
        <input
          type='text'
          className={twMerge(
            'form-input',
            hasError && 'border-red-500',
            className
          )}
          {...rest}
        />
      </label>
      {children}
    </div>
  );
}
