import React, { FormEvent, useState } from 'react';
import Link from '@/components/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import Input from '@/components/input';
import Button from '@/components/button';

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('../../api/auth/register', { name, email, password });

      if (data.result) {
        router.push('/profile');
      } else setError(data.error);
    } catch (err) {
      // Make sure that your env file is set up correctly
      setError('Username or password invalid');
    }
  };
  return (
    <div className="flex justify-center h-screen bg-blue-600 dark:bg-gray-800" onSubmit={handleSubmit}>
      <form className="flex flex-col items-center px-12 space-y-7">
        <h1 className="text-4xl font-medium text-center text-white pt-36 ">Sign Up</h1>
        {!!error && (
        <div className="px-3 py-2 bg-pink-600 rounded-xl">
          <p className="font-medium text-gray-50">{error}</p>
        </div>
        )}
        <Input placeholder="Display Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">Register</Button>
        <p className="text-sm text-white md:text-base">
          Already have an account?
          {' '}
          <Link href="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
}
