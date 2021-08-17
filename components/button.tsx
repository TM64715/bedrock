import React from 'react';

interface ButtonProps {
  type: 'submit' | 'reset' | 'button';
  children: React.ReactNode;
  variant?: 'primary' | 'gray';
  disabled?: boolean;
}
export default function Button({
  type, children, variant = 'primary', disabled = false,
}: ButtonProps) {
  const variantClasses = variant === 'primary' ? 'dark:bg-blue-500 bg-black text-white rounded-xl' : 'bg-gray-200 text-black rounded-2xl';
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} disabled={disabled} className={`px-4 py-2.5 disabled:opacity-50 md:py-3 md:px-5 inline-flex justify-center items-center w-min ${variantClasses}`}>
      {children}
    </button>
  );
}
