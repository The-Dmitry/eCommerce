'use client';

import Form from '@shared/ui/form/form';
import SubmitButton from '@shared/ui/submit-button';
import createUser from '@shared/utils/api/auth/create-user';
import { useFormState } from 'react-dom';

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
      <Form.Error text={errors?.auth} className='-mb-10 mt-5' />
    </div>
  );
}
