import React, { useRef } from 'react';
import Image from 'next/image';
import Input from '@/components/form/input';
import Checkbox from '@/components/form/checkbox';
import Button from '@/components/button';
import axios from 'axios';
import Pusher from 'pusher-js';
import { useRouter } from 'next/router';

import { all } from '../middleware';

let pusher;
if (typeof window !== 'undefined') {
  if (process.env.NODE_ENV !== 'production') {
    // Enable pusher logging - isn't included in production
    Pusher.logToConsole = true;
  }

  pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    authEndpoint: '/api/pusher/auth',
  });
}

const joinChannel = (channel, userId, callback) => {
  if (pusher) {
    try {
      const sub = pusher.subscribe(`private-${channel}`);
      sub.bind(`match-${userId}`, callback);
    } catch (e) {
      // console.log('error', e);
      joinChannel(channel, userId, callback);
    }
  }
};

export default function Join({ user }) {
  const router = useRouter();
  const subject = useRef<HTMLInputElement>(null);
  const cName = useRef<HTMLInputElement>(null);
  const level = useRef<HTMLInputElement>(null);
  const concepts = useRef<HTMLInputElement>(null);
  const verbal = useRef<HTMLInputElement>(null);
  const writing = useRef<HTMLInputElement>(null);
  const accountability = useRef<HTMLInputElement>(null);
  const other = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const subjectV = subject.current.value;
    const courseV = cName.current.value;
    const levelV = level.current.value;

    // named [ref]Value to avoid conflict with the ref variable
    const verbalV = verbal.current.checked;
    const otherV = other.current.checked;
    const accountabilityV = accountability.current.checked;
    const writingV = writing.current.checked;
    const goals = {
      verbal: verbalV, accountability: accountabilityV, writing: writingV, other: otherV,
    };
    try {
      await axios.post('../api/match', {
        subject: subjectV,
        course: courseV,
        level: levelV,
        goals,
      });
    } catch (reqError) {
      // console.error(reqError);
    }
  };

  React.useEffect(() => {
    joinChannel('match', user.id, (data) => router.push(`../room/${data._id}`));
  }, []);
  return (
    <div className="h-full p-2 text-white bg-blue-600 dark:bg-gray-900 ">
      <nav className="flex justify-end py-8 px-7">
        <div className="flex flex-row space-x-4">
          {user?.image && <Image src={user?.image.url} layout="fixed" width={20} height={20} className="rounded-full" />}
          <p className="text-sm font-medium justify-self-end">{user?.name}</p>
        </div>
      </nav>
      <form onSubmit={(e) => e.preventDefault()} className="w-4/5 mx-auto mb-10 space-y-5 text-base text-center text-black bg-white md:w-3/5 p-7 md:p-10 lg:p-14 rounded-xl">
        <h1 className="text-lg font-medium md:text-xl lg:text-2xl">Find a Friend</h1>
        <div className="flex flex-col space-y-8 lg:space-y-12">
          <div className="flex justify-center">
            <Input type="text" id="subject" placeholder="Subject" passRef={subject} />
          </div>
          <div className="flex justify-center">
            <Input type="text" id="class_name" placeholder="Class Name" passRef={cName} />
          </div>
          <div className="flex justify-center">
            <Input type="text" id="location" placeholder="Level" passRef={level} />
          </div>
          <div className="block mx-auto">
            <div className="flex flex-col space-y-3 md:space-y-5">
              <Checkbox label="Get help with concepts" id="concepts" passRef={concepts} />
              <Checkbox label="Get quizzed/Study Verbally" id="concepts" passRef={verbal} />
              <Checkbox label="Go over writing" id="writing" passRef={writing} />
              <Checkbox label="Create accountability for myself" id="accountability" passRef={accountability} />
              <Checkbox label="Other" id="other" passRef={other} />
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="submit" variant="primary" onClick={handleSubmit}>Go</Button>
          </div>
        </div>
      </form>
      <main />
    </div>

  );
}

export async function getServerSideProps(context) {
  await all.run(context.req, context.res);
  if (!context.req.isAuthenticated()) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  // eslint-disable-next-line prefer-const
  let { name, _id } = context.req.user;
  return {
    props: {
      user: { name, id: _id.toString() },
    }, // will be passed to the page component as props
  };
}
