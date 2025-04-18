import { NextResponse } from 'next/server';
import { getTokensFromCookies, setAuthCookies } from '@/app/api/lib/helpers/cookies';
import { refresh } from '@/app/api/lib/services/auth/authService';
import { getErrorMessage } from '@/app/api/lib/helpers/errors';

export async function POST() {
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
      { error: getErrorMessage(error) },
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
