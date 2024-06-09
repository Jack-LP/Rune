import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import AudioSpectrum from "react-audio-spectrum";
import { v4 as uuidv4 } from "uuid";

const SoundItem = ({ soundName, index }) => {
  const { currentVolumes, setCurrentVolumes, isPlaying, masterVolume } =
    useContext(AppContext);

  const [itemVolume, setItemVolume] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const itemRef = useRef(null);
  const uniqueId = useRef(uuidv4());

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setItemVolume(newVolume);
    setCurrentVolumes((prev) => ({
      ...prev,
      [soundName]: newVolume,
    }));
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    setItemVolume((prev) => (prev === 0 ? 1 : 0));
  };

  useEffect(() => {
    setItemVolume(isMuted ? 0 : currentVolumes[soundName]);
  }, [currentVolumes, isMuted, soundName]);

  useEffect(() => {
    if (isPlaying) {
      itemRef.current.play();
    } else {
      itemRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const effectiveVolume = isMuted ? 0 : itemVolume * masterVolume;
    itemRef.current.volume = effectiveVolume;
  }, [itemVolume, isMuted, masterVolume]);

  return (
    <div className="flex w-full items-center gap-6">
      <audio
        id={`audioElement-${uniqueId.current}`}
        className="hidden"
        ref={itemRef}
        loop
      >
        <source src={`/assets/audio/${soundName}.mp3`} type="audio/mpeg" />
      </audio>
      <div className="flex items-center gap-2">
        <p className="font-GeistMono text-sm text-white/50">{index + 1}</p>
        <div
          onClick={toggleMute}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border-1 border-white/50"
        >
          <img src={`/assets/img/icons/${soundName}.svg`} className="size-8" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold capitalize">{soundName}</p>
          <p className="font-GeistMono text-xs text-white/50">
            {parseFloat(itemVolume).toFixed(2)}
          </p>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={itemVolume}
          onChange={handleVolumeChange}
          className="w-44 cursor-pointer accent-white"
        />
      </div>
      <div className="ml-auto flex h-full w-44 flex-shrink-0 items-end justify-center overflow-hidden rounded-md border-1">
        <AudioSpectrum
          id={`audio-canvas-${uniqueId.current}`}
          height={40}
          width={180}
          audioId={`audioElement-${uniqueId.current}`}
          capColor={"transparent"}
          capHeight={2}
          meterWidth={2}
          meterCount={512}
          meterColor="white"
          gap={4}
        />
      </div>
    </div>
  );
};

export default SoundItem;
