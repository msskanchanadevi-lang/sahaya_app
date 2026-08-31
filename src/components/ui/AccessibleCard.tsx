import React from 'react';

interface AccessibleCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  highlight?: boolean;
  id?: string;
  role?: string;
  tabIndex?: number;
  'aria-label'?: string;
}

export const AccessibleCard: React.FC<AccessibleCardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = false,
  highlight = false,
  id,
  role,
  tabIndex,
  'aria-label': ariaLabel,
}) => {
  const isClickable = Boolean(onClick);

  return (
    <div
      id={id}
      role={role || (isClickable ? 'button' : undefined)}
      tabIndex={tabIndex ?? (isClickable ? 0 : undefined)}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`bg-white rounded-2xl border ${
        highlight
          ? 'border-[#2D5A5A] shadow-md ring-2 ring-[#2D5A5A]/20'
          : 'border-[#E5E1D8] shadow-xs'
      } ${
        isClickable || hoverEffect
          ? 'cursor-pointer hover:border-[#2D5A5A]/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-4 focus-visible:outline-[#2D5A5A]'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
