import type { Metadata } from 'next';

import './styles/reset.css';

export const metadata: Metadata = {
  title: 'E-commerce App',
  description: 'E-commerce App built with next 14 and material ui',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
