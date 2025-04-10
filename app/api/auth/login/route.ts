import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth';
import { setAuthCookies } from '@/lib/cookies';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  }

  const result = await loginUser(email, password);

  if (!result) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }

  const [accessCookie, refreshCookie] = setAuthCookies(result.accessToken, result.refreshToken);

  const response = new NextResponse(
    JSON.stringify({
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role?.name,
      },
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  response.headers.append('Set-Cookie', accessCookie);
  response.headers.append('Set-Cookie', refreshCookie);
  return response;
}
