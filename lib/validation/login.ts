import { LoginDto } from '@/types/dto/auth/LoginDto';
import { isValidEmail } from './auth';

export function isLoginDto(user: LoginDto): user is LoginDto {
  if (!user?.email || !user?.password) {
    return false;
  }

  return typeof user.email === 'string' && typeof user.password === 'string';
}

export function validateLoginDto(user: LoginDto) {
  if (!isLoginDto(user)) {
    return 'Missing credentials';
  }

  if (!isValidEmail(user.email)) {
    return 'Invalid email';
  }

  return 'Valid';
}
