import { createContext, useState, useEffect } from "react";
import presetData from "../data/presets";
import { v4 as uuidv4 } from "uuid";

export const AppContext = createContext();

export const AppWrapper = ({ children }) => {
  const sounds = [
    "birds",
    "fire",
    "rain",
    "river",
    "thunder",
    "waves",
    "wind",
    "pen",
  ];

  const defaultVolumes = {
    birds: 0.0,
    fire: 0.0,
    rain: 0.0,
    river: 0.0,
    thunder: 0.0,
    waves: 0.0,
    wind: 0.0,
    pen: 0.0,
  };

  const presets = presetData;

  const [currentVolumes, setCurrentVolumes] = useState(defaultVolumes);
  const [isPlaying, setIsPlaying] = useState(false);
  const [masterVolume, setMasterVolume] = useState(0.65);
  const [savedSoundscapes, setSavedSoundscapes] = useState([]);

  const createSoundscape = (name, color) => {
    let soundscape = {
      name: name,
      id: uuidv4(),
      color: color,
      sounds: currentVolumes,
    };

    setSavedSoundscapes((prev) => [...prev, soundscape]);
  };

  return (
    <AppContext.Provider
      value={{
        sounds,
        currentVolumes,
        setCurrentVolumes,
        isPlaying,
        setIsPlaying,
        masterVolume,
        setMasterVolume,
        presets,
        savedSoundscapes,
        setSavedSoundscapes,
        createSoundscape,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
