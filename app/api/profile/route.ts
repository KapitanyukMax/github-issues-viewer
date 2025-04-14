import { getUserFromAccessToken } from '@/lib/auth';
import { getAccessTokenFromRequest } from '@/lib/auth-header';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const accessToken = getAccessTokenFromRequest(req);
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized - No access token' }, { status: 401 });
  }

  try {
    const user = getUserFromAccessToken(accessToken);
    if (!user) {
      return NextResponse.json({ error: 'Forbidden - Invalid token' }, { status: 403 });
    }

    return NextResponse.json(
      { user },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Unauthorized - Token verification failed' },
      { status: 401 }
    );
  }
}
