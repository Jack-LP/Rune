import React from 'react';

const ControlBar = ({ isPlaying, setIsPlaying }) => {
  return (
    <div className='w-full bg-neutral-950 absolute bottom-0 left-0 p-2 flex items-center justify-center'>
      <button
        className='btn btn-primary text-xl'
        onClick={() => setIsPlaying((curr) => !curr)}
      >
        {isPlaying ? (
          <i className='fa-solid fa-pause'></i>
        ) : (
          <i className='fa-solid fa-play'></i>
        )}
      </button>
    </div>
  );
};

export default ControlBar;
