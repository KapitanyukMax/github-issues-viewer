import { serialize, parse } from 'cookie';

export const ACCESS_TOKEN_COOKIE = 'access_token';
export const REFRESH_TOKEN_COOKIE = 'refresh_token';

export function setAuthCookies(accessToken: string, refreshToken: string) {
  const access = serialize(ACCESS_TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 15,
  });

  const refresh = serialize(REFRESH_TOKEN_COOKIE, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return [access, refresh];
}

export function clearAuthCookies() {
  const access = serialize(ACCESS_TOKEN_COOKIE, '', {
    path: '/',
    maxAge: 0,
  });

  const refresh = serialize(REFRESH_TOKEN_COOKIE, '', {
    path: '/',
    maxAge: 0,
  });

  return [access, refresh];
}

export function getCookiesFromRequest(req: Request): Record<string, string | undefined> {
  const cookieHeader = req.headers.get('cookie') || '';
  return parse(cookieHeader);
}
