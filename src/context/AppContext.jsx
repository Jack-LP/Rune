import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getFromStorage, setToStorage } from '../lib/localStorage';

export const AppContext = createContext();

export const AppWrapper = ({ children }) => {
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
  const [currentMix, setCurrentMix] = useState(false);
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
    resetElapsedTime();
  };

  const resetVolumes = () => {
    setVolumes(defaultVolumes);
    resetElapsedTime();
    setIsPlaying(false);
    setCurrentMix(false);
  };

  const setRandomVolumes = () => {
    const randomizedVolumes = {};
    for (let key in defaultVolumes) {
      if (defaultVolumes.hasOwnProperty(key)) {
        randomizedVolumes[key] = Math.random();
      }
    }
    setVolumes(randomizedVolumes);
    resetElapsedTime();
    setIsPlaying(true);
  };

  const resetElapsedTime = () => {};

  useEffect(() => {
    setToStorage('savedMixes', JSON.stringify(savedMixes));
  }, [savedMixes, currentMix]);

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
        resetElapsedTime,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
