import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Enter valid email'),
  password: z
    .string()
    .min(5, 'min 5 symbols')
    .max(20, 'max 20 symbols')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export type LoginData = z.infer<typeof loginSchema>;

export default loginSchema;
