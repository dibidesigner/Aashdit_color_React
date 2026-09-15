import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  autoFocus?: boolean;
  id?: string;
}

const sizeStyles = {
  sm: { container: 'h-9 text-sm', icon: 14, padding: 'pl-8 pr-8' },
  md: { container: 'h-11 text-sm', icon: 16, padding: 'pl-10 pr-10' },
  lg: { container: 'h-14 text-base', icon: 20, padding: 'pl-12 pr-12' },
};

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search...',
  size = 'md',
  className = '',
  autoFocus = false,
  id,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const styles = sizeStyles[size];

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(value);
    }
    if (e.key === 'Escape') {
      onChange('');
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
        aria-hidden="true"
      >
        <Search size={styles.icon} />
      </div>

      <input
        ref={inputRef}
        id={id}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`
          w-full ${styles.container} ${styles.padding}
          bg-[#0B1626] border border-[#20344A] rounded-xl
          text-[#F4F7FB] placeholder-[#64748B]
          focus:outline-none focus:border-[#1683FF] focus:shadow-[0_0_10px_rgba(22,131,255,0.25)]
          transition-all duration-200
        `}
        aria-label={placeholder}
      />

      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#F4F7FB] transition-colors p-0.5 rounded"
          aria-label="Clear search"
        >
          <X size={styles.icon - 2} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
