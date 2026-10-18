import { ButtonHTMLAttributes, ReactNode } from 'react';
import { colors } from '@/src/theme';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-roboto-condensed font-medium uppercase tracking-[0.22em] rounded-lg transition-colors duration-200';

  const variantStyles = {
    primary: 'bg-[#02368C] text-white hover:opacity-90',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border-2 border-[#02368C] text-[#02368C] hover:bg-[#02368C] hover:text-white',
  };

  const sizeStyles = {
    sm: 'h-10 px-4 text-[11px]',
    md: 'h-[51px] px-6 text-[12.8px]',
    lg: 'h-14 px-8 text-[14px]',
  };

  const widthStyles = fullWidth ? 'w-full' : 'w-auto';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
