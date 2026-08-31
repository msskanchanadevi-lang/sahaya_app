import React from 'react';

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'amber' | 'subtle';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  variant = 'primary',
  size = 'lg',
  children,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 cursor-pointer select-none border text-center active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-4 focus-visible:outline-[#2D5A5A] focus-visible:outline-offset-2';

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm min-h-[40px] gap-2',
    md: 'px-5 py-2.5 text-base min-h-[48px] gap-2.5',
    lg: 'px-7 py-3.5 text-lg min-h-[54px] gap-3 font-semibold shadow-xs',
    xl: 'px-9 py-4.5 text-xl min-h-[64px] gap-3.5 font-bold shadow-sm',
  };

  const variantStyles = {
    primary: 'bg-[#2D5A5A] hover:bg-[#234848] text-white border-[#234848] shadow-sm hover:shadow',
    secondary: 'bg-[#F2F1EC] hover:bg-[#E5E1D8] text-[#1A1A1A] border-[#D8D2C6]',
    outline: 'bg-white hover:bg-[#2D5A5A]/5 text-[#2D5A5A] border-2 border-[#2D5A5A]',
    amber: 'bg-[#E89D71] hover:bg-[#D8885C] text-[#2C1810] font-bold border-[#C97B50] shadow-sm',
    subtle: 'bg-white hover:bg-[#F2F1EC] text-[#1A1A1A] border-[#E5E1D8]',
  };

  return (
    <button
      id={id || `acc-btn-${Math.random().toString(36).substring(2, 9)}`}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0 text-current">{icon}</span>}
      <span className="truncate">{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0 text-current">{icon}</span>}
    </button>
  );
};
