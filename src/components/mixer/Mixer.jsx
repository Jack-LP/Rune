import AudioCard from './AudioCard';

const Mixer = () => {
  const sounds = ['birds', 'rain', 'fire', 'thunder', 'waves', 'wind'];

  return (
    <div className='grid grid-cols-3 grid-rows-2 gap-8'>
      {sounds.map((sound) => (
        <AudioCard path={sound} key={sound} />
      ))}
    </div>
  );
};

export default Mixer;
