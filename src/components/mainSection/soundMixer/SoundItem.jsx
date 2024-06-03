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
    <div className="flex w-full items-center justify-between gap-4">
      <audio
        id={`audioElement-${uniqueId.current}`}
        className="hidden"
        ref={itemRef}
        loop
      >
        <source src={`/assets/audio/${soundName}.mp3`} type="audio/mpeg" />
      </audio>
      <p className="font-GeistMono text-sm text-white/50">{index + 1}</p>
      <div className="flex items-center gap-2">
        <div
          onClick={toggleMute}
          className="h-10 w-10 cursor-pointer rounded-md border-1"
        ></div>
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
            className="cursor-pointer accent-white"
          />
        </div>
      </div>
      <input type="radio" />
      <div className="flex h-full w-[180px] items-end justify-center overflow-hidden rounded-md border-1">
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
