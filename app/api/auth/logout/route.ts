import { NextRequest, NextResponse } from 'next/server';
import { getTokensFromCookies, clearAuthCookies } from '@/lib/helpers/cookies';
import { logout } from '@/services/auth/authService';

export async function POST() {
  try {
    const tokens = await getTokensFromCookies();

    await logout(tokens.refreshToken);

    await clearAuthCookies();
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : 'Unknown registration error';

    return NextResponse.json(
      { error: 'Inrternal server error' },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
