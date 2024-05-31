import React from "react";
import SoundMixer from "./soundMixer/SoundMixer";
import SoundScapes from "./soundScapes/SoundScapes";

const MainSection = () => {
  return (
    <>
      <div className="grid w-full grid-cols-2 grid-rows-2 gap-8 rounded-md bg-white/5">
        <SoundMixer />
        <SoundScapes />
        <div className="w-full rounded-md border-8 border-black">vis</div>
      </div>
    </>
  );
};

export default MainSection;
