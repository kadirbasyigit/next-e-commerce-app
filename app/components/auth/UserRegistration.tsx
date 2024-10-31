'use client';

import * as Yup from 'yup';
import Lock from '@mui/icons-material/Lock';
import AuthForm from './AuthForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { UserCredential } from 'firebase/auth';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords do not match')
    .required('Password validation is required'),
});

const UserRegistration: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const firebaseErrorMessages: { [key: string]: string } = {
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/invalid-email': 'Invalid email format. Please try again.',
    'auth/weak-password': 'Password is too weak. Please choose a stronger one.',
    'auth/network-request-failed': 'Network error. Please try again later.',
  };

  type RegisterResponse = {
    user: UserCredential;
  };

  const handleSubmit = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setLoading(true);
      const response = await axios.post<RegisterResponse>(
        '/api/firebaseRegister',
        {
          email: values.email,
          password: values.password,
        }
      );

      if (response.data.user) {
        router.push('/');
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        const firebaseErrorCode = error.response.data.error;

        const errorMessage =
          firebaseErrorMessages[firebaseErrorCode] ||
          'Registration failed. Please try again.';
        setSnackbarMessage(errorMessage);
      } else {
        setSnackbarMessage('An unexpected error occurred. Please try again.');
      }

      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <AuthForm
        isRegister
        icon={<Lock fontSize="large" />}
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        onSubmit={handleSubmit}
        title="Register"
        validationSchema={validationSchema}
        loading={loading}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserRegistration;
