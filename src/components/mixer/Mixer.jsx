import React from 'react';
import AudioCard from './AudioCard';
import ControlBar from '../controlbar/ControlBar';

const Mixer = ({ isPlaying, setIsPlaying, setVolumes, volumes }) => {
  const sounds = ['birds', 'rain', 'fire', 'thunder', 'waves', 'wind'];

  return (
    <div className='grid grid-cols-3 grid-rows-2 gap-10 w-full bg-transparent relative p-32'>
      {sounds.map((sound) => (
        <AudioCard
          path={sound}
          key={sound}
          isPlaying={isPlaying}
          setVolumes={setVolumes}
          volumes={volumes}
        />
      ))}
      <ControlBar isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
    </div>
  );
};

export default Mixer;
