import FormInputProps from '@/src/shared/models/form-input-props';
import { twMerge } from 'tailwind-merge';

export default function TextInput({
  text,
  labelProps,
  className,
  hasError,
  children,
  divClassName,
  ...rest
}: FormInputProps) {
  return (
    <div
      className={twMerge(
        'mb-6 w-full last-of-type:mb-3',
        divClassName,
        children && 'mb-1'
      )}
    >
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
