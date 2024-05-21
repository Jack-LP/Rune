import React, { useState } from 'react';

const Modal = ({ setShowModal, createMix }) => {
  const [mixName, setMixName] = useState('New Mix');

  const handleNameChange = (e) => {
    setMixName(e.target.value);
  };

  const handleSaveMix = () => {
    createMix(mixName);
  };

  return (
    <div
      className='inset-0 bg-neutral-950/75 backdrop-blur-md absolute z-10 flex items-center justify-center'
      onClick={() => setShowModal(false)}
    >
      <div
        className='bg-neutral-800 p-4 rounded-md w-72 flex flex-col gap-4'
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className='text-lg font-semibold'>Create Mix</h1>
        <input
          type='text'
          placeholder='Mix name'
          className='bg-transparent border-[1px] border-white/20 rounded-md p-2 outline-none'
          onChange={handleNameChange}
        />
        <div className='flex gap-4'>
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
        </div>
      </div>
    </div>
  );
};

export default Modal;
