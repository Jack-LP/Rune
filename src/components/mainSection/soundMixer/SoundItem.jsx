import React from "react";

const SoundItem = () => {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <p>1</p>
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-md border-1"></div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold">Rain</p>
            <button className="font-GeistMono text-xs text-white/50">
              0.26
            </button>
          </div>
          <input type="range" />
        </div>
      </div>
      <input type="radio" />
      <div className="flex items-center gap-2">
        <p>L</p>
        <input type="range" />
        <p>R</p>
      </div>
      <div className="h-full w-[180px] rounded-md border-1"></div>
    </div>
  );
};

export default SoundItem;
