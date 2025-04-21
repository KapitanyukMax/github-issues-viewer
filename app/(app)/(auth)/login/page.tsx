'use client';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputControl } from '@/app/components/forms/InputControl';
import { Button } from '@/app/components/ui/button';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { login, selectUser } from '@/app/store/authSlice';
import { useEffect, useState } from 'react';
import { ErrorModal } from '@/app/components/ErrorModal';
import { getErrorMessage } from '@/app/utils/errors';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const open = errorMessage !== null && errorMessage !== '';

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [router, user]);

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await dispatch(login(values)).unwrap();
    } catch (error) {
      console.log(error);
      const errorMessage = getErrorMessage(error);
      setErrorMessage(errorMessage);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Email is equired'),
          password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .required('Password is required'),
        })}
        onSubmit={handleSubmit}
      >
        <Form className="flex-1 flex flex-col justify-center items-stretch md:w-xl gap-8">
          <h2 className="text-2xl font-bold">Log In</h2>

          <InputControl
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email"
          />
          <InputControl
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
          />

          <Button type="submit">Log In</Button>
          <Button
            type="button"
            variant="link"
            onClick={() => router.push('/register')}
            className="self-center"
          >
            Sign Up
          </Button>
        </Form>
      </Formik>
      <ErrorModal
        title="Login Error"
        open={open}
        onClose={() => setErrorMessage(null)}
        errorMessage={errorMessage ?? ''}
      />
    </>
  );
}
