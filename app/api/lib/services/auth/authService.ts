import { hashPassword, verifyPassword } from '@/app/api/lib/helpers/hashing';
import { createUser, getUserByEmail, getUserById } from '@/app/api/lib/repositories/userRepository';
import { LoginDto } from '@/app/types/shared/dto/auth/LoginDto';
import { SignInResult } from './auth.types';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from '@/app/api/lib/helpers/tokens';
import {
  createSession,
  deleteSessionByToken,
  getSessionByToken,
} from '@/app/api/lib/repositories/sessionRepository';
import { Tokens } from '@/app/api/lib/helpers/tokens.types';
import { RegisterDto } from '@/app/types/shared/dto/auth/RegisterDto';

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

export async function logout(refreshToken: string | null) {
  try {
    if (refreshToken) await deleteSessionByToken(refreshToken);
    return true;
  } catch {
    return false;
  }
}

export async function refresh(oldRefreshToken: string): Promise<Tokens> {
  const { sub: userIdStr } = verifyRefreshToken(oldRefreshToken);
  if (!userIdStr) {
    throw new Error('Invalid refresh token');
  }

  const session = await getSessionByToken(oldRefreshToken);
  if (!session) {
    throw new Error('Invalid refresh token');
  }

  try {
    await deleteSessionByToken(oldRefreshToken);
  } catch {}

  if (session.expires_at < new Date()) {
    throw new Error('Expired refresh token');
  }

  const newAccessToken = generateAccessToken(userIdStr);
  const newRefreshToken = generateRefreshToken(userIdStr);

  await createSession(+userIdStr, newRefreshToken);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}

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

export async function getUserByAccessToken(accessToken: string) {
  try {
    const { sub: userIdStr } = verifyAccessToken(accessToken);
    if (!userIdStr) return null;

    return getUserById(+userIdStr);
  } catch {
    return null;
  }
}
