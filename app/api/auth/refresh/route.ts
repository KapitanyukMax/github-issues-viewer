import { NextRequest, NextResponse } from 'next/server';
import { refreshSession } from '@/lib/auth';
import { getCookiesFromRequest, setAuthCookie } from '@/lib/cookies';

export async function POST(req: NextRequest) {
  const cookies = getCookiesFromRequest(req);
  const refreshToken = cookies.refresh_token;

  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
  }

  try {
    const { accessToken, refreshToken: newRefreshToken } = await refreshSession(refreshToken);

    const refreshCookie = setAuthCookie(newRefreshToken);

    return new NextResponse(JSON.stringify({ accessToken }), {
      status: 204,
      headers: {
        'Set-Cookie': refreshCookie,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Invalid refresh token' }, { status: 403 });
  }
}
