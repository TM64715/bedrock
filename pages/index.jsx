import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import community from '../public/community.png';
import floating from '../public/floating.png';
import rocket from '../public/rocket.svg';
import hiker from '../public/hiker.svg';
import robot from '../public/robot.svg';

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

function Landing() {
  const [active, setActive] = React.useState();
  return (
    <>
      <div
        className="fixed top-0 w-full h-screen bg-indigo-500 -z-10 heropattern-wiggle-indigo-600"
      />
      {/* Fixed background with image using heropatterns image */}
      <div className="z-10 flex ">
        <div className="pl-10 mt-32 space-y-20">
          <h1 className="text-6xl font-bold text-white">Bedrock</h1>
          <div className="flex flex-col space-y-10 text-lg font-medium">
            <button className={`tab-control ${active === 1 ? 'tab-control-active' : ''}`} onClick={() => setActive(1)} type="button">
              Build Connections
            </button>
            <button className={`tab-control ${active === 2 ? 'tab-control-active' : ''}`} onClick={() => setActive(2)} type="button">
              Learn Collabratively
            </button>
            <button className={`tab-control ${active === 3 ? 'tab-control-active' : ''}`} onClick={() => setActive(3)} type="button">
              Increase Productivity
            </button>
          </div>

        </div>
        <Image src={rocket} layout="fill" objectFit="scale-down" alt="" quality={100} />
      </div>
    </>
  );
}
// export default (LandingPage);
export default Landing;
