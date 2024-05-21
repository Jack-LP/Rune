import React, { useState } from 'react';
import AudioCard from './AudioCard';

const Mixer = ({ isPlaying, setVolumes, volumes }) => {
  const sounds = ['birds', 'rain', 'fire', 'thunder', 'waves', 'wind'];

  return (
    <div className='grid grid-cols-3 grid-rows-2 gap-4 w-full p-24 bg-neutral-800'>
      {sounds.map((sound) => (
        <AudioCard
          path={sound}
          key={sound}
          isPlaying={isPlaying}
          setVolumes={setVolumes}
          volumes={volumes}
        />
      ))}
    </div>
  );
};

export default Mixer;
