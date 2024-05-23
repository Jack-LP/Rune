import React from 'react';

const ControlBar = ({ isPlaying, setIsPlaying }) => {
  return (
    <div className='bg-neutral-900/50 border-[1px] border-white/50 w-[800px] rounded-md mb-4 absolute left-0 right-0 ml-auto bottom-0 mr-auto p-2 flex items-center justify-center'>
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
