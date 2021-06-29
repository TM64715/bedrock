import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import Auth from '../../components/auth';
import { useUser } from '../../components/user-context';

function SignUp() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const { setUser } = useUser();
  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('../../api/auth/register', { name, email, password });
    if (data.result) {
      setUser(data.result);
      router.push('../../dashboard');
    } else setError(data.error);
  };
  return (
    <Auth
      register
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
      error={error}
    />
  );
}

export default SignUp;
