import React from 'react';
import TxtArea, { TxtAreaProps } from './textarea';

interface InputGroupProps extends TxtAreaProps {
  label: string;
  id: string;
}
export default function TxtAreaGroup({
  id, label, onChange, placeholder, passRef, value,
}: InputGroupProps) {
  return (
    <div className="flex flex-col h-auto space-y-2">
      <label htmlFor={id} className="font-medium text-white">{label}</label>
      <TxtArea
        onChange={onChange}
        placeholder={placeholder}
        passRef={passRef}
        value={value}
        id={id}
      />
    </div>
  );
}
