'use client';

import * as Yup from 'yup';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { UserCredential } from 'firebase/auth';
import { setUser } from '@/app/store/userSlice';
import { useAppDispatch } from '@/app/store/store';
import { db } from '@/app/lib/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { Formik, Form, Field } from 'formik';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
});

const UserLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
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

  const dispatch = useAppDispatch();

  type LoginResponse = {
    user: UserCredential['user'];
    error?: string;
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      const response = await axios.post<LoginResponse>('/api/firebaseLogin', {
        email: values.email,
        password: values.password,
      });

      if (response.data.user) {
        const { email, uid } = response.data.user;
        dispatch(setUser({ email, userId: uid }));
        await setDoc(doc(db, 'customers', uid), {
          email: email,
        });
        router.push('/');
      }
    } catch (error) {
      setLoading(false);
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
      <Container
        maxWidth="xs"
        sx={{
          height: '100vh',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Box p={3} boxShadow={3} borderRadius={3}>
          <Typography variant="h5" align="center" gutterBottom>
            <LockOpenIcon fontSize="large" />
          </Typography>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  fullWidth
                  label="E-mail"
                  name="email"
                  variant="outlined"
                  margin="normal"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Login'}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>

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
