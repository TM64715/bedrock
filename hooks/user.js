import useSWR from 'swr';
import fetcher from '../lib/fetcher';

export function useCurrentUser() {
  const { data, mutate } = useSWR('/api/user/me', fetcher);
  const user = data?.result;
  return [user, { mutate }];
}

export function useUser(id) {
  const { data } = useSWR(`/api/users/${id}`, fetcher, { revalidateOnFocus: false });
  return data?.user;
}
