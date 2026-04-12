import { ReactNode } from 'react';

type ButtonProps = {
  labelBtn: string;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'danger' | 'ghost';
  fullWidth?: boolean;
  className?: string;
};

export default function ButtonSecondary({
  labelBtn,
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  fullWidth = false,
  className = '',
}: ButtonProps) {
  const baseClass =
    'flex items-center justify-center gap-2 rounded-xl transition-all duration-200';

  const variants = {
    primary:
      'bg-indigo-600 text-white font-semibold text-sm py-3.5 shadow-md shadow-indigo-200 hover:shadow-indigo-300 active:scale-[0.98]',
    danger: 'text-gray-400 hover:text-red-500 text-xs font-medium px-3 py-1.5',
    ghost: 'text-gray-500 hover:text-gray-700 text-xs px-3 py-1.5',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClass}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'}
        ${className}
      `}>
      {children}
      <span>{labelBtn}</span>
    </button>
  );
}
