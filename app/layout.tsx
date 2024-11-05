import CssBaseline from '@mui/material/CssBaseline';
import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import ReduxProvider from './providers/ReduxProvider';
import PersistProvider from './providers/PersistProvider';
import StripeProvider from './providers/StripeProvider';

export const metadata: Metadata = {
  title: 'E-commerce App',
  description: 'E-commerce App built with next 14 and material ui',
};

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReduxProvider>
          <PersistProvider>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <StripeProvider>{children}</StripeProvider>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </PersistProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
