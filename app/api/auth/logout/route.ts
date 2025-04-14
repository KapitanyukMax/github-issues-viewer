import { NextRequest, NextResponse } from 'next/server';
import { getTokensFromCookies, clearAuthCookies } from '@/lib/cookies';
import { logout } from '@/app/services/auth/logout';

export async function POST(req: NextRequest) {
  const tokens = await getTokensFromCookies();

  await logout(tokens.refreshToken);

  await clearAuthCookies();
  return new NextResponse(null, { status: 204 });
}
