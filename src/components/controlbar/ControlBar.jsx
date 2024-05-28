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
      return (
        <img
          src='/assets/img/icons/volume-xmark.svg'
          className='invert w-[18px]'
        />
      );
    } else if (masterVolume <= 0.33) {
      return (
        <img
          src='/assets/img/icons/volume-low.svg'
          className='invert w-[10px]'
        />
      );
    } else if (masterVolume <= 0.66 && masterVolume > 0.33) {
      return (
        <img
          src='/assets/img/icons/volume-med.svg'
          className='invert w-[14px]'
        />
      );
    } else if (masterVolume > 0.66) {
      return (
        <img
          src='/assets/img/icons/volume-high.svg'
          className='invert w-[19px]'
        />
      );
    }
  };

  return (
    <div className='bg-black/20 backdrop-blur-md border-2 rounded-md border-white/25 px-4 h-16 w-[800px] flex items-center justify-between absolute bottom-4'>
      <div className='flex items-center gap-3'>
        <div
          className='w-3 h-3 rounded-full
          '
          style={{ backgroundColor: currentMix ? currentMix.color : '#FFFFFF' }}
        ></div>
        <div className='flex flex-col'>
          <p>{currentMix ? currentMix.name : null}</p>
          <p className='text-sm text-white/50 font-GeistMono'>
            {formatTime(elapsedTime)}
          </p>
        </div>
      </div>
      <button
        className='text-lg bg-white/10 w-10 h-10 rounded-full absolute left-0 right-0 ml-auto mr-auto flex items-center justify-center'
        onClick={() => setIsPlaying((curr) => !curr)}
      >
        {isPlaying ? (
          <img src='/assets/img/icons/pause.svg' className='invert w-3' />
        ) : (
          <img src='/assets/img/icons/play.svg' className='invert w-3' />
        )}
      </button>
      <div className='flex items-center gap-3 relative'>
        <button className='absolute -left-6' onClick={() => setMasterVolume(0)}>
          {renderVolumeIcon()}
        </button>
        <input
          type='range'
          min={0}
          max={1}
          step={0.01}
          className='w-24 bg-white cursor-pointer'
          value={masterVolume}
          onChange={handleMasterVolumeChange}
        />
      </div>
    </div>
  );
};

export default ControlBar;
