import { serialize, parse } from 'cookie';

export const REFRESH_TOKEN_COOKIE = 'refresh_token';

export function setAuthCookie(refreshToken: string) {
  const refresh = serialize(REFRESH_TOKEN_COOKIE, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return refresh;
}

export function clearAuthCookie() {
  const refresh = serialize(REFRESH_TOKEN_COOKIE, '', {
    path: '/',
    maxAge: 0,
  });

  return refresh;
}

export function getCookiesFromRequest(req: Request): Record<string, string | undefined> {
  const cookieHeader = req.headers.get('cookie') || '';
  return parse(cookieHeader);
}
