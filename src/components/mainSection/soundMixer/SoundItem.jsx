import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../context/AppContext";

const SoundItem = ({ soundName }) => {
  const { currentVolumes, setCurrentVolumes, isPlaying } =
    useContext(AppContext);

  const [itemVolume, setItemVolume] = useState(0);
  const itemRef = useRef(null);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setItemVolume(newVolume);
    setCurrentVolumes((prev) => ({
      ...prev,
      [soundName]: newVolume,
    }));
  };

  const muteItem = () => {
    setItemVolume(0.0);
  };

  useEffect(() => {
    isPlaying ? itemRef.current.play() : itemRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    itemRef.current.volume = itemVolume;
  }, [itemVolume]);

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <audio className="hidden" ref={itemRef} loop>
        <source src={`/assets/audio/${soundName}.mp3`} type="audio/mpeg" />
      </audio>
      <p>1</p>
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-md border-1"></div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold capitalize">{soundName}</p>
            <button
              onClick={muteItem}
              className="font-GeistMono text-xs text-white/50"
            >
              {parseFloat(itemVolume).toFixed(2)}
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={itemVolume}
            onChange={handleVolumeChange}
            className="cursor-pointer accent-white"
          />
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
