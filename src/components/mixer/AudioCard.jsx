import React from 'react';
import { useState, useRef, useEffect } from 'react';

const AudioCard = ({ path, isPlaying, setMix }) => {
  const [volume, setVolume] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    setMix((prev) => ({
      ...prev,
      sounds: {
        ...prev.sounds,
        [path]: {
          name: path,
          volume: e.target.value,
        },
      },
    }));
  };

  return (
    <div className='w-96 h-36 flex bg-neutral-900 flex-col gap-4 items-center justify-center'>
      <p>{path}</p>
      <audio ref={audioRef} controls loop>
        <source
          src={`../../../src-tauri/assets/audio/${path}.mp3`}
          type='audio/mpeg'
        />
      </audio>
      <input
        type='range'
        className='range'
        min='0'
        max='1'
        step='0.01'
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default AudioCard;
