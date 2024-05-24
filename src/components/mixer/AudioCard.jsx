import React, { useState, useRef, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const AudioCard = ({ path }) => {
  const [volume, setVolume] = useState(0);
  const audioRef = useRef(null);

  const { isPlaying, setVolumes, volumes } = useContext(AppContext);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    audioRef.current.volume = volumes[path];
    setVolume(volumes[path]);
  }, [volumes]);

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
    <div className='flex bg-neutral-900/50 border-2 border-white/50 backdrop-blur-md rounded-lg p-10 flex-col gap-4 items-center justify-center'>
      <audio ref={audioRef} loop>
        <source
          src={`../../../src-tauri/assets/audio/${path}.mp3`}
          type='audio/mpeg'
        />
      </audio>
      <img
        src={`../../../src-tauri/assets/img/${path}.svg`}
        className='invert'
        alt=''
      />
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
