import React from 'react';
import NextLink from 'next/link';

interface LinkProps {
  children: React.ReactNode;
  href: string;
}
export default function Link({ children, href }:LinkProps):JSX.Element {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <NextLink href={href}><a className="py-1 border-b-2 border-white text-gray-50 md:text-base">{children}</a></NextLink>
  );
}
