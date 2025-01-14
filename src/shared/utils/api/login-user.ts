'use server';

import { cookies } from 'next/headers';
import { BASE_URL } from '../../constants/base-url';
import { COOKIES_DATA } from '../../constants/cookies-data';
import { AuthResponse } from '../../models/AuthResponse';
import saveAuthToken from '../save-auth-token';
import fetchActiveCart from './cart/fetch-active-cart';

export default async function loginUser(email: string, password: string) {
  const token = btoa(
    [process.env.CLIENT_ID, process.env.CLIENT_SECRET].join(':')
  );

  const URL = `${BASE_URL.AUTH}/customers/token?grant_type=password&username=${email}&password=${password}`;
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const result: AuthResponse = await response.json();
  const success = 'access_token' in result;
  if (!success) {
    return { auth: result.message, credentials: { _errors: [] } };
  }
  const data = await fetchActiveCart(result.access_token);
  if (data) {
    const refreshTokenExpirationDate = new Date();
    refreshTokenExpirationDate.setTime(
      refreshTokenExpirationDate.getTime() + 60 * 60 * 24 * 30
    );
    cookies().set(COOKIES_DATA.CART_ID, data.id, {
      maxAge: 60 * 60 * 24 * 30,
      expires: refreshTokenExpirationDate,
      sameSite: 'none',
      secure: true,
    });
    cookies().set(COOKIES_DATA.CART_VERSION, `${data.version}`, {
      maxAge: 60 * 60 * 24 * 30,
      expires: refreshTokenExpirationDate,
      sameSite: 'none',
      secure: true,
    });
  }

  saveAuthToken(result);
  return success;
}
