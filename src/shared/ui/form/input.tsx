import { FormInputPropsWithType } from '@/src/shared/models/form-input-props';
import { twMerge } from 'tailwind-merge';

export default function Input({
  text,
  labelProps,
  className,
  hasError,
  children,
  type,
  ...rest
}: FormInputPropsWithType) {
  return (
    <div
      className={twMerge('mb-6 w-full last-of-type:mb-3', children && 'mb-1')}
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
          type={type}
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
