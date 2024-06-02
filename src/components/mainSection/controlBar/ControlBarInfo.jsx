import { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "../../../context/AppContext";

const ControlBarInfo = () => {
  const { isPlaying, currentSoundScape } = useContext(AppContext);

  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0",
    )}`;
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    setElapsedTime(0);
  }, [currentSoundScape]);

  return (
    <div className="flex items-center gap-2">
      <div
        className="h-3 w-3 rounded-full"
        style={{
          backgroundColor: currentSoundScape
            ? currentSoundScape.color
            : "white",
        }}
      ></div>
      <div className="flex flex-col">
        <p className="text-sm">{currentSoundScape && currentSoundScape.name}</p>
        <p className="font-GeistMono text-xs text-white/50">
          {formatTime(elapsedTime)}
        </p>
      </div>
    </div>
  );
};

export default ControlBarInfo;
