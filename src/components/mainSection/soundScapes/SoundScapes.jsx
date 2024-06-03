import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import SoundScapeCard from "./SoundscapeCard";

const SoundScapes = () => {
  const { presets, savedSoundscapes, loadSoundScape } = useContext(AppContext);

  const handleClick = (soundScape) => {
    loadSoundScape(soundScape);
    console.log(soundScape);
  };

  return (
    <div className="flex flex-col gap-6 rounded-md border-1 border-white/25 p-8 backdrop-blur-lg">
      <div className="flex items-center gap-2">
        <img src="/assets/img/icons/sound.svg" className="icon" />
        <h1 className="text-xl font-semibold">Library</h1>
      </div>
      <div className="hide-scrollbar flex flex-col gap-6 overflow-y-scroll">
        <div className="flex flex-col gap-2">
          <p className="text-white/50">Presets</p>
          <div className="flex gap-2">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleClick(preset)}
                className="h-14 w-14 rounded-md border-1"
              >
                <p>3</p>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-white/50">SoundScapes</p>
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

export default SoundScapes;
