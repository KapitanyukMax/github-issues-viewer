import validator from 'validator';

export function isValidEmail(email: string) {
  return validator.isEmail(email);
}

export function isValidPassword(password: string) {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
}
