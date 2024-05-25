import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getFromStorage, setToStorage } from '../utilities/localStorage';

export const AppContext = createContext();

export const AppWrapper = ({ children }) => {
  const defaultVolumes = {
    birds: 0.0,
    fire: 0.0,
    rain: 0.0,
    thunder: 0.0,
    waves: 0.0,
    wind: 0.0,
  };
  const defaultUser = {
    name: 'User',
    avatar: '../../src-tauri/assets/img/default-user.jpg',
    theme: 'default',
  };
  const [isPlaying, setIsPlaying] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [volumes, setVolumes] = useState(defaultVolumes);
  const [masterVolume, setMasterVolume] = useState(0.5);
  const [currentMix, setCurrentMix] = useState(false);
  const [userInfo, setUserInfo] = useState(
    getFromStorage('userInfo', 'parse') || defaultUser
  );
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
    setVolumes(mixItem.sounds);
    setCurrentMix(mixItem);
    setIsPlaying(true);
  };

  const resetVolumes = () => {
    setVolumes(defaultVolumes);
    setIsPlaying(false);
    setCurrentMix(false);
  };

  const setRandomVolumes = () => {
    const randomizedVolumes = {};
    for (let key in defaultVolumes) {
      if (defaultVolumes.hasOwnProperty(key)) {
        randomizedVolumes[key] = Math.random() * 1;
      }
    }
    setVolumes(randomizedVolumes);
    setIsPlaying(true);
  };

  useEffect(() => {
    setToStorage('savedMixes', JSON.stringify(savedMixes));
    setToStorage('userInfo', JSON.stringify(userInfo));
  }, [savedMixes, currentMix, userInfo]);

  return (
    <AppContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        showUserModal,
        setShowUserModal,
        volumes,
        setVolumes,
        currentMix,
        setCurrentMix,
        savedMixes,
        setSavedMixes,
        createMix,
        deleteMix,
        loadMix,
        resetVolumes,
        setRandomVolumes,
        userInfo,
        setUserInfo,
        masterVolume,
        setMasterVolume,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
