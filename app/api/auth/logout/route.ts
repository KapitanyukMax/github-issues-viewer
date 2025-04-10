import { NextRequest, NextResponse } from 'next/server';
import { getCookiesFromRequest, clearAuthCookies } from '@/lib/cookies';
import { logoutSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const cookies = getCookiesFromRequest(req);
  const refreshToken = cookies.refresh_token;

  if (refreshToken) {
    await logoutSession(refreshToken);
  }

  const [clearAccess, clearRefresh] = clearAuthCookies();

  const response = new NextResponse(null, {
    status: 204,
  });
  response.headers.append('Set-Cookie', clearAccess);
  response.headers.append('Set-Cookie', clearRefresh);
  return response;
}
