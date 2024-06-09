import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import ControlBarInfo from "./ControlBarInfo";

const ControlBar = () => {
  const { isPlaying, setIsPlaying, masterVolume, setMasterVolume } =
    useAppContext();

  const [cachedVolume, setCachedVolume] = useState(masterVolume);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleMasterVolumeChange = (e) => {
    setMasterVolume(parseFloat(e.target.value));
  };

  const muteVolume = () => {
    if (masterVolume !== 0) {
      setCachedVolume(masterVolume);
      setMasterVolume(0);
    } else {
      setMasterVolume(cachedVolume);
    }
  };

  const renderVolumeIcon = () => {
    if (masterVolume > 0 && masterVolume < 0.5) {
      return <img src="/assets/img/icons/volume-min.svg" className="icon" />;
    } else if (masterVolume >= 0.5) {
      return <img src="/assets/img/icons/volume-max.svg" className="icon" />;
    } else {
      return <img src="/assets/img/icons/volume-x.svg" className="icon" />;
    }
  };

  return (
    <div className="absolute bottom-6 left-0 right-0 ml-auto mr-auto flex h-[60px] w-[800px] items-center justify-between rounded-md border-1 border-white/25 px-4 backdrop-blur-lg">
      <ControlBarInfo />
      <button
        className="absolute left-0 right-0 ml-auto mr-auto flex h-10 w-10 items-center justify-center rounded-full border-1 border-white/25"
        onClick={handlePlayPause}
      >
        {isPlaying ? (
          <img src="/assets/img/icons/pause.svg" className="icon" />
        ) : (
          <img src="/assets/img/icons/play.svg" className="icon" />
        )}
      </button>
      <div className="relative flex gap-2 justify-self-end">
        <button onClick={muteVolume} className="absolute -left-6">
          {renderVolumeIcon()}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={masterVolume}
          onChange={(e) => handleMasterVolumeChange(e)}
          className="w-24 cursor-pointer accent-white"
        />
      </div>
    </div>
  );
};

export default ControlBar;
