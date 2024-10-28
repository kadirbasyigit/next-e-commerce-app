'use client';

import * as Yup from 'yup';
import Lock from '@mui/icons-material/Lock';
import { registerUser } from '@/app/firebase/auth';
import AuthForm from './AuthForm';

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
  const handleSubmit = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const user = await registerUser(values.email, values.password);
      console.log('Success');
    } catch (error) {
      console.log('Fail', error);
    }
  };

  return (
    <AuthForm
      isRegister
      icon={<Lock fontSize="large" />}
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      onSubmit={handleSubmit}
      title="register"
      validationSchema={validationSchema}
    />
  );
};

export default UserRegistration;
