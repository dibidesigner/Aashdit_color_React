import React from 'react';
import { Search } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  suggestions?: string[];
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  suggestions,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-[#101F31] border border-[#20344A] flex items-center justify-center mb-5 text-[#1683FF]">
        {icon || <Search size={28} />}
      </div>

      <h3 className="text-[#F4F7FB] font-semibold text-lg mb-2">{title}</h3>

      {description && (
        <p className="text-[#64748B] text-sm max-w-sm leading-relaxed mb-6">{description}</p>
      )}

      {suggestions && suggestions.length > 0 && (
        <div className="mb-6">
          <p className="text-[#64748B] text-xs mb-3 font-medium uppercase tracking-wide">Try searching for</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map(s => (
              <span key={s} className="px-3 py-1.5 bg-[#101F31] border border-[#20344A] text-[#94A3B8] text-sm rounded-lg">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {action}
    </div>
  );
};

export default EmptyState;
