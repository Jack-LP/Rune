import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import SoundScapeCard from "./SoundscapeCard";

const Library = () => {
  const { presets, savedSoundscapes, loadSoundScape } = useContext(AppContext);

  const handleClick = (soundScape) => {
    loadSoundScape(soundScape);
  };

  return (
    <div className="flex flex-col gap-5 rounded-md border-1 border-white/25 p-8 pt-14 backdrop-blur-lg">
      <div className="absolute left-0 top-0 flex w-full items-center gap-2 border-b-1 border-white/25 px-2 py-2 text-sm text-white/50">
        <div className="border-r-1 border-white/50 pr-2">
          <img src="/assets/img/icons/sound.svg" className="icon" />
        </div>
        <p>Library</p>
      </div>
      <div className="hide-scrollbar flex flex-col gap-6 overflow-y-scroll">
        <div className="flex flex-col gap-2">
          <p className="text-white/50">Presets</p>
          <div className="flex gap-2">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleClick(preset)}
                className="size-14 rounded-md border-1"
                style={{ backgroundColor: preset.color }}
              ></button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-white/50">My SoundScapes</p>
          <div className="flex flex-col gap-2">
            {savedSoundscapes.map((soundScape) => (
              <SoundScapeCard key={soundScape.id} soundScape={soundScape} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
