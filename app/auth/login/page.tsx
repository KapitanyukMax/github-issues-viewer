'use client';
import { MouseEvent, ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isValidEmail, isValidPassword } from '@/app/utils/validation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AppDispatch } from '@/lib/store';
import { setAuthorized } from '@/lib/store/auth';
import { login } from '@/app/utils/auth';

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (loginError) {
      setLoginError(null);
    }

    if (emailError) {
      setEmailError(null);
    }

    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (loginError) {
      setLoginError(null);
    }

    if (passwordError) {
      setPasswordError(null);
    }

    setPassword(e.target.value);
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isValidEmail) {
      setEmailError('Invalid email address');
      return;
    }

    if (!isValidPassword) {
      setPasswordError(
        'Password must be at least 8 characters length and include at least ' +
          '1 lowercase, 1 uppercase, 1 number, and 1 special character'
      );
      return;
    }

    try {
      const authState = await login(email, password);
      dispatch(setAuthorized(authState));
    } catch (error) {
      let message = 'Unknown authentication error';
      if (error instanceof Error) {
        message = error.message;
      }
      setLoginError(`Login failed: ${message}`);
      return;
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-stretch md:w-xl gap-8">
      <h2 className="text-2xl font-bold">Log In</h2>

      {loginError && <p className="text-red-600">{loginError}</p>}

      <div className="flex flex-col gap-2">
        <Label htmlFor="email-input">Email</Label>
        <Input
          id="email-input"
          type="email"
          placeholder="Enter email..."
          value={email}
          error={emailError}
          onChange={handleEmailChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password-input">Password</Label>
        <Input
          id="password-input"
          type="password"
          placeholder="Enter password..."
          value={password}
          error={passwordError}
          onChange={handlePasswordChange}
        />
      </div>

      <Button onClick={handleSubmit}>Log In</Button>
    </div>
  );
}
