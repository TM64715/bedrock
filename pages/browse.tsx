import React from 'react';
import Select from 'react-select';
import colors from 'tailwindcss/colors';
import { useCurrentUser } from '@/hooks/user';

const tags = [
  { value: 'ap', label: 'AP', cat: 'level' },
  { value: 'hs', label: 'High School', cat: 'level' },
  { value: 'honors', label: 'Honors', cat: 'level' },
  { value: 'science', label: 'Science', cat: 'class' },
  { value: 'math', label: 'Math', cat: 'class' },
  { value: 'english', label: 'English', cat: 'class' },
];
const timeTags = [
  { value: 15, label: '15min', cat: 'time' },
  { value: 30, label: '30min', cat: 'time' },
  { value: 60, label: '1hr', cat: 'time' },
];
export default function Browse() {
  const [user] = useCurrentUser();
  return (
    <div className="min-h-screen text-white bg-blue-600 dark:bg-gray-900 ">
      <nav className="flex justify-end py-8 px-7">
        <p className="text-sm font-medium justify-self-end">{user?.name}</p>
      </nav>
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-medium">Find a Friend</h1>
        <p className="text-sm font-medium md:text-base">Tell us what you need for this session</p>
      </div>
      <main>
        <div className="flex w-56 ">
          <Select
            options={timeTags}
            styles={{
              control: (provided) => ({
                ...provided,
                width: 'max-content',
                minWidth: '100%', 
              }),
              singleValue: (provided) => ({
                ...provided,
                backgroundColor: colors.orange[500],
                width: 'max-content',
                display: 'flex',
                border: '1px solid black',
                flexWrap: 'nowrap',
                fontWeight: 500,
                borderRadius: 1000,
                padding: '5px 10px',
                minWidth: '100%',
              }),
              option: (provided) => ({
                ...provided,
                backgroundColor: colors.orange[500],
                width: 'max-content',
                display: 'flex',
                flexWrap: 'nowrap',
                fontWeight: 500,
                borderRadius: 1000,
                padding: '5px 10px',
              }),
              menuList: (provided) => ({
                ...provided,
                width: 'max-content',
                minWidth: '100%',
              }),
              menuPortal: (provided) => ({
                ...provided,
                width: 'max-content',
                minWidth: '100%',
              }),
            }}
            placeholder="Time"
          />
          <Select options={timeTags} />
        </div>
      </main>
    </div>
  );
}
