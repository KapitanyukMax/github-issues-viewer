import { NextRequest, NextResponse } from 'next/server';
import { getTokensFromCookies, clearAuthCookies } from '@/lib/helpers/cookies';
import { logout } from '@/services/auth/authService';
import { getErrorMessage } from '@/lib/helpers/errors';

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
