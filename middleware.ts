import { NextResponse, type NextRequest } from 'next/server';
import getAnonymousToken from './src/shared/utils/get-anonymous-token';

export async function middleware(req: NextRequest) {
  const [token, refreshToken] = [
    req.cookies.get('access_token'),
    req.cookies.get('refresh_token'),
  ];

  if (!(token && refreshToken)) {
    const data = await getAnonymousToken();
    if ('access_token' in data) {
      const { access_token, refresh_token, expires_in } = data;
      const response = NextResponse.next();
      response.cookies.set('access_token', access_token, {
        maxAge: expires_in,
      });
      response.cookies.set('refresh_token', refresh_token, {
        maxAge: 60 * 60 * 24 * 30,
      });
      return response;
    }
  }
}
