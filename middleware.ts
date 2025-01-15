import fetchActiveCart from '@shared/utils/api/cart/fetch-active-cart';
import { NextResponse, type NextRequest } from 'next/server';
import { COOKIES_DATA } from './src/shared/constants/cookies-data';
import { Routes } from './src/shared/constants/routes';
import REGISTERED_USER from './src/shared/constants/user-type';
import getAnonymousToken from './src/shared/utils/api/get-anonymous-token';

const routes = [Routes.SIGN_IN, Routes.SING_UP];

export async function middleware(req: NextRequest) {
  const [token, refreshToken, userType, cartId] = [
    req.cookies.get(COOKIES_DATA.ACCESS_TOKEN),
    req.cookies.get(COOKIES_DATA.REFRESH_TOKEN),
    req.cookies.get(COOKIES_DATA.USER_TYPE),
    req.cookies.get(COOKIES_DATA.CART_ID),
  ];

  if (
    userType?.value === REGISTERED_USER &&
    routes.includes(req.nextUrl.pathname.replace(/\/$/, ''))
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (
    userType?.value !== REGISTERED_USER &&
    req.nextUrl.pathname.replace(/\/$/, '') === Routes.PERSONAL
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const response = NextResponse.next();
  if (!(token && refreshToken)) {
    const data = await getAnonymousToken();
    if ('access_token' in data) {
      const { access_token, refresh_token, expires_in, scope } = data;
      const isAnonymous = scope.includes('anonymous');
      response.cookies.set(COOKIES_DATA.ACCESS_TOKEN, access_token, {
        maxAge: expires_in,
      });
      response.cookies.set(COOKIES_DATA.REFRESH_TOKEN, refresh_token, {
        maxAge: 60 * 60 * 24 * 30,
      });
      response.cookies.set(
        COOKIES_DATA.USER_TYPE,
        isAnonymous ? '' : REGISTERED_USER
      );

      return response;
    }
  }

  if (token && !cartId?.value) {
    const active_cart = await fetchActiveCart(token.value);
    if (active_cart) {
      response.cookies.set(COOKIES_DATA.CART_ID, active_cart.id);
      response.cookies.set(COOKIES_DATA.CART_VERSION, `${active_cart.version}`);
    }

    return response;
  }
}
