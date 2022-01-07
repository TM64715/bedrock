import React from 'react';

export interface TxtAreaProps {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  passRef?: React.Ref<HTMLTextAreaElement>;
  id?: string;
}
export default function TxtArea({
  value, onChange, placeholder, passRef, id,
}: TxtAreaProps) {
  return (
    <textarea
      className="inline-block w-64 py-5 text-gray-900 placeholder-gray-700 rounded-md md:text-lg md:w-80 md:h-14 focus:outline-none h-36 ring-1 dark:ring-2 dark:ring-blue-500 ring-gray-800 px-7"
      value={value || undefined}
      onChange={onChange}
      placeholder={placeholder}
      ref={passRef}
      id={id}
      name={id}
      rows={10}
    />
  );
}
