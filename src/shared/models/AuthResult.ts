import { LoginData } from '@shared/utils/schemas/loginSchema';
import { SignupData } from '@shared/utils/schemas/signupShema';
import { ZodFormattedError } from 'zod';

export default interface AuthResult<T extends LoginData | SignupData> {
  auth?: string;
  credentials: ZodFormattedError<T>;
}
