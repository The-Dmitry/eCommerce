import { z } from 'zod';

const signupSchema = z
  .object({
    email: z.string().email('Enter a valid email'),
    password: z
      .string()
      .min(5, 'Minimum password length - 5 characters')
      .max(20, 'Maximum password length - 20 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    firstName: z
      .string()
      .min(3, 'Minimum length - 3 characters')
      .max(20, 'Maximum length - 20 characters')
      .regex(/^[^0-9]*$/, {
        message: 'The string must not contain any numbers',
      }),
    lastName: z
      .string()
      .min(5, 'Minimum length - 3 characters')
      .max(20, 'Maximum length - 20 characters')
      .regex(/^[^0-9]*$/, {
        message: 'The string must not contain any numbers',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type SignupData = z.infer<typeof signupSchema>;

export default signupSchema;
