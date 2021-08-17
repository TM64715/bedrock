import React from 'react';

export interface InputProps {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: 'text' | 'password' | 'number';
  passRef?: React.Ref<HTMLInputElement>;
  id?: string;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
}
export default function Input({
  value, onChange, placeholder, type, passRef, id, autoComplete, maxLength, minLength,
}: InputProps) {
  return (
    <input
      className="inline-flex items-center justify-center w-64 text-gray-900 placeholder-gray-700 rounded-md appearance-none md:text-lg md:w-80 md:h-14 focus:outline-none h-11 ring-1 dark:ring-2 dark:ring-blue-500 ring-gray-800 px-7"
      value={value || undefined}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      ref={passRef}
      id={id}
      name={id}
      autoComplete={autoComplete || 'on'}
      maxLength={maxLength}
      minLength={minLength}
    />
  );
}
