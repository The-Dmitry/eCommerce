import FormInputProps from '@shared/models/form-input-props';
import { twMerge } from 'tailwind-merge';

export default function DateInput({
  text,
  labelProps,
  className,
  hasError,
  divClassName,
  children,
  ...rest
}: Omit<FormInputProps, 'type'>) {
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
          type='date'
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
