import React from 'react';
import { useState } from 'react';
import AudioCard from './AudioCard';

const Mixer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  console.log(isPlaying);

  const sounds = ['birds', 'rain', 'fire', 'thunder', 'waves', 'wind'];

  return (
    <div className='flex flex-col gap-4'>
      <button
        className='btn btn-primary'
        onClick={() => setIsPlaying((curr) => !curr)}
      >
        play
      </button>
      {sounds.map((sound) => (
        <AudioCard path={sound} key={sound} isPlaying={isPlaying} />
      ))}
    </div>
  );
};

export default Mixer;
