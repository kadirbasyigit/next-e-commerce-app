import { Metadata } from 'next';
import ClientLayout from './clientLayout';

export const metadata: Metadata = {
  title: 'E-commerce App',
  description: 'E-commerce App built with Next.js 14 and Material-UI',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <ClientLayout>{children}</ClientLayout>;
};

export default Layout;
