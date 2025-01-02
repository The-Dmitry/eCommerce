'use client';

import SubmitButton from '@/src/shared/ui/submit-button';
import changePassword from '@/src/shared/utils/api/personal/change-password';
import Form from '@shared/ui/form/form';
import { useFormState } from 'react-dom';

export default function PersonalPasswordForm() {
  const [errors, action] = useFormState(changePassword, null);

  const currentPassword = errors?.credentials.currentPassword?._errors[0];
  const newPassword = errors?.credentials.newPassword?._errors[0];
  const confirmPassword = errors?.credentials.confirmPassword?._errors[0];

  return (
    <Form action={action} className='w-full text-orange-500'>
      <Form.Password
        text='Current password'
        name='currentPassword'
        hasError={!!currentPassword}
      >
        {currentPassword && <Form.Error text={currentPassword} />}
      </Form.Password>
      <Form.Password
        text='New password'
        name='newPassword'
        hasError={!!newPassword}
      >
        {newPassword && <Form.Error text={newPassword} />}
      </Form.Password>
      <Form.Password
        text='Confirm password'
        name='confirmPassword'
        hasError={!!confirmPassword}
      >
        {confirmPassword && <Form.Error text={confirmPassword} />}
      </Form.Password>
      {errors?.auth && <Form.Error text={errors.auth} />}
      {errors?.success ? (
        <p className='flex h-8 w-44 select-none items-center justify-center rounded-md bg-green-600 text-lg text-white'>
          Success
        </p>
      ) : (
        <SubmitButton>Change password</SubmitButton>
      )}
    </Form>
  );
}
