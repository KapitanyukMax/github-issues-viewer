'use client';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputControl } from '@/app/components/forms/InputControl';
import { Button } from '@/app/components/ui/button';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { register, selectUser } from '@/app/store/authSlice';
import { ErrorModal } from '@/app/components/ErrorModal';
import { useEffect, useState } from 'react';
import { getErrorMessage } from '@/app/utils/errors';

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
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

  const handleSubmit = async (values: RegisterFormValues) => {
    if (values.password !== values.confirmPassword) return;

    try {
      await dispatch(register(values)).unwrap();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setErrorMessage(errorMessage);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '', name: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Email is equired'),
          password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .required('Password is required'),
          confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match'),
          name: Yup.string().min(2, 'Name must be at least 2 characters long'),
        })}
        onSubmit={handleSubmit}
      >
        <Form className="flex-1 flex flex-col justify-center items-stretch md:w-xl gap-8">
          <h2 className="text-2xl font-bold">Sign Up</h2>

          <InputControl
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email"
          />
          <InputControl id="name" name="name" label="Name" type="text" placeholder="Enter name" />
          <InputControl
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
          />
          <InputControl
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
          />

          <Button type="submit">Sign Up</Button>
          <Button
            type="button"
            variant="link"
            onClick={() => router.push('/login')}
            className="self-center"
          >
            Log In
          </Button>
        </Form>
      </Formik>
      <ErrorModal
        open={open}
        onClose={() => setErrorMessage(null)}
        errorMessage={errorMessage ?? ''}
      />
    </>
  );
}
