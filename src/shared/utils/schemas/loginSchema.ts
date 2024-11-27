import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z
    .string()
    .min(5, 'Minimum password length - 5 characters')
    .max(20, 'Maximum password length - 20 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export type LoginData = z.infer<typeof loginSchema>;

export default loginSchema;
