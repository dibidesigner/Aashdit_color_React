import React, { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  value: string;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
  onCopy?: () => void;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  value,
  label,
  size = 'md',
  className = '',
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [value, onCopy]);

  const sizeClasses = size === 'sm'
    ? 'px-2 py-1 text-xs gap-1 rounded-md'
    : 'px-2.5 py-1.5 text-xs gap-1.5 rounded-lg';

  return (
    <button
      onClick={handleCopy}
      className={`
        inline-flex items-center font-medium transition-all duration-200
        ${copied
          ? 'bg-[rgba(16,185,129,0.15)] text-[#10B981] border border-[rgba(16,185,129,0.3)]'
          : 'bg-[#13253A] hover:bg-[#1A2F48] text-[#94A3B8] hover:text-[#F4F7FB] border border-[#20344A] hover:border-[#2D4A68]'
        }
        ${sizeClasses}
        ${className}
        focus-visible:outline-2 focus-visible:outline-[#1683FF] focus-visible:outline-offset-2
      `}
      title={`Copy ${label || value}`}
      aria-label={copied ? 'Copied!' : `Copy ${label || value}`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {label && <span>{copied ? 'Copied!' : label}</span>}
    </button>
  );
};

export default CopyButton;
