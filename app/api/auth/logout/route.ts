import { NextRequest, NextResponse } from 'next/server';
import { getCookiesFromRequest, clearAuthCookie } from '@/lib/cookies';
import { logoutSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const cookies = getCookiesFromRequest(req);
  const refreshToken = cookies.refresh_token;

  if (refreshToken) {
    await logoutSession(refreshToken);
  }

  const clearRefresh = clearAuthCookie();

  return new NextResponse(null, {
    status: 204,
    headers: {
      'Set-Cookie': clearRefresh,
    },
  });
}
