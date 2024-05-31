import { createContext, useState, useEffect } from "react";

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

  const [currentVolumes, setCurrentVolumes] = useState(defaultVolumes);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <AppContext.Provider
      value={{
        sounds,
        currentVolumes,
        setCurrentVolumes,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
