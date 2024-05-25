import AudioCard from './AudioCard';

const Mixer = () => {
  const sounds = ['birds', 'rain', 'fire', 'thunder', 'waves', 'wind'];

  return (
    <div className='flex flex-col gap-4 items-center'>
      <h1 className='text-3xl font-semibold'>Mixer</h1>
      <div className='grid grid-cols-3 grid-rows-2 gap-10'>
        {sounds.map((sound) => (
          <AudioCard path={sound} key={sound} />
        ))}
      </div>
    </div>
  );
};

export default Mixer;
