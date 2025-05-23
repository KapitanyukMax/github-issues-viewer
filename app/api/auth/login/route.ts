import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookies } from '@/app/api/lib/helpers/cookies';
import { LoginDto } from '@/app/types/shared/dto/auth/LoginDto';
import { validateLoginDto } from '@/app/api/lib/validation/login';
import { login } from '@/app/api/lib/services/auth/authService';
import { getErrorMessage } from '@/app/api/lib/helpers/errors';

export async function POST(req: NextRequest) {
  const user: LoginDto = await req.json();
  const validationResult = validateLoginDto(user);
  if (validationResult !== 'Valid') {
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
    return NextResponse.json(
      { error: getErrorMessage(error) },
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
