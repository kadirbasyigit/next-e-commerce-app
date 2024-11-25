import NextLink from 'next/link';
import { ReactNode } from 'react';
import { LinkProps as NextLinkProps } from 'next/dist/client/link';

type LinkProps = NextLinkProps & {
  children: ReactNode;
  href: string;
  passHref?: boolean;
};

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
