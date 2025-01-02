'use client';
import Form from '@shared/ui/form/form';
import SubmitButton from '@shared/ui/submit-button';
import { authQuery } from '@shared/utils/api/auth/auth-query';
import { useFormState } from 'react-dom';

export default function LoginForm() {
  const [errors, func] = useFormState(authQuery, null);

  const emailError = errors?.credentials.email?._errors[0];
  const passwordError = errors?.credentials.password?._errors[0];

  return (
    <div className='w-full max-w-72 pb-10 text-orange-500'>
      <Form action={func}>
        <Form.Text placeholder='Email' name='email' hasError={!!emailError}>
          {emailError && <Form.Error text={emailError} />}
        </Form.Text>
        <Form.Password
          placeholder='Password'
          name='password'
          hasError={!!passwordError}
        >
          {passwordError && <Form.Error text={passwordError} />}
        </Form.Password>
        <SubmitButton>Sign In</SubmitButton>
      </Form>
      <Form.Error text={errors?.auth} className='-mb-10 mt-5' />
    </div>
  );
}
