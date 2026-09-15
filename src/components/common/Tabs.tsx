import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab: controlledActive,
  onChange,
  variant = 'default',
  className = '',
}) => {
  const [internalActive, setInternalActive] = useState(tabs[0]?.id || '');
  const active = controlledActive ?? internalActive;

  const handleChange = (id: string) => {
    if (!controlledActive) setInternalActive(id);
    onChange?.(id);
  };

  const containerStyles = {
    default: 'bg-[#0B1626] border border-[#20344A] rounded-xl p-1 gap-1',
    pills: 'gap-2',
    underline: 'border-b border-[#20344A] gap-0',
  };

  const tabStyles = {
    default: (isActive: boolean) => isActive
      ? 'bg-[#101F31] text-[#F4F7FB] border border-[#20344A] shadow-sm'
      : 'text-[#64748B] hover:text-[#94A3B8] hover:bg-[#101F31]/50 border border-transparent',
    pills: (isActive: boolean) => isActive
      ? 'bg-[#1683FF] text-white border border-transparent'
      : 'text-[#64748B] hover:text-[#94A3B8] bg-[#0B1626] hover:bg-[#101F31] border border-[#20344A] hover:border-[#2D4A68]',
    underline: (isActive: boolean) => isActive
      ? 'text-[#1683FF] border-b-2 border-[#1683FF] -mb-px'
      : 'text-[#64748B] hover:text-[#94A3B8] border-b-2 border-transparent',
  };

  return (
    <div className={`flex items-center ${containerStyles[variant]} ${className}`} role="tablist">
      {tabs.map(tab => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => handleChange(tab.id)}
          className={`
            flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg
            transition-all duration-200 whitespace-nowrap
            focus-visible:outline-2 focus-visible:outline-[#1683FF] focus-visible:outline-offset-2
            ${tabStyles[variant](active === tab.id)}
          `}
        >
          {tab.icon}
          {tab.label}
          {tab.badge !== undefined && (
            <span className="bg-[#20344A] text-[#94A3B8] text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
