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
      className='flex border-2 border-white/10 rounded-lg flex-col gap-8 px-12 py-10 items-center justify-center w-[430px] backdrop-blur-md'
      style={{
        backgroundColor: `rgba(23,23,23,${1 - parseFloat(cardVolume)})`,
      }}
    >
      <audio ref={cardRef} loop>
        <source src={`/assets/audio/${path}.mp3`} type='audio/mpeg' />
      </audio>
      <img src={`/assets/img/${path}.svg`} alt='' className='w-28 h-28' />
      <div className='flex flex-col w-full gap-2'>
        <input
          type='range'
          min='0'
          max='1'
          step='0.01'
          value={cardVolume}
          onChange={handleVolumeChange}
          className='accent-white cursor-pointer'
        />
        <div className='flex justify-between items-center'>
          <p
            className='capitalize text-lg'
            style={{ textShadow: '#171717 0px 0px 15px' }}
          >
            {path}
          </p>
          <p
            className='text-xs text-white/25 font-GeistMono'
            style={{ textShadow: '#171717 0px 0px 15px' }}
          >
            {parseFloat(cardVolume).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudioCard;
