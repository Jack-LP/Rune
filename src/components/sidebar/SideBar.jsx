import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import MixModal from './MixModal';
import MixButton from './MixButton';

const SideBar = ({}) => {
  const [showModal, setShowModal] = useState(false);

  const { setRandomVolumes, resetVolumes, savedMixes } = useContext(AppContext);

  return (
    <>
      {showModal ? <MixModal setShowModal={setShowModal} /> : null}
      <div className='w-80 bg-black/20 backdrop-blur-md border-r-2 border-white/25 flex flex-col px-4 gap-10'>
        <h1 className='text-3xl self-center pt-12 font-semibold'>idk yet</h1>
        {/* Menu */}
        <div className='flex flex-col gap-2'>
          <h2 className='text-lg'>Menu</h2>
          <div className='flex flex-col gap-2'>
            <button
              className='rounded-md py-2 px-3 flex items-center gap-2 bg-white/10'
              onClick={setRandomVolumes}
            >
              <i className='fa-solid fa-dice-three'></i>
              <p>Random</p>
            </button>
            <button
              className='rounded-md py-2 px-3 flex items-center gap-2 bg-white/10'
              onClick={resetVolumes}
            >
              <i className='fa-solid fa-rotate-left'></i>
              <p>Reset</p>
            </button>
          </div>
        </div>
        {/* SoundScapes */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-lg'>My Mixes</h2>
          <div className='flex flex-col gap-2'>
            <button
              className='bg-white/10 rounded-md py-2 px-3 flex items-center gap-2'
              onClick={() => setShowModal(true)}
            >
              <i className='fa-solid fa-plus'></i>
              <p>Create New</p>
            </button>
            {savedMixes.map((mixItem) => (
              <MixButton key={mixItem.id} mixItem={mixItem} />
            ))}
          </div>
        </div>
        <p className='text-xs text-white/25 absolute bottom-2'>
          @Jack-LP // Source
        </p>
      </div>
    </>
  );
};

export default SideBar;
