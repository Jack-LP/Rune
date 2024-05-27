const isValidSoundObject = (sounds) => {
  const requiredKeys = ['birds', 'fire', 'rain', 'thunder', 'waves', 'wind'];
  return requiredKeys.every((key) => typeof sounds[key] === 'number');
};

const isValidMix = (mix) => {
  return (
    mix &&
    typeof mix.name === 'string' &&
    typeof mix.id === 'string' &&
    typeof mix.color === 'string' &&
    isValidSoundObject(mix.sounds)
  );
};

const isValidMixArray = (data) => {
  return Array.isArray(data) && data.every(isValidMix);
};

export { isValidSoundObject, isValidMix, isValidMixArray };
