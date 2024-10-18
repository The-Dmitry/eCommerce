export interface AuthSuccess {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

export interface AuthError {
  statusCode: number;
  message: string;
  errors: {
    code: string;
    message: string;
  }[];
  error: string;
  error_description: string;
}

export type AuthResponse = AuthSuccess | AuthError;
