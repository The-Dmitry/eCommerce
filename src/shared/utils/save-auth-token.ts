import { cookies } from 'next/headers';
import { COOKIES_DATA } from '../constants/cookies-data';
import REGISTERED_USER from '../constants/user-type';
import { AuthSuccess } from '../models/AuthResponse';

export default function saveAuthToken({
  access_token,
  refresh_token,
  expires_in,
  scope,
}: AuthSuccess) {
  const isAnonymous = scope.includes('anonymous');
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + expires_in * 1000);
  cookies().set(COOKIES_DATA.ACCESS_TOKEN, access_token, {
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: true,
    expires: expirationDate,
  });
  cookies().set(COOKIES_DATA.REFRESH_TOKEN, refresh_token, {
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: true,
  });
  cookies().set(COOKIES_DATA.USER_TYPE, isAnonymous ? '' : REGISTERED_USER);
}
