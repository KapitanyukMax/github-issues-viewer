import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookies } from '@/lib/helpers/cookies';
import { LoginDto } from '@/types/dto/auth/LoginDto';
import { validateLoginDto } from '@/lib/validation/login';
import { login } from '@/services/auth/authService';

export async function POST(req: NextRequest) {
  const user: LoginDto = await req.json();
  const validationResult = validateLoginDto(user);
  if (validationResult !== 'valid') {
    return NextResponse.json(
      { error: `Bad request - ${validationResult}` },
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  try {
    const result = await login(user);
    await setAuthCookies(result.tokens);

    return NextResponse.json(
      { data: result.userInfo },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
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
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
