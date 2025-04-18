import { NextResponse } from 'next/server';
import { getTokensFromCookies, clearAuthCookies } from '@/app/api/lib/helpers/cookies';
import { logout } from '@/app/api/lib/services/auth/authService';
import { getErrorMessage } from '@/app/api/lib/helpers/errors';

export async function POST() {
  try {
    const tokens = await getTokensFromCookies();

    await logout(tokens.refreshToken);

    await clearAuthCookies();
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
