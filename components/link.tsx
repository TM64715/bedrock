import React from 'react';
import {default as NextLink} from 'next/link';
interface LinkProps {
  children: React.ReactNode;
  href: string;
}
export default function Link({children, href}:LinkProps):JSX.Element {
  return (
    <NextLink href={href}><a className="py-1 border-b-2 border-white text-gray-50 md:text-base">{children}</a></NextLink>
  )
};