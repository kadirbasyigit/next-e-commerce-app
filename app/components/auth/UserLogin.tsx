'use client';

import * as Yup from 'yup';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AuthForm from './AuthForm';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/app/firebase/auth';

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
  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const user = await loginUser(values.email, values.password);
      console.log('Success', user?.uid);
      router.push('/');
    } catch (error) {
      console.error('Fail', error);
    }
  };

  return (
    <AuthForm
      icon={<LockOpenIcon fontSize="large" />}
      title="Login"
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={{ email: '', password: '' }}
    />
  );
};

export default UserLogin;
