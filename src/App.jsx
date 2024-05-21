import React, { useEffect } from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SideBar from './components/sidebar/SideBar';
import ControlBar from './components/controlbar/ControlBar';
import Mixer from './components/mixer/Mixer';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [volumes, setVolumes] = useState({
    birds: 0,
    fire: 0,
    rain: 0,
    thunder: 0,
    waves: 0,
    wind: 0,
  });

  const [savedMixes, setSavedMixes] = useState([]);

  const createMix = (mixName) => {
    let mix = {
      name: mixName,
      id: uuidv4(),
      sounds: volumes,
    };

    setSavedMixes((prev) => [...prev, mix]);
  };

  useEffect(() => {
    console.log(savedMixes);
  }, [savedMixes]);

  return (
    <div className='h-screen flex text-white'>
      <SideBar createMix={createMix} savedMixes={savedMixes} />
      <Mixer isPlaying={isPlaying} setVolumes={setVolumes} />
      <ControlBar isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
    </div>
  );
};

export default App;
