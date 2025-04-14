import { RegisterDto } from '@/types/dto/auth/RegisterDto';
import { isValidEmail, isStrongPassword } from './auth';

export function isRegisterDto(user: RegisterDto): user is RegisterDto {
  if (!user?.email || !user?.password || !user.name) {
    return false;
  }

  return (
    typeof user.email === 'string' &&
    typeof user.password === 'string' &&
    typeof user.name === 'string'
  );
}

export function validateRegisterDto(user: RegisterDto) {
  if (!isRegisterDto(user)) {
    return 'missing credentials';
  }

  if (!isValidEmail(user.email)) {
    return 'invalid email';
  }

  if (!isStrongPassword(user.password)) {
    return 'week password';
  }

  if (user.name.length < 2 || user.name.length > 100) {
    return 'invalid name';
  }

  return 'valid';
}
