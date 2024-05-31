import React from "react";
import SoundItem from "./SoundItem";

const SoundMixer = () => {
  return (
    <div className="row-span-2 flex w-full flex-col gap-8 rounded-md border-1 border-white/25 p-8">
      <SoundItem />
      <SoundItem />
      <SoundItem />
      <SoundItem />
      <SoundItem />
      <SoundItem />
      <SoundItem />
      <SoundItem />
    </div>
  );
};

export default SoundMixer;
