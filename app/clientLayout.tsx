'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import ReduxProvider from './providers/ReduxProvider';
import PersistProvider from './providers/PersistProvider';
import StripeProvider from './providers/StripeProvider';
import Header from './components/ui/Header';
import { usePathname } from 'next/navigation';

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLoginOrRegisterPage =
    pathname === '/login' || pathname === '/register';
  return (
    <html lang="en">
      <body suppressHydrationWarning className={poppins.className}>
        <ReduxProvider>
          <PersistProvider>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <StripeProvider>
                  {!isLoginOrRegisterPage && <Header />}
                  <main>{children}</main>
                </StripeProvider>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </PersistProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default ClientLayout;
