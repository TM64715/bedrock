/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Image from 'next/image';
import BoxSelect from '../components/boxSelect';
import Input from '../components/input';
import { all } from '../middleware/index';
// import { useUser } from '../components/user-context';
import profilePic from '../public/profile-pic.png';
import AP from '../public/ap.svg';
import HS from '../public/school.svg';
import college from '../public/college.svg';

function Dashboard({ user }) {
  const [courseLevel, setCourseLevel] = React.useState('');
  const courseHandler = (e, c) => {
    e.preventDefault();
    setCourseLevel(c);
  };
  return (
    <>
      <div className="flex items-center justify-between w-full pr-16 mt-8 pl-7">
        <p className="text-lg font-semibold text-indigo-700">Bedrock</p>
        <div className="flex flex-row items-center space-x-4">
          <p>{user.name}</p>
          <div className="rounded-full">
            <Image src={profilePic} height={50} width={50} blur />
          </div>
        </div>
      </div>
      <div className="flex pl-7">
        <div className="w-full mt-10 ">
          <h1 className="text-3xl font-semibold">
            Welcome Back
            {' '}
            <p className="inline font-semibold text-indigo-500">{user.name}</p>
            !
          </h1>
          <p className="mt-8">Answer some questions to join a study session</p>
          <form className="mt-8">
            {/* TODO label */}
            <p>
              What level class are you taking? (select one)
            </p>
            <label className="flex flex-row space-x-4">
              <BoxSelect image={HS} onClick={courseHandler} focused={courseLevel === 'High School'}>High School</BoxSelect>
              <BoxSelect image={AP} onClick={courseHandler} focused={courseLevel === 'AP'}>AP</BoxSelect>
              <BoxSelect image={college} onClick={courseHandler} focused={courseLevel === 'College'}>College</BoxSelect>

            </label>
            <div className="w-11/12 mt-5 space-y-5 ">
              <Input label="What's the name of your class?" id="class" />
              <Input label="How long do you want to work for?" id="sessionLength" />
              <div>
                <label htmlFor="tags" className="">
                  Please List Some Tags
                </label>
                <div className="flex w-3/4 space-x-3">
                  <textarea id="tags" className="w-full h-20 px-4 py-2 mt-2 text-sm border border-black rounded-md focus:outline-none" placeholder="QuizMe, cram, homework, concepts, science" draggable={false} />
                  <p className="text-sm text-gray-800">
                    Think of tags as hashtags, we’ll use them to
                    find a more relevant partner for you.
                    {' '}
                    <strong className="font-bold">Seperate each tag with a comma</strong>

                  </p>
                </div>
              </div>
              <button className="block mx-auto btn btn-indigo" type="button">Join Study Hall</button>
            </div>

          </form>
        </div>
        <div className="w-1/2 bg-gray-100" />
      </div>
    </>
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
  const { email, name } = context.req.user;
  return {
    props: {
      user: { email, name },
    }, // will be passed to the page component as props
  };
}
export default Dashboard;
