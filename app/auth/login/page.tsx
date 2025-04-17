'use client';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputControl } from '@/components/Forms/InputControl';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { login, selectUser } from '@/store/authSlice';
import { useEffect } from 'react';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [router, user]);

  const handleSubmit = async (values: LoginFormValues) => {
    await dispatch(login(values));
  };

  return (
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

        <Button type="submit">Login</Button>
        <Button
          type="button"
          variant="link"
          onClick={() => router.push('/auth/register')}
          className="self-center"
        >
          Register
        </Button>
      </Form>
    </Formik>
  );
}
