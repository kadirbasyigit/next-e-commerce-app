'use client';

import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AssignmentInd from '@mui/icons-material/AssignmentInd';
import Lock from '@mui/icons-material/Lock';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords does not match')
    .required('Password validation is required'),
});

const UserRegistration: React.FC = () => {
  const handleSubmit = (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log(values);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box p={3} boxShadow={3} borderRadius={3}>
        <Typography variant="h5" align="center" gutterBottom>
          <Lock fontSize="large" />
        </Typography>
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                label="E-posta"
                name="email"
                variant="outlined"
                margin="normal"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                fullWidth
                label="Şifre"
                name="password"
                type="password"
                variant="outlined"
                margin="normal"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Field
                as={TextField}
                fullWidth
                label="Şifre Doğrulama"
                name="confirmPassword"
                type="password"
                variant="outlined"
                margin="normal"
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default UserRegistration;
