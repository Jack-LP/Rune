import React, { useState, useRef, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const AudioCard = ({ path }) => {
  const [cardVolume, setCardVolume] = useState(0);
  const cardRef = useRef(null);

  const { isPlaying, setVolumes, volumes, masterVolume } =
    useContext(AppContext);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setCardVolume(newVolume);
    setVolumes((prev) => ({
      ...prev,
      [path]: newVolume,
    }));
  };

  useEffect(() => {
    isPlaying ? cardRef.current.play() : cardRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    const effectiveVolume = masterVolume * cardVolume;
    cardRef.current.volume = effectiveVolume;
  }, [cardVolume, masterVolume]);

  useEffect(() => {
    if (volumes[path] !== undefined) {
      setCardVolume(volumes[path]);
    }
  }, [volumes, path]);

  return (
    <div
      className='flex border-2 border-white/25 rounded-lg flex-col gap-10 items-center justify-center p-12 w-72 backdrop-blur-md'
      style={{
        backgroundColor: `rgba(23,23,23,${1 - parseFloat(cardVolume)})`,
      }}
    >
      <audio ref={cardRef} loop>
        <source
          src={`../../../src-tauri/assets/audio/${path}.mp3`}
          type='audio/mpeg'
        />
      </audio>
      <img
        src={`../../../src-tauri/assets/img/rain.svg`}
        alt=''
        className='w-36'
      />
      <div className='flex flex-col w-full'>
        <input
          type='range'
          min='0'
          max='1'
          step='0.01'
          value={cardVolume}
          onChange={handleVolumeChange}
          className='accent-white'
        />
        <div className='flex flex-col'>
          <p className='capitalize text-lg'>{path}</p>
          <p className='text-xs text-white/25 font-SpaceMono'>
            {parseFloat(cardVolume).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudioCard;
