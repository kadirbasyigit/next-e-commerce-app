'use client';

import * as Yup from 'yup';
import LockOpenIcon from '@mui/icons-material/LockOpen';
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
});

const UserLogin: React.FC = () => {
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const firebaseErrorMessages: { [key: string]: string } = {
    'auth/user-not-found': 'No user found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-email': 'Invalid email format. Please try again.',
    'auth/network-request-failed': 'Network error. Please try again later.',
    'auth/invalid-credential':
      'The provided credentials are invalid. Please check your email and password and try again.',
  };

  type LoginResponse = {
    user: UserCredential;
    error?: string;
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.post<LoginResponse>('/api/firebaseLogin', {
        email: values.email,
        password: values.password,
      });

      if (response.data.user) {
        router.push('/');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const firebaseErrorCode = error.response.data.error;

        const errorMessage =
          firebaseErrorMessages[firebaseErrorCode] ||
          'Login failed. Please try again.';
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
        icon={<LockOpenIcon fontSize="large" />}
        title="Login"
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={{ email: '', password: '' }}
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

export default UserLogin;
