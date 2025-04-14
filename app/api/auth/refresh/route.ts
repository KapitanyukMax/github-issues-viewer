import { NextRequest, NextResponse } from 'next/server';
import { getTokensFromCookies, setAuthCookies } from '@/lib/cookies';
import { refresh } from '@/app/services/auth/refresh';

export async function POST(req: NextRequest) {
  const tokens = await getTokensFromCookies();

  if (!tokens.refreshToken) {
    return NextResponse.json(
      { error: 'No refresh token' },
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  try {
    const newTokens = await refresh(tokens.refreshToken);
    await setAuthCookies(newTokens);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
