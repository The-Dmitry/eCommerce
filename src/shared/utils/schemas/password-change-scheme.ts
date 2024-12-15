import { z } from 'zod';

const passwordChangeScheme = z
  .object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(5, 'Minimum password length - 5 characters')
      .max(20, 'Maximum password length - 20 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type ChangePasswordData = z.infer<typeof passwordChangeScheme>;

export default passwordChangeScheme;
