import NextLink from 'next/link';
import { ReactNode } from 'react';

interface LinkProps {
  children: ReactNode;
  href: string;
  passHref?: boolean;
  [key: string]: any;
}

const Link = ({ children, href, passHref = false, ...props }: LinkProps) => {
  return (
    <NextLink
      href={href}
      passHref={passHref}
      style={{ textDecoration: 'none', color: 'inherit' }}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;
