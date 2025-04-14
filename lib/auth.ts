import bcrypt from 'bcryptjs';
import { getUserById, getUserByEmail, createUser } from './repository/user';
import { createSession, deleteSessionByToken, getSessionByToken } from './repository/session';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from './tokens';

export async function registerUser(email: string, password: string, name: string) {
  const existing = await getUserByEmail(email);
  if (existing) return null;

  const user = await createUser(email, password, name);

  const accessToken = generateAccessToken(user.id.toString());
  const refreshToken = generateRefreshToken(user.id.toString());

  await createSession(user.id, refreshToken);

  return { accessToken, refreshToken, user };
}

export async function getUserFromAccessToken(token: string) {
  try {
    const { sub: userIdStr } = verifyAccessToken(token);
    if (!userIdStr) return null;

    const user = await getUserById(+userIdStr);
    return user;
  } catch {
    return null;
  }
}
