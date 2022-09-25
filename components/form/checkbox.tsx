import React from 'react';

interface CheckBoxProps {
  checked?: boolean;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  passRef?: React.Ref<HTMLInputElement>;
}
export default function Checkbox({
  checked, label, onChange, id, passRef,
}: CheckBoxProps) {
  return (

    <div className="flex justify-start w-full">
      <input
        className="flex-grow-0 w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-sm appearance-none cursor-pointer form-check-input checked:bg-blue-600 checked:border-blue-600 focus:outline-none"
        type="checkbox"
        value=""
        checked={checked}
        onChange={onChange}
        id={id}
        ref={passRef}
      />
      <label className="text-sm text-left text-black md:text-base form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
