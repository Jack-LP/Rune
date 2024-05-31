import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import ControlBarInfo from "./ControlBarInfo";

const ControlBar = () => {
  const { isPlaying, setIsPlaying, masterVolume, setMasterVolume } =
    useContext(AppContext);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleMasterVolumeChange = (e) => {
    setMasterVolume(parseFloat(e.target.value));
  };

  return (
    <div className="absolute bottom-6 left-0 right-0 ml-auto mr-auto flex w-[800px] items-center justify-between rounded-md border-1 border-white/25 p-4">
      <ControlBarInfo />
      <button
        className="absolute left-0 right-0 ml-auto mr-auto h-10 w-10 rounded-full border-1 border-white/25"
        onClick={handlePlayPause}
      >
        {isPlaying ? "Pl" : "Pa"}
      </button>
      <div className="flex gap-2 justify-self-end">
        <p>V</p>
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
