import { NextResponse, type NextRequest } from 'next/server';
import { Routes } from './src/shared/constants/routes';
import getAnonymousToken from './src/shared/utils/get-anonymous-token';

const routes = [Routes.SIGN_IN, Routes.SING_UP];

export async function middleware(req: NextRequest) {
  const [token, refreshToken, userType] = [
    req.cookies.get('access_token'),
    req.cookies.get('refresh_token'),
    req.cookies.get('user_type'),
  ];

  if (
    userType?.value === '' &&
    routes.includes(req.nextUrl.pathname.replace(/\/$/, ''))
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!(token && refreshToken)) {
    const data = await getAnonymousToken();
    if ('access_token' in data) {
      const { access_token, refresh_token, expires_in, scope } = data;
      const isAnonymous = scope.includes('anonymous');
      const response = NextResponse.next();
      response.cookies.set('access_token', access_token, {
        maxAge: expires_in,
      });
      response.cookies.set('refresh_token', refresh_token, {
        maxAge: 60 * 60 * 24 * 30,
      });
      response.cookies.set('user_type', isAnonymous ? 'anonymous' : '');

      return response;
    }
  }
}
