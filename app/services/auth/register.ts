import { createUser, getUserByEmail } from '@/lib/repository/user';
import { generateAccessToken, generateRefreshToken } from '@/lib/tokens';
import { createSession } from '@/lib/repository/session';
import { SignInResult } from './auth.types';
import { RegisterDto } from '@/types/dto/auth/RegisterDto';
import { hashPassword } from '@/helpers/hashing';

export async function register(userDto: RegisterDto): Promise<SignInResult> {
  const existing = await getUserByEmail(userDto.email);
  if (existing) throw new Error('User already exists');

  const passwordHash = await hashPassword(userDto.password);
  const userModel = await createUser(userDto.email, passwordHash, userDto.name);

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
