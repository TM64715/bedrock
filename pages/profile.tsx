import React, {
  FormEvent, useEffect, useRef, useState,
} from 'react';
import Image from 'next/image';
import axios from 'axios';
import Link from '@/components/link';
import InputGroup from '@/components/form/inputGroup';
import TxtAreaGroup from '../components/textareaGroup';
import Button from '../components/button';
import { useCurrentUser } from '../hooks/index';

export default function Profile() {
  const gradeRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const profilePicRef = useRef<HTMLInputElement>(null);
  const [profilePicURL, setPFPURL] = useState('https://res.cloudinary.com/dgijizuic/image/upload/v1629049373/dog_cxmmus.jpg');
  const [user, { mutate }] = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const grade = gradeRef.current.value;
    const bio = bioRef.current.value;
    const profilePic = profilePicRef.current.files[0];
    const formData = new FormData();
    formData.append('grade', grade);
    formData.append('bio', bio);
    if (profilePic) formData.append('profilePicture', profilePic);
    await axios.patch('/api/user/profile', formData);
    mutate({ grade, bio });
    setIsLoading(false);
  };
  useEffect(() => {
    console.log(user);
    if (user) {
      gradeRef.current.value = user.grade;
      bioRef.current.value = user.bio;
      if (user.image?.url) setPFPURL(user.image.url);
    } else {
      setPFPURL('https://res.cloudinary.com/dgijizuic/image/upload/v1629049373/dog_cxmmus.jpg');
    }
  }, [user]);
  return (
    <form className="flex flex-col items-center h-full min-h-screen pt-12 bg-blue-500 dark:bg-gray-900" onSubmit={handleSubmit}>
      <h1 className="pb-10 font-medium text-white">Set up your public profile</h1>
      <div className="flex items-center justify-center w-40 h-40 border border-black rounded-full border-1">
        <Image src={profilePicURL} layout="intrinsic" className="rounded-full" width={160} height={160} />
      </div>
      <div className="flex flex-col items-center space-y-6">
        <label className="relative mx-auto mt-6 text-center text-white left-10" htmlFor="profile-picture">
          <input type="file" id="profile-picture" ref={profilePicRef} />
        </label>
        <InputGroup id="grade" label="Grade" maxLength={2} onChange={(e) => { gradeRef.current = { ...gradeRef.current, value: e.target.value }; }} type="number" autoComplete="off" placeholder="" passRef={gradeRef} />
        <TxtAreaGroup id="bio" label="Bio" onChange={(e) => { bioRef.current = { ...bioRef.current, value: e.target.value }; }} placeholder="Hi, I’m ... and I love to..." passRef={bioRef} />
        <Button type="submit" disabled={isLoading}>Save</Button>
        <Link href="/join">Next Page</Link>
      </div>
    </form>
  );
}
