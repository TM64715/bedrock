/* eslint-disable no-unused-vars */
import * as React from 'react';
import Image from 'next/image';
import floating from '../public/floating.png';
import rocket from '../public/rocket.svg';
import hiker from '../public/hiker.svg';
import robot from '../public/robot.svg';

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
export default Landing;
