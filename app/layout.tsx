import CssBaseline from '@mui/material/CssBaseline';
import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import ReduxProvider from './store/reduxProvider';

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
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
