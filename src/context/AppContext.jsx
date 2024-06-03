import { createContext, useState, useEffect, useMemo, useContext } from "react";
import presetData from "../data/presets";
import { v4 as uuidv4 } from "uuid";
import {
  getFromStorage,
  setToStorage,
  clearStorage,
} from "../utilities/localStorage";

export const AppContext = createContext();

export const AppWrapper = ({ children }) => {
  const sounds = useMemo(
    () => ["birds", "fire", "rain", "river", "thunder", "waves", "wind", "pen"],
    [],
  );

  const defaultVolumes = useMemo(
    () => ({
      birds: 0.0,
      fire: 0.0,
      rain: 0.0,
      river: 0.0,
      thunder: 0.0,
      waves: 0.0,
      wind: 0.0,
      pen: 0.0,
    }),
    [],
  );

  const defaultUser = useMemo(() => ({
    id: uuidv4(),
    username: "User",
    theme: "default",
    avatar: "avatar",
    isLoggedIn: false,
  }));

  const themes = ["default", "blue", "green", "grey", "orange"];

  const presets = useMemo(() => presetData, []);

  const [currentVolumes, setCurrentVolumes] = useState(defaultVolumes);
  const [isPlaying, setIsPlaying] = useState(false);
  const [masterVolume, setMasterVolume] = useState(0.65);
  const [currentSoundScape, setCurrentSoundScape] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = getFromStorage("user", "parse");
    return saved ? saved : defaultUser;
  });
  const [savedSoundscapes, setSavedSoundscapes] = useState(() => {
    const saved = getFromStorage("savedSoundscapes", "parse");
    return saved ? saved : [];
  });

  const createSoundscape = (name, color) => {
    let soundscape = {
      name,
      id: uuidv4(),
      color,
      sounds: currentVolumes,
    };

    setSavedSoundscapes((prev) => [...prev, soundscape]);
  };

  const loadSoundScape = (soundScape) => {
    if (currentVolumes !== soundScape.sounds) {
      setCurrentVolumes(soundScape.sounds);
      setCurrentSoundScape(soundScape);
      setIsPlaying(true);
    }
  };

  const resetVolumes = () => {
    setCurrentVolumes(defaultVolumes);
    setCurrentSoundScape(null);
    setIsPlaying(false);
  };

  const randomiseVolumes = () => {
    const randomVolumesObj = {};
    Object.keys(currentVolumes).forEach((key) => {
      randomVolumesObj[key] = Math.round(Math.random() * 100) / 100;
    });

    setCurrentVolumes(randomVolumesObj);
    setCurrentSoundScape(null);

    !isPlaying && setIsPlaying(true);
  };

  const restoreDefaults = () => {
    clearStorage();
  };

  useEffect(() => {
    setToStorage("savedSoundscapes", JSON.stringify(savedSoundscapes));
    setToStorage("user", JSON.stringify(user));
  }, [savedSoundscapes, user]);

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
        loadSoundScape,
        resetVolumes,
        currentSoundScape,
        setCurrentSoundScape,
        showSettingsModal,
        setShowSettingsModal,
        user,
        setUser,
        restoreDefaults,
        randomiseVolumes,
        themes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
