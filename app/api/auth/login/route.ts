import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth';
import { setAuthCookie } from '@/lib/cookies';
import { getAccessTokenFromRequest } from '@/lib/auth-header';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  }

  const result = await loginUser(email, password);

  if (!result) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }

  const accessToken = getAccessTokenFromRequest(req);
  const refreshCookie = setAuthCookie(result.refreshToken);

  return new NextResponse(
    JSON.stringify({
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role?.name,
      },
      accessToken,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': refreshCookie,
      },
    }
  );
}
