import bcrypt from 'bcryptjs';
import { findUserById, findUserByEmail, createUser } from './db/users';
import { storeRefreshToken, revokeRefreshToken, getRefreshTokenByToken } from './db/tokens';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from './tokens';

export async function registerUser(email: string, password: string, name: string) {
  const existing = await findUserByEmail(email);
  if (existing) return null;

  const user = await createUser(email, password, name);

  const accessToken = generateAccessToken(user.id.toString());
  const refreshToken = generateRefreshToken(user.id.toString());

  await storeRefreshToken(user.id, refreshToken);

  return { accessToken, refreshToken, user };
}

export async function loginUser(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return null;

  const accessToken = generateAccessToken(user.id.toString());
  const refreshToken = generateRefreshToken(user.id.toString());

  await storeRefreshToken(user.id, refreshToken);

  return { accessToken, refreshToken, user };
}

export async function refreshSession(oldRefreshToken: string) {
  const payload = verifyRefreshToken(oldRefreshToken) as { sub: string };

  const storedToken = await getRefreshTokenByToken(oldRefreshToken);
  if (!storedToken || storedToken.expires_at < new Date()) {
    throw new Error('Invalid or expired refresh token');
  }

  await revokeRefreshToken(oldRefreshToken);

  const newAccessToken = generateAccessToken(payload.sub);
  const newRefreshToken = generateRefreshToken(payload.sub);

  await storeRefreshToken(+payload.sub, newRefreshToken);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}

export async function logoutSession(refreshToken: string) {
  try {
    const payload = verifyRefreshToken(refreshToken) as { sub: string };
    await revokeRefreshToken(refreshToken);
    return true;
  } catch {
    return false;
  }
}

export async function getUserFromAccessToken(token: string) {
  try {
    const payload = verifyAccessToken(token) as { sub: string };
    const user = await findUserById(+payload.sub);
    return user;
  } catch {
    return null;
  }
}
