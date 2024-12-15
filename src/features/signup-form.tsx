'use client';
import { createUser } from '@/app/actions';
import { useFormState } from 'react-dom';
import SubmitButton from '../shared/ui/submit-button';
import Form from './form/form';

export default function SignupForm() {
  const [errors, func] = useFormState(createUser, null);

  const emailError = errors?.credentials.email?._errors[0];
  const passwordError = errors?.credentials.password?._errors[0];
  const firstName = errors?.credentials.firstName?._errors[0];
  const lastName = errors?.credentials.lastName?._errors[0];
  const confirmPassword = errors?.credentials.confirmPassword?._errors[0];

  return (
    <div className='w-full max-w-72 pb-10 text-orange-500'>
      <Form action={func}>
        <Form.Text placeholder='Email' name='email' hasError={!!emailError}>
          {emailError && <Form.Error text={emailError} />}
        </Form.Text>
        <Form.Text
          placeholder='First Name'
          name='firstName'
          hasError={!!firstName}
          autoComplete='off'
        >
          {firstName && <Form.Error text={firstName} />}
        </Form.Text>
        <Form.Text
          placeholder='Last Name'
          name='lastName'
          hasError={!!lastName}
          autoComplete='off'
        >
          {lastName && <Form.Error text={lastName} />}
        </Form.Text>
        <Form.Password
          placeholder='Password'
          name='password'
          hasError={!!passwordError}
        >
          {passwordError && <Form.Error text={passwordError} />}
        </Form.Password>
        <Form.Password
          placeholder='Confirm Password'
          name='confirmPassword'
          hasError={!!passwordError}
        >
          {confirmPassword && <Form.Error text={confirmPassword} />}
        </Form.Password>
        <SubmitButton>Sign Up</SubmitButton>
      </Form>
      <Form.Error text={errors?.auth} className='mt-5' />
    </div>
  );
}
