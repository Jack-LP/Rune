import React from "react";
import SoundMixer from "./soundMixer/SoundMixer";
import SoundScapes from "./soundScapes/SoundScapes";

const MainSection = () => {
  return (
    <>
      <div className="grid w-full grid-cols-2 grid-rows-2 gap-8 rounded-md">
        <SoundMixer />
        <SoundScapes />
        <div className="w-full rounded-md border-1 border-white/25">vis</div>
      </div>
    </>
  );
};

export default MainSection;
