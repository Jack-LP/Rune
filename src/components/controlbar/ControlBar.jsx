import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const ControlBar = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);

  const { isPlaying, setIsPlaying, currentMix, masterVolume, setMasterVolume } =
    useContext(AppContext);

  const handleMasterVolumeChange = (e) => {
    setMasterVolume(parseFloat(e.target.value));
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
  }, [currentMix]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0'
    )}`;
  };

  const renderVolumeIcon = () => {
    if (masterVolume === 0) {
      return <i className='fa-solid fa-volume-xmark'></i>;
    } else if (masterVolume < 0.33) {
      return <i className='fa-solid fa-volume-off'></i>;
    } else if (masterVolume < 0.66 && masterVolume > 0.33) {
      return <i className='fa-solid fa-volume-low'></i>;
    } else if (masterVolume > 0.66) {
      return <i className='fa-solid fa-volume-high'></i>;
    }
  };

  return (
    <div className='bg-neutral-900/50 backdrop-blur-md border-t-2 border-white/25 w-full p-4 flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <div
          className='w-3 h-3 rounded-full
          '
          style={{ backgroundColor: currentMix ? currentMix.color : '#FFFFFF' }}
        ></div>
        <div className='flex flex-col'>
          <p>{currentMix ? currentMix.name : null}</p>
          <p className='text-sm text-white/50 font-SpaceMono'>
            {formatTime(elapsedTime)}
          </p>
        </div>
      </div>
      <button
        className='text-lg bg-white/10 w-10 h-10 rounded-full'
        onClick={() => setIsPlaying((curr) => !curr)}
      >
        {isPlaying ? (
          <i className='fa-solid fa-pause'></i>
        ) : (
          <i className='fa-solid fa-play'></i>
        )}
      </button>
      <div className='flex gap-3'>
        <button onClick={() => setMasterVolume(0)}>{renderVolumeIcon()}</button>
        <input
          type='range'
          min={0}
          max={1}
          step={0.01}
          className='w-24 accent-white'
          value={masterVolume}
          onChange={handleMasterVolumeChange}
        />
      </div>
    </div>
  );
};

export default ControlBar;
