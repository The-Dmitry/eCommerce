import { ResponseError } from './ResponseError';

export interface AuthSuccess {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

export type AuthResponse = AuthSuccess | ResponseError;
