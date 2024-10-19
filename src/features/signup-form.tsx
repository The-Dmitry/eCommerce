'use client';
import { createUser } from '@/app/actions';
import { useFormState } from 'react-dom';
import SubmitButton from '../shared/ui/submit-button';

export default function SignupForm() {
  const [errors, func] = useFormState(createUser, null);

  const emailError = errors?.credentials.email?._errors[0];
  const passwordError = errors?.credentials.password?._errors[0];
  const firstName = errors?.credentials.firstName?._errors[0];
  const lastName = errors?.credentials.lastName?._errors[0];

  return (
    <form className='flex flex-col gap-2' action={func}>
      <label className='flex flex-col text-center'>
        Email
        <input type='text' name='email' />
      </label>
      {emailError && <p>{emailError}</p>}
      <label className='flex flex-col text-center'>
        First Name
        <input type='text' name='firstName' />
      </label>
      {firstName && <p>{firstName}</p>}
      <label className='flex flex-col text-center'>
        Last Name
        <input type='text' name='lastName' />
      </label>
      {lastName && <p>{lastName}</p>}
      <label className='flex flex-col text-center'>
        Password
        <input type='password' name='password' />
      </label>
      {passwordError && <p>{passwordError}</p>}
      {errors?.auth && <p className='text-xl text-red-600'>{errors.auth}</p>}
      <SubmitButton />
    </form>
  );
}
