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
    name: '',
    avatar: '/assets/img/default-user.jpg',
    theme: 'green',
  };
  const themes = ['default', 'blue', 'green', 'grey', 'orange'];
  const [isPlaying, setIsPlaying] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [volumes, setVolumes] = useState(defaultVolumes);
  const [masterVolume, setMasterVolume] = useState(
    getFromStorage('masterVolume') || 0.65
  );
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
    setToStorage('masterVolume', masterVolume);
  }, [savedMixes, currentMix, userInfo, masterVolume]);

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
        themes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
