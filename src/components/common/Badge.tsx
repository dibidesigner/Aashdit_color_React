import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'teal';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: 'bg-[#13253A] text-[#94A3B8] border border-[#20344A]',
  success: 'bg-[rgba(16,185,129,0.12)] text-[#10B981] border border-[rgba(16,185,129,0.25)]',
  warning: 'bg-[rgba(245,158,11,0.12)] text-[#F59E0B] border border-[rgba(245,158,11,0.25)]',
  error: 'bg-[rgba(239,68,68,0.12)] text-[#EF4444] border border-[rgba(239,68,68,0.25)]',
  info: 'bg-[rgba(22,131,255,0.12)] text-[#1683FF] border border-[rgba(22,131,255,0.25)]',
  purple: 'bg-[rgba(139,92,246,0.12)] text-[#8B5CF6] border border-[rgba(139,92,246,0.25)]',
  teal: 'bg-[rgba(18,184,196,0.12)] text-[#12B8C4] border border-[rgba(18,184,196,0.25)]',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-2 py-0.5 text-xs rounded-md',
  md: 'px-2.5 py-1 text-xs rounded-lg',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  return (
    <span className={`inline-flex items-center font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
