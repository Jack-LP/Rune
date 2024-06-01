import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import SoundScapeCard from "./SoundscapeCard";

const SoundScapes = () => {
  const { presets, savedSoundscapes } = useContext(AppContext);

  return (
    <div className="hide-scrollbar flex w-full flex-col gap-4 overflow-y-scroll rounded-md border-1 border-white/25 p-8">
      <h1 className="text-lg font-semibold">SoundScapes</h1>
      <div className="flex flex-col gap-2">
        <p className="text-white/50">Presets</p>
        <div className="flex gap-2">
          {presets.map((preset) => (
            <button key={preset.id} className="h-14 w-14 rounded-md border-1">
              {preset.id}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-white/50">Your library</p>
        <div className="flex flex-col gap-2">
          {savedSoundscapes.map((soundScape) => (
            <SoundScapeCard key={soundScape.id} soundScape={soundScape} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SoundScapes;
