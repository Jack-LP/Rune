import React, { useState } from 'react';
import AudioCard from './AudioCard';

const Mixer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mix, setMix] = useState({
    name: 'default',
    id: Math.floor(Math.random() * 10000),
    sounds: {},
  });
  const [mixes, setMixes] = useState([]);

  const sounds = ['birds', 'rain', 'fire', 'thunder', 'waves', 'wind'];

  const saveMix = () => {
    setMixes((prev) => [...prev, mix]);
    console.log(`mixes: ${[...mixes, mix]}`);
  };

  console.log(mix);

  return (
    <div className='flex flex-col gap-4'>
      <button
        className='btn btn-primary'
        onClick={() => setIsPlaying((curr) => !curr)}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button className='btn btn-primary' onClick={saveMix}>
        Save Mix
      </button>
      <ul>
        {mixes.map((mix) => (
          <li key={mix.id}>
            {mix.name} (ID: {mix.id})
          </li>
        ))}
      </ul>
      {sounds.map((sound) => (
        <AudioCard
          path={sound}
          key={sound}
          isPlaying={isPlaying}
          setMix={setMix}
        />
      ))}
    </div>
  );
};

export default Mixer;
