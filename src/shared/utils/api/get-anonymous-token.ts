import { AuthResponse } from '../../models/AuthResponse';

export default async function getAnonymousToken(): Promise<AuthResponse> {
  const URL = `${process.env.AUTH_URL}/oauth/${process.env.PROJECT_KEY}/anonymous/token?grant_type=client_credentials`;
  const token = btoa(
    [process.env.CLIENT_ID, process.env.CLIENT_SECRET].join(':')
  );
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return await response.json();
}
