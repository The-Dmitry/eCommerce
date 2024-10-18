import { cookies } from 'next/headers';
import { AuthSuccess } from '../models/AuthResponse';

export default function saveAuthToken({
  access_token,
  refresh_token,
  expires_in,
}: AuthSuccess) {
  cookies().set('access_token', access_token, { maxAge: expires_in });
  cookies().set('refresh_token', refresh_token, { maxAge: 60 * 60 * 24 * 30 });
}
