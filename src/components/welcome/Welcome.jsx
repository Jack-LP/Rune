import React from "react";
import WelcomeCard from "./WelcomeCard";

const Welcome = () => {
  return (
    <div className="hide-scrollbar flex h-screen items-center justify-center overflow-y-scroll font-Geist text-white">
      <img
        src="assets/img/green.jpg"
        alt=""
        className="fixed -z-10 scale-110"
      />
      <div className='absolute inset-0 -z-10 bg-[url("/assets/img/bg-noise.png")] opacity-10'></div>
      <WelcomeCard />
    </div>
  );
};

export default Welcome;
