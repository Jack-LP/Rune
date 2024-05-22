import React, { useState } from 'react';
import Modal from './Modal';
import MixButton from './MixButton';

const SideBar = ({
  createMix,
  savedMixes,
  loadMix,
  ResetVolumes,
  deleteMix,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal ? (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          createMix={createMix}
        />
      ) : null}
      <div className='w-72 bg-neutral-900 flex flex-col p-4 gap-12'>
        <h1 className='text-3xl self-center'>sound</h1>
        <div className='flex flex-col gap-12'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-xs text-white/50 pb-4'>MENU</h2>
            <button className='flex items-center gap-3'>
              <i className='fa-solid fa-house'></i>
              <p>Home</p>
            </button>
            <button className='flex items-center gap-3' onClick={ResetVolumes}>
              <i className='fa-solid fa-rotate-left'></i>
              <p>Reset</p>
            </button>
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='text-xs text-white/50 pb-4'>SAVED MIXES</h2>
            <button
              className='flex items-center gap-3'
              onClick={() => setShowModal(true)}
            >
              <i className='fa-solid fa-plus'></i>
              <p>Create Mix</p>
            </button>
            {savedMixes.map((mixItem) => (
              <MixButton
                key={mixItem.id}
                mixItem={mixItem}
                loadMix={loadMix}
                deleteMix={deleteMix}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
