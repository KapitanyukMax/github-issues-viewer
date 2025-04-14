'use client';
import { MouseEvent, ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { isValidEmail } from '@/utils/validation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { login } from '@/utils/auth';
import { AppDispatch } from '@/store';
import { setAuth } from '@/store/auth';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
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

    setPassword(e.target.value);
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }

    try {
      const { user, accessToken } = await login(email, password);
      dispatch(setAuth(user, accessToken));
      router.push('/');
    } catch (error) {
      let message = 'Unknown authentication error';
      if (error instanceof Error) {
        message = error.message;
      }
      setLoginError(`Login failed: ${message}`);
      return;
    }
  };

  const moveToRegister = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push('/auth/register');
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
          error={null}
          onChange={handlePasswordChange}
        />
      </div>

      <Button onClick={handleSubmit} className="hover:cursor-pointer">
        Log In
      </Button>

      <p className="self-center w-fit">
        <Button variant="link" onClick={moveToRegister}>
          Register
        </Button>
      </p>
    </div>
  );
}
