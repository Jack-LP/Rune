import React, { useEffect } from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getFromStorage, setToStorage } from './utilities/localStorage';
import SideBar from './components/sidebar/SideBar';
import ControlBar from './components/controlbar/ControlBar';
import Mixer from './components/mixer/Mixer';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const defaultVolumes = {
    birds: 0,
    fire: 0,
    rain: 0,
    thunder: 0,
    waves: 0,
    wind: 0,
  };

  const [volumes, setVolumes] = useState(defaultVolumes);

  const [savedMixes, setSavedMixes] = useState(
    getFromStorage('savedMixes', 'parse') || []
  );

  const createMix = (mixName, mixColor) => {
    let mix = {
      name: mixName,
      id: uuidv4(),
      color: mixColor,
      sounds: volumes,
    };

    setSavedMixes((prev) => [...prev, mix]);
  };

  const deleteMix = (mixItem) => {
    const filteredMixes = savedMixes.filter((item) => item.id !== mixItem.id);
    setSavedMixes(filteredMixes);
  };

  const loadMix = (mixItem) => {
    console.log(mixItem);
    setVolumes(mixItem.sounds);
  };

  const ResetVolumes = () => {
    setVolumes(defaultVolumes);
  };

  useEffect(() => {
    setToStorage('savedMixes', JSON.stringify(savedMixes));
  }, [savedMixes]);

  return (
    <div className='h-screen flex text-white'>
      <SideBar
        createMix={createMix}
        deleteMix={deleteMix}
        savedMixes={savedMixes}
        loadMix={loadMix}
        ResetVolumes={ResetVolumes}
      />
      <Mixer isPlaying={isPlaying} setVolumes={setVolumes} volumes={volumes} />
      <ControlBar isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
    </div>
  );
};

export default App;
