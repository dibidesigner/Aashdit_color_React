import React, { useState, useRef } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className = '',
}) => {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(true), 300);
  };

  const hide = () => {
    clearTimeout(timer.current);
    setVisible(false);
  };

  const positionStyles: Record<string, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className={`relative inline-flex ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && content && (
        <div
          className={`
            absolute ${positionStyles[position]} z-[300]
            bg-[#13253A] border border-[#20344A] text-[#F4F7FB]
            text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap
            shadow-[0_4px_12px_rgba(0,0,0,0.4)]
            animate-fade-in-scale pointer-events-none
          `}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
