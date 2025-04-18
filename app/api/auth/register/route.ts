import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookies } from '@/app/api/lib/helpers/cookies';
import { RegisterDto } from '@/app/types/shared/dto/auth/RegisterDto';
import { validateRegisterDto } from '@/app/api/lib/validation/register';
import { register } from '@/app/api/lib/services/auth/authService';
import { getErrorMessage } from '@/app/api/lib/helpers/errors';

export async function POST(req: NextRequest) {
  const user: RegisterDto = await req.json();
  const validationResult = validateRegisterDto(user);
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
    const result = await register(user);
    await setAuthCookies(result.tokens);

    return NextResponse.json(
      { data: result.userInfo },
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 409, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
