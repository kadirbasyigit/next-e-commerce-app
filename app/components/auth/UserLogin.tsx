'use client';

import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase/auth';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AuthForm from './AuthForm';
import { useRouter } from 'next/navigation';

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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log('Success');
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