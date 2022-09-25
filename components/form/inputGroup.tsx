import React from 'react';
import Input, { InputProps } from './input';

interface InputGroupProps extends InputProps {
  label: string;
  id: string;
}
export default function InputGroup({
  id, label, onChange, type, placeholder, passRef, value, autoComplete, maxLength, minLength,
}: InputGroupProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={id} className="font-medium text-white">{label}</label>
      <Input
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        passRef={passRef}
        value={value}
        id={id}
        autoComplete={autoComplete}
        maxLength={maxLength}
        minLength={minLength}
      />
    </div>
  );
}
