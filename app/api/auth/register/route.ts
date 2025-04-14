import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookies } from '@/lib/cookies';
import { RegisterDto } from '@/types/dto/auth/RegisterDto';
import { validateRegisterDto } from '@/lib/validation/registation';
import { register } from '@/app/services/auth/register';

export async function POST(req: NextRequest) {
  const user: RegisterDto = await req.json();
  const validationResult = validateRegisterDto(user);
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
      { error },
      { status: 409, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
