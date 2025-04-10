import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth';
import { setAuthCookie } from '@/lib/cookies';

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  }

  const result = await registerUser(email, password, name);

  if (!result) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }

  const refreshCookie = setAuthCookie(result.refreshToken);

  return new NextResponse(
    JSON.stringify({
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role?.name,
      },
      accessToken: result.accessToken,
    }),
    {
      status: 201,
      headers: { 'Content-Type': 'application/json', 'Set-Cookie': refreshCookie },
    }
  );
}
