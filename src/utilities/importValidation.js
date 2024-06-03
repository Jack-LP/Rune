const isValidSoundObject = (sounds) => {
  const requiredKeys = [
    "birds",
    "fire",
    "rain",
    "river",
    "thunder",
    "waves",
    "wind",
    "pen",
  ];
  return requiredKeys.every((key) => typeof sounds[key] === "number");
};

const isValidSoundScape = (soundScape) => {
  return (
    soundScape &&
    typeof soundScape.name === "string" &&
    typeof soundScape.id === "string" &&
    typeof soundScape.color === "string" &&
    isValidSoundObject(soundScape.sounds)
  );
};

const isValidSoundScapeArray = (data) => {
  return Array.isArray(data) && data.every(isValidSoundScape);
};

export { isValidSoundObject, isValidSoundScape, isValidSoundScapeArray };
