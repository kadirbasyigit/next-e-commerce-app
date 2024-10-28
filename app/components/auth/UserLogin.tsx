'use client';

import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase/auth';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
});

const UserLogin: React.FC = () => {
  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log('Success');
    } catch (error) {
      console.error('Fail', error);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ height: '100vh', display: 'grid', placeItems: 'center' }}
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
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default UserLogin;
