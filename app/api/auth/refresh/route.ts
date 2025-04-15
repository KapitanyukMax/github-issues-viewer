import { NextRequest, NextResponse } from 'next/server';
import { getTokensFromCookies, setAuthCookies } from '@/lib/helpers/cookies';
import { refresh } from '@/services/auth/authService';

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
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : 'Unknown registration error';

    return NextResponse.json(
      { error: errorMessage },
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
