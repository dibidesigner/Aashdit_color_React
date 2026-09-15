import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  primary: 'bg-[#1683FF] hover:bg-[#0F6EE0] text-white border-transparent shadow-sm',
  secondary: 'bg-[#13253A] hover:bg-[#1A2F48] text-[#F4F7FB] border-[#20344A] hover:border-[#2D4A68]',
  outline: 'bg-transparent hover:bg-[#101F31] text-[#1683FF] border-[#1683FF] hover:border-[#0F6EE0]',
  ghost: 'bg-transparent hover:bg-[#101F31] text-[#94A3B8] hover:text-[#F4F7FB] border-transparent',
  destructive: 'bg-[#EF4444] hover:bg-[#DC2626] text-white border-transparent',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5 rounded-md',
  md: 'px-4 py-2 text-sm gap-2 rounded-lg',
  lg: 'px-6 py-3 text-base gap-2.5 rounded-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium border
        transition-all duration-200 cursor-pointer select-none
        focus-visible:outline-2 focus-visible:outline-[#1683FF] focus-visible:outline-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-[0.98]
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
};

export default Button;
