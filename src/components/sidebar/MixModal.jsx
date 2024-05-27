import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { HexColorPicker, HexColorInput } from 'react-colorful';

const MixModal = ({ setShowModal }) => {
  const [mixName, setMixName] = useState('New Mix');
  const [mixColor, setMixColor] = useState('#359057');
  const [numberOfSounds, setNumberOfSounds] = useState(0);

  const { createMix, volumes } = useContext(AppContext);

  const handleNameChange = (e) => {
    setMixName(e.target.value);
  };

  const handleSaveMix = () => {
    createMix(mixName, mixColor);
    setShowModal(false);
  };

  useEffect(() => {
    setNumberOfSounds(
      Object.entries(volumes)
        .filter(([key, value]) => value > 0)
        .map(([key, value]) => key).length
    );
  }, [volumes]);

  return (
    <div
      className='inset-0 bg-neutral-950/75 backdrop-blur-md absolute z-10 flex items-center justify-center'
      onClick={() => setShowModal(false)}
    >
      <div
        className='bg-neutral-900 rounded-md p-8 flex flex-col gap-8 relative w-[450px] border-2 border-white/10'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='absolute top-4 right-5 text-2xl text-white/50 hover:text-white'
          onClick={() => setShowModal(false)}
        >
          <i className='fa-solid fa-xmark'></i>
        </button>
        <h2 className='text-2xl font-semibold'>Create Mix</h2>
        <div className='flex items-center gap-4 bg-white/10 rounded-md px-3 py-2'>
          <div
            className='w-3 h-3 rounded-full'
            style={{ backgroundColor: mixColor }}
          ></div>
          <div className='flex flex-col'>
            <p>{mixName ? mixName : 'New mix'}</p>
            <p className='text-sm text-white/50'>{`${numberOfSounds} ${
              numberOfSounds === 1 ? 'sound' : 'sounds'
            }`}</p>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p>Name</p>
          <input
            type='text'
            maxLength={11}
            className='bg-transparent outline-none border-[1px] border-white/25 rounded-md p-2'
            onChange={handleNameChange}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <p>Colour</p>
          <HexColorPicker
            color={mixColor}
            onChange={setMixColor}
            style={{ width: '100%' }}
          />
          <HexColorInput
            color={mixColor}
            onChange={setMixColor}
            prefixed
            className='bg-transparent outline-none border-[1px] border-white/25 rounded-md p-2'
          />
        </div>
        <div className='flex w-full gap-4'>
          <button
            className='bg-neutral-800 rounded-md p-3 flex-1 flex items-center justify-center'
            onClick={handleSaveMix}
          >
            Save
          </button>
          <button
            className='bg-neutral-800 rounded-md p-3 flex-1 flex items-center justify-center'
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MixModal;

{
  /* <h2 className='text-2xl font-semibold'>New Mix</h2>
        <div className='flex items-center gap-4'>
          <div
            className='w-3 h-3 rounded-full'
            style={{ backgroundColor: mixColor }}
          ></div>
          <input
            type='text'
            placeholder='Mix Name'
            className='bg-transparent outline-none border-[1px] border-white/25 rounded-md p-2'
            onChange={handleNameChange}
          />
        </div>
        <HexColorPicker
          color={mixColor}
          onChange={setMixColor}
          style={{ width: '100%' }}
        />
        <HexColorInput
          color={mixColor}
          onChange={setMixColor}
          prefixed
          className='bg-transparent outline-none border-[1px] border-white/25 rounded-md p-2'
        />
        <div className='flex w-full gap-4'>
          <button
            className='bg-neutral-800 rounded-md p-3 flex-1 flex gap-2 items-center justify-center'
            onClick={handleSaveMix}
          >
            Save
          </button>
          <button
            className='bg-neutral-800 rounded-md p-3 flex-1 flex gap-2 items-center justify-center'
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div> */
}
