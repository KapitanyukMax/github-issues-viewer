import { NextRequest, NextResponse } from 'next/server';
import { refreshSession } from '@/lib/auth';
import { getCookiesFromRequest, setAuthCookies } from '@/lib/cookies';

export async function POST(req: NextRequest) {
  const cookies = getCookiesFromRequest(req);
  const refreshToken = cookies.refresh_token;

  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
  }

  try {
    const { accessToken, refreshToken: newRefreshToken } = await refreshSession(refreshToken);

    const [accessCookie, refreshCookie] = setAuthCookies(accessToken, newRefreshToken);

    const response = new NextResponse(null, {
      status: 204,
    });
    response.headers.append('Set-Cookie', accessCookie);
    response.headers.append('Set-Cookie', refreshCookie);
    return response;
  } catch {
    return NextResponse.json({ error: 'Invalid refresh token' }, { status: 403 });
  }
}
