import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import community from '../public/community.png';

function LandingPage() {
  return (
    <>
      <div
        className="fixed overflow-hidden top-[0vh] z-[-1] max-h-[100vh] w-[100vw]"
        style={{
        }}
      >
        <div
          className="relative h-[200vh] w-[200vh] bg-indigo-500 rounded-[200vh] top-[-50vh] right-[-60vh] z-[-100]"
        />
      </div>
      <div className="mt-[2vh] w-full flex justify-between text-lg items-center">
        <div className="flex w-1/2 pl-5 align-middle md:w-1/5 justify-evenly justify-self-start">
          <p className="font-semibold">Bedrock</p>
          <p className="link"><Link href="/about">About</Link></p>
        </div>
        <div className="flex items-center self-end w-1/2 pr-5 md:w-1/6 justify-evenly">
          <p className="text-white link"><Link href="/auth/login">Log In</Link></p>
          <button className="btn btn-outline " type="button"><Link href="/auth/signup">Sign Up</Link></button>
        </div>
      </div>
      <div className="grid grid-flow-row grid-cols-2">
        <div className="flex flex-row items-center pl-10">
          <div>
            <p className="self-center text-5xl font-semibold">Bedrock</p>
            <p className="self-center">This is a nice long subtitle.  i have lots to say</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-full h-[500px] relative">
            <Image src={community} layout="fill" objectFit="scale-down" alt="" quality={100} placeholder="blur" />
          </div>
          <p className="text-base font-semibold text-white ">
            Every student should have the opportunity to study with their peers
          </p>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
