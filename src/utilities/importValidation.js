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

const isYouTubeUrl = (url) => {
  const regex =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;
  return regex.test(url);
};

export {
  isValidSoundObject,
  isValidSoundScape,
  isValidSoundScapeArray,
  isYouTubeUrl,
};
