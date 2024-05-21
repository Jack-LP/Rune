import React, { useState, useRef, useEffect } from 'react';

const AudioCard = ({ path, isPlaying, setVolumes }) => {
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
    setVolumes((prev) => ({ ...prev, [path]: e.target.value }));
  };

  return (
    <div className='flex bg-neutral-900 rounded-lg p-10 flex-col gap-4 items-center justify-center'>
      <audio ref={audioRef} loop>
        <source
          src={`../../../src-tauri/assets/audio/${path}.mp3`}
          type='audio/mpeg'
        />
      </audio>
      <p className='capitalize'>{path}</p>
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
