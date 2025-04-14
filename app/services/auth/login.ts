import { getUserByEmail } from '@/lib/repository/user';
import { LoginDto } from '@/types/dto/auth/LoginDto';
import { generateAccessToken, generateRefreshToken } from '@/lib/tokens';
import { createSession } from '@/lib/repository/session';
import { SignInResult } from './auth.types';
import { verifyPassword } from '@/helpers/hashing';

export async function login(userDto: LoginDto): Promise<SignInResult> {
  let isValid = true;
  const userModel = await getUserByEmail(userDto.email);
  if (userModel) {
    isValid = await verifyPassword(userDto.password, userModel.password_hash);
  }

  if (!userModel || !isValid) {
    throw new Error('Incorrect username or password');
  }

  const accessToken = generateAccessToken(userModel.id.toString());
  const refreshToken = generateRefreshToken(userModel.id.toString());

  await createSession(userModel.id, refreshToken);

  return {
    tokens: { accessToken, refreshToken },
    userInfo: {
      id: userModel.id,
      email: userModel.email,
      name: userModel.name,
      role: userModel?.role?.name ?? null,
    },
  };
}
