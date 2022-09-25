import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import Input from '../components/form/input';
import Button from '../components/button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('../../api/auth/login', { email, password });

      if (data.result) {
        router.push('/join');
      } else setError(data.error);
    } catch (err) {
      // Make sure that your env file is set up correctly
      setError('Username or password invalid');
    }
  };
  return (
    <div className="flex justify-center h-screen bg-blue-600 dark:bg-gray-900" onSubmit={handleSubmit}>
      <form className="flex flex-col items-center px-12 space-y-7">
        <h1 className="text-4xl font-medium text-center text-white pt-36 ">Login</h1>
        {!!error && (
        <div className="px-3 py-2 bg-pink-600 rounded-xl">
          <p className="font-medium text-gray-50">{error}</p>
        </div>
        )}
        <Input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">Login</Button>
        <p className="text-sm text-white md:text-base">
          Don&apos;t have an account?
          {' '}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link href="/signup" passHref><a className="py-1 border-b-2 border-white">Sign Up</a></Link>
        </p>
      </form>
    </div>
  );
}
