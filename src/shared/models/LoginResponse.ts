interface LoginError {
  code: string;
  message: string;
}
interface LoginFail {
  statusCode: number;
  message: string;
  errors: LoginError[];
  error: string;
  error_description: string;
}

interface LoginSuccess {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

type LoginResponse = LoginSuccess | LoginFail;

export default LoginResponse;
