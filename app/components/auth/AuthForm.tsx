'use client';

import React from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

interface AuthFormProps {
  initialValues: { email: string; password: string; confirmPassword?: string };
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: (values: any) => Promise<void>;
  title: string;
  icon: React.ReactNode;
  isRegister?: boolean;
  loading: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
  title,
  icon,
  isRegister = false,
  loading,
}) => {
  return (
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
          {icon}
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
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
              {isRegister && (
                <Field
                  as={TextField}
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : title}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default AuthForm;
