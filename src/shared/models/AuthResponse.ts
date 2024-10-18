interface AuthError {
  code: string;
  message: string;
}
interface AuthFail {
  statusCode: number;
  message: string;
  errors: AuthError[];
  error: string;
  error_description: string;
}

interface AuthSuccess {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

type AuthResponse = AuthSuccess | AuthFail;

export default AuthResponse;
