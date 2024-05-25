import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { HexColorPicker, HexColorInput } from 'react-colorful';

const MixModal = ({ setShowModal }) => {
  const [mixName, setMixName] = useState('New Mix');
  const [mixColor, setMixColor] = useState('#ffffff');

  const { createMix } = useContext(AppContext);

  const handleNameChange = (e) => {
    setMixName(e.target.value);
  };

  const handleSaveMix = () => {
    createMix(mixName, mixColor);
    setShowModal(false);
  };

  return (
    <div
      className='inset-0 bg-neutral-950/75 backdrop-blur-md absolute z-10 flex items-center justify-center'
      onClick={() => setShowModal(false)}
    >
      <div
        className='bg-neutral-900 rounded-md p-8 flex flex-col gap-4'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='text-2xl font-semibold'>New Mix</h2>
        <div className='flex items-center gap-4'>
          <div className='w-3 h-3 bg-white rounded-full'></div>
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
        </div>
      </div>
    </div>
  );
};

export default MixModal;

{
  /* <h1 className='text-lg font-semibold'>Create Mix</h1>
        <div className='flex items-center gap-2 w-full'>
          <div
            className='w-3 h-3 rounded-full'
            style={{ backgroundColor: mixColor }}
          ></div>
          <input
            type='text'
            placeholder='Mix name'
            className='bg-transparent border-[1px] border-white/20 rounded-md p-2 outline-none w-full'
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
          className='bg-transparent border-[1px] border-white/20 rounded-md p-2 outline-none w-full'
        />
        <div className='flex gap-4 w-full'>
          <button
            className='bg-neutral-700 flex-1 rounded-md p-2'
            onClick={handleSaveMix}
          >
            Save
          </button>
          <button
            className='bg-neutral-900 flex-1 rounded-md p-2'
            onClick={(prev) => setShowModal(!prev)}
          >
            Cancel
          </button>
        </div> */
}
