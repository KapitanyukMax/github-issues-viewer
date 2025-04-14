import { AuthResponse, User } from '../types/ui/auth';

export function isAuthorized() {
  const accessToken = sessionStorage.getItem('accessToken');
  if (!accessToken) {
    return false;
  }
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  return res.json();
}

export async function logout(): Promise<void> {
  await fetch('/api/auth/logout', { method: 'POST' });
}

export async function getUserByAccessToken(accessToken: string): Promise<User | null> {
  const res = await fetch('/api/profile', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    if (res.status === 403) {
      const { error } = await res.json();
      throw new Error(error);
    }

    return null;
  }

  const { user } = await res.json();
  return user;
}

export async function refreshToken(): Promise<string | null> {
  const res = await fetch('/api/auth/refresh', { method: 'POST' });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  const { accessToken } = await res.json();
  return accessToken;
}
