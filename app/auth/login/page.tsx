'use client';
import { MouseEvent, ChangeEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/passwordInput';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AppDispatch, RootState } from '@/store';
import { login, clearError } from '@/store/authSlice';
import { getBadRequestErrorMessage, isEmailError } from '@/utils/errors';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { user, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  useEffect(() => {
    if (!error) return;

    if (isEmailError(error)) {
      setEmailError('Invalid email address');
      return;
    }
    setLoginError(getBadRequestErrorMessage(error));
  }, [error]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (loginError) {
      setLoginError(null);
    }
    if (emailError) {
      setEmailError(null);
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (loginError) {
      setLoginError(null);
    }
    if (passwordError) {
      setPasswordError(null);
    }
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let isError = false;
    if (email.trim().length === 0) {
      setEmailError('Enter email address');
      isError = true;
    }
    if (password.trim().length === 0) {
      setPasswordError('Enter password');
      isError = true;
    }
    if (isError) return;

    if (error) {
      dispatch(clearError());
    }
    dispatch(login(email, password));
  };

  const forwardToRegister = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push('/auth/register');
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-stretch md:w-xl gap-8">
      <h2 className="text-2xl font-bold">Log In</h2>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email-input" className={cn(emailError && 'text-red-500')}>
          Email
        </Label>
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
        <Label htmlFor="password-input" className={cn(passwordError && 'text-red-500')}>
          Password
        </Label>
        <PasswordInput
          id="password-input"
          placeholder="Enter password..."
          value={password}
          error={passwordError}
          onChange={handlePasswordChange}
        />
      </div>

      {loginError && <p className="text-red-500">{loginError}</p>}

      <Button onClick={handleSubmit} className="hover:cursor-pointer">
        Log In
      </Button>

      <p className="self-center w-fit">
        <Button variant="link" onClick={forwardToRegister}>
          Register
        </Button>
      </p>
    </div>
  );
}
