import React, { useEffect } from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getFromStorage, setToStorage } from './lib/localStorage';
import SideBar from './components/sidebar/SideBar';
import Mixer from './components/mixer/Mixer';
import UserButton from './components/user/UserButton';
import UserModal from './components/user/UserModal';

const App = () => {
  const defaultVolumes = {
    birds: 0,
    fire: 0,
    rain: 0,
    thunder: 0,
    waves: 0,
    wind: 0,
  };
  const [isPlaying, setIsPlaying] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
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
    <>
      <img
        src='https://picsum.photos/1920/1080'
        alt=''
        className='fixed w-screen h-screen -z-10'
      />
      <div className='h-screen flex text-white'>
        {showUserModal ? (
          <UserModal
            setShowUserModal={setShowUserModal}
            savedMixes={savedMixes}
          />
        ) : null}
        <UserButton setShowUserModal={setShowUserModal} />
        <SideBar
          createMix={createMix}
          deleteMix={deleteMix}
          savedMixes={savedMixes}
          loadMix={loadMix}
          ResetVolumes={ResetVolumes}
        />
        <Mixer
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setVolumes={setVolumes}
          volumes={volumes}
        />
      </div>
    </>
  );
};

export default App;
