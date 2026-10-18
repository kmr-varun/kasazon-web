import Link from 'next/link';
import { ReactNode } from 'react';
import { colors } from '@/src/theme';

export interface NavLinkProps {
  href: string;
  children: ReactNode;
  active?: boolean;
  className?: string;
}

export function NavLink({ href, children, active = false, className = '' }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`
        font-poppins
        text-sm
        transition-colors
        duration-200
        hover:opacity-70
        ${active ? 'font-medium' : 'font-normal'}
        ${className}
      `}
      style={{ color: colors.text.primary }}
    >
      {children}
    </Link>
  );
}
