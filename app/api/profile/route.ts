import { getUserByAccessToken } from '@/app/api/lib/services/auth/authService';
import { getTokensFromCookies } from '@/app/api/lib/helpers/cookies';
import { NextResponse } from 'next/server';

export async function GET() {
  const { accessToken } = await getTokensFromCookies();
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized - No access token' }, { status: 401 });
  }

  try {
    const user = await getUserByAccessToken(accessToken);
    if (!user) {
      return NextResponse.json({ error: 'Forbidden - Invalid token' }, { status: 403 });
    }

    return NextResponse.json(
      { data: user },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: 'Unauthorized - Token verification failed' },
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
